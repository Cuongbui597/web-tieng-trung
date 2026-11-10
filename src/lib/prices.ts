'use server';

import { sql, ensureDbReady } from '@/lib/db';
import { PlantPrice } from '@/lib/types';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';



import fs from 'fs';
import path from 'path';

export type ActionResponse = { success: true } | { success: false; error: string };

function getFallbackPrices(): PlantPrice[] {
    try {
        const filePath = path.join(process.cwd(), 'prices_data.json');
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            return data.map((item: any, idx: number) => ({
                id: idx + 1,
                created_at: new Date(),
                name: item.name || '',
                root_diameter: item.root_diameter || '',
                height: item.height || '',
                price: Number(item.price || 0)
            }));
        }
    } catch (e) {
        console.error('Fallback prices error:', e);
    }
    return [];
}

export const getPrices = unstable_cache(
    async function getPrices(): Promise<PlantPrice[]> {
        try {
            await ensureDbReady();
            const res = await sql`
      SELECT * FROM plant_prices ORDER BY created_at DESC
    `;
            const rows = res.rows as unknown as PlantPrice[];
            if (rows && rows.length > 0) {
                return rows;
            }
            return getFallbackPrices();
        } catch (error) {
            console.error('getPrices error:', error);
            return getFallbackPrices();
        }
    },
    ['prices-list'],
    { tags: ['prices'] }
);

export async function createPrice(formData: FormData): Promise<ActionResponse> {
    const name = formData.get('name') as string;
    const root_diameter = formData.get('root_diameter') as string;
    const height = formData.get('height') as string;
    const price = formData.get('price') as string;

    if (!name || !price) {
        return { success: false, error: 'Missing required fields' };
    }

    try {
        await ensureDbReady();
        await sql`
      INSERT INTO plant_prices (name, root_diameter, height, price)
      VALUES (${name}, ${root_diameter}, ${height}, ${price})
    `;
        revalidateTag('prices', {});
        revalidatePath('/admin/prices');
        return { success: true };
    } catch (error) {
        console.error('createPrice error:', error);
        return { success: false, error: 'Failed to create price' };
    }
}

interface UpdatePriceData {
    name: string;
    root_diameter: string;
    height: string;
    price: string | number;
}

export async function updatePrice(id: string | number, data: UpdatePriceData): Promise<ActionResponse> {
    const { name, root_diameter, height, price } = data;

    if (!name || !price) {
        return { success: false, error: 'Missing required fields' };
    }

    try {
        await ensureDbReady();
        await sql`
            UPDATE plant_prices 
            SET name = ${name}, 
                root_diameter = ${root_diameter}, 
                height = ${height}, 
                price = ${price}
            WHERE id = ${id}
        `;
        revalidateTag('prices', {});
        revalidatePath('/admin/prices');
        revalidatePath('/bang-gia'); // Update public page too
        return { success: true };
    } catch (error) {
        console.error('updatePrice error:', error);
        return { success: false, error: 'Failed to update price' };
    }
}

export async function deletePrice(id: string | number): Promise<ActionResponse> {
    try {
        await ensureDbReady();
        await sql`DELETE FROM plant_prices WHERE id = ${id}`;
        revalidateTag('prices', {});
        revalidatePath('/admin/prices');
        revalidatePath('/bang-gia');
        return { success: true };
    } catch (error) {
        console.error('deletePrice error:', error);
        return { success: false, error: 'Failed to delete price' };
    }
}

interface BulkVariant {
    root_diameter: string;
    height: string;
    price: string | number;
}

export async function createBulkPrices(name: string, variants: BulkVariant[]): Promise<ActionResponse> {
    if (!name || !Array.isArray(variants) || variants.length === 0) {
        return { success: false, error: 'Dữ liệu không hợp lệ' };
    }

    try {
        await ensureDbReady();

        // Loop insert for simplicity (Postgres driver usually handles this fine)
        for (const v of variants) {
            if (!v.price) continue;
            await sql`
        INSERT INTO plant_prices (name, root_diameter, height, price)
        VALUES (${name}, ${v.root_diameter}, ${v.height}, ${v.price})
      `;
        }

        revalidateTag('prices', {});
        revalidatePath('/admin/prices');
        revalidatePath('/bang-gia');
        return { success: true };
    } catch (error) {
        console.error('createBulkPrices error:', error);
        return { success: false, error: 'Lỗi khi lưu dữ liệu' };
    }
}
