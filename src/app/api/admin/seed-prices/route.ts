import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'prices_data.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File prices_data.json not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (!Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid JSON format, expected an array' }, { status: 400 });
        }

        let count = 0;
        for (const item of data) {
            if (item.name && item.price) {
                await sql`
                    INSERT INTO plant_prices (name, root_diameter, height, price)
                    VALUES (${item.name}, ${item.root_diameter || ''}, ${item.height || ''}, ${item.price})
                `;
                count++;
            }
        }

        return NextResponse.json({ success: true, count, message: `Seeded ${count} items` });
    } catch (error) {
        console.error('Seed Error:', error);
        return NextResponse.json({ error: 'Failed to seed data', details: String(error) }, { status: 500 });
    }
}
