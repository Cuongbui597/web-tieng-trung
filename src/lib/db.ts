import 'server-only';
import { createPool, VercelPool } from '@vercel/postgres';
import pg from 'pg';
import { Contact, Order, OrderItem, Product, PlantPrice } from './types';

const { Client } = pg;

// Define Global Types
type DBMode = 'pool' | 'direct';

interface GlobalForDb {
    __dbMode?: DBMode;
    __dbPool?: VercelPool;
    __dbTablesReady_v2?: boolean;
}

const globalForDb = globalThis as unknown as GlobalForDb;

export type { Contact, Order, OrderItem, Product, PlantPrice };



function env(name: string): string {
    const v = process.env[name];
    return typeof v === 'string' ? v.trim() : '';
}

function isPostgresConnectionString(v: unknown): boolean {
    return typeof v === 'string' && (v.startsWith('postgres://') || v.startsWith('postgresql://') || v.startsWith('prisma+postgres://'));
}

function detectConnectionStrings() {
    // Preferred (Vercel Postgres standard env vars)
    const pooled = env('POSTGRES_URL');
    const direct = env('POSTGRES_URL_NON_POOLING');
    if (pooled || direct) {
        return {
            pooledUrl: pooled,
            directUrl: direct || pooled,
        };
    }

    // Some providers use DATABASE_URL.
    const databaseUrl = env('DATABASE_URL');
    if (databaseUrl) {
        return { pooledUrl: databaseUrl, directUrl: databaseUrl };
    }

    // If the user chose a custom prefix in Vercel Storage connect dialog,
    // Vercel creates <PREFIX>_URL and <PREFIX>_URL_NON_POOLING.
    const entries = Object.entries(process.env).filter(([, v]) => typeof v === 'string' && isPostgresConnectionString(v.trim()));
    const byPrefix = new Map<string, { pooledUrl: string; directUrl: string }>();

    for (const [k, raw] of entries) {
        const v = String(raw).trim();
        if (!v) continue;

        if (k.endsWith('_URL')) {
            const prefix = k.slice(0, -'_URL'.length);
            const nonPoolingKey = `${prefix}_URL_NON_POOLING`;
            const nonPoolingValue = env(nonPoolingKey);
            byPrefix.set(prefix, {
                pooledUrl: v,
                directUrl: nonPoolingValue || v,
            });
        }
    }

    // Pick any detected prefix.
    const first = byPrefix.values().next();
    if (!first.done) return first.value;

    // As a last resort, use the first postgres-like env var.
    const any = entries[0]?.[1];
    const anyStr = typeof any === 'string' ? any.trim() : '';
    if (anyStr) return { pooledUrl: anyStr, directUrl: anyStr };

    return { pooledUrl: '', directUrl: '' };
}

