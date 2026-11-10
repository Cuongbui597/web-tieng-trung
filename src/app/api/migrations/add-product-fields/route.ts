import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
      alter table products 
      add column if not exists original_price integer,
      add column if not exists height text,
      add column if not exists light text,
      add column if not exists water text,
      add column if not exists gallery jsonb;
    `;
        return NextResponse.json({ message: 'Migration applied: Added original_price, height, light, water, gallery' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
