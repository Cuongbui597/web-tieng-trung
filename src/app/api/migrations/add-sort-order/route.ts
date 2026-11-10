import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
      alter table products 
      add column if not exists sort_order integer default 0;
    `;
        return NextResponse.json({ message: 'Migration applied: Added sort_order to products table' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
