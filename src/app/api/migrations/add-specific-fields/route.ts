import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        await sql`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS root_diameter text,
            ADD COLUMN IF NOT EXISTS pot_specification text,
            ADD COLUMN IF NOT EXISTS crown_width text;
        `;
        return NextResponse.json({ success: true, message: 'Added new columns to products table' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