export async function sql(strings: TemplateStringsArray, ...values: any[]) {
    const { pooledUrl, directUrl } = detectConnectionStrings();

    if (!pooledUrl && !directUrl) {
        throw new Error(
            'Missing Postgres connection string. Set POSTGRES_URL (pooled) or POSTGRES_URL_NON_POOLING (direct).',
        );
    }

    const mode = globalForDb.__dbMode;

    const runPooled = async () => {
        if (!pooledUrl) throw new Error('No pooled Postgres URL found');
        if (!globalForDb.__dbPool) {
            globalForDb.__dbPool = createPool({ connectionString: pooledUrl });
        }
        return globalForDb.__dbPool!.sql(strings, ...values);
    };

    const runDirect = async () => {
        if (!directUrl) throw new Error('No direct Postgres URL found');

        // Use 'pg' Client instead of @vercel/postgres createClient for better compatibility (e.g. Prisma Accelerate)
        // Clean URL: remove 'prisma+' prefix if present as pg doesn't like it, but keep postgres://
        let cleanUrl = directUrl.replace('prisma+postgres://', 'postgres://');

        // Remove sslmode from the string to allow us to configure it manually via object without warnings
        // This regex removes both ?sslmode=... and &sslmode=...
        cleanUrl = cleanUrl.replace(/[\?&]sslmode=[^&]+/, '');

        // Handle SSL warnings by using explicit object config
        const isLocal = cleanUrl.includes('localhost') || cleanUrl.includes('127.0.0.1');
        const clientConfig: pg.ClientConfig = { connectionString: cleanUrl };

        // If not local, force SSL but allow unauthorized (simulates sslmode=no-verify/require without validation)
        if (!isLocal) {
            clientConfig.ssl = { rejectUnauthorized: false };
        }

        const client = new Client(clientConfig);
        await client.connect();

        try {
            // Transform template literal arguments for pg
            let text = strings[0];
            for (let i = 1; i < strings.length; i++) {
                text += `$${i}` + strings[i];
            }

            const res = await client.query(text, values);
            return res; // pg returns { rows: [], ... } which is similar enough to vercel/postgres
        } finally {
            await client.end().catch(() => { });
        }
    };

    if (mode === 'pool') return runPooled();
    if (mode === 'direct') return runDirect();

    // FIX: If using Prisma Accelerate or Supabase (external poolers), skip local pooling
    if (pooledUrl && (pooledUrl.includes('prisma.io') || pooledUrl.includes('supabase.com'))) {
        globalForDb.__dbMode = 'direct';
        return runDirect();
    }

    // Auto-detect: try pooled first (best for serverless), then fall back to direct.
    try {
        const result = await runPooled();
        globalForDb.__dbMode = 'pool';
        return result;
    } catch (pooledErr: any) {
        const isConfigError = pooledErr.code === 'invalid_connection_string' || pooledErr.message.includes('direct connection');

        try {
            if (isConfigError) {
                // If we know/suspect pool won't work, ensure we don't suppress the direct error
                const result = await runDirect();
                globalForDb.__dbMode = 'direct';
                return result;
            }

            // Attempt fallback for other errors (e.g. standard connection issues)
            const result = await runDirect();
            globalForDb.__dbMode = 'direct';
            return result;
        } catch (directErr: any) {
            console.error('DB Connection Failed:', {
                poolError: pooledErr.message,
                directError: directErr.message
            });

            // If the pool error was clearly about config, the direct error is likely the real one (or success)
            if (isConfigError) throw directErr;

            throw pooledErr;
        }
    }
}

async function ensureTablesOnce() {
    if (globalForDb.__dbTablesReady_v2) return;

    // Minimal schema; avoids Prisma.
    await sql`
    create table if not exists contacts (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      name text not null,
      email text not null,
      phone text,
      subject text not null,
      message text not null,
      ip text,
      user_agent text
    );
  `;

    await sql`
    create table if not exists orders (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      order_id text not null unique,
      name text not null,
      phone text not null,
      address text not null,
      note text,
      payment text not null,
      subtotal integer not null,
      shipping integer not null,
      total integer not null,
      items jsonb not null,
      ip text
    );
  `;

    await sql`
    create table if not exists products (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      slug text not null unique,
      name text not null,
      price integer not null default 0,
      description text,
      images text,
      category text,
      in_stock boolean default true,
      sort_order integer default 0,
      original_price integer,
      height text,
      light text,
      water text,
      gallery jsonb,
      root_diameter text,
      pot_specification text,
      crown_width text
    );
  `;

    await sql`
    create table if not exists plant_prices (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      name text not null,
      root_diameter text,
      height text,
      price integer not null default 0
    );
  `;

    await sql`
    create table if not exists articles (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      slug text not null unique,
      title text not null,
      author text,
      date text,
      image text,
      description text,
      content text,
      image_alt text,
      tags jsonb
    );
  `;

    globalForDb.__dbTablesReady_v2 = true;
}

export async function ensureDbReady() {
    try {
        await ensureTablesOnce();
    } catch (err) {
        // Do not cache failure.
        globalForDb.__dbTablesReady_v2 = false;
        throw err;
    }
}
