import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDbReady } from '@/lib/db';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        await ensureDbReady();
        const body = await request.json();
        const { slug, name, price, description, images, category, sort_order, original_price, height, light, water, gallery, root_diameter, pot_specification, crown_width } = body;

        // Basic validation
        if (!slug || !name || !price) {
            return NextResponse.json(
                { error: 'Thiếu thông tin bắt buộc (slug, name, price)' },
                { status: 400 }
            );
        }



        // Insert into database
        await sql`
      insert into products (slug, name, price, description, images, category, sort_order, original_price, height, light, water, gallery, root_diameter, pot_specification, crown_width)
      values (${slug}, ${name}, ${price}, ${description}, ${images}, ${category}, ${sort_order || 0}, ${original_price || null}, ${height || null}, ${light || null}, ${water || null}, ${JSON.stringify(gallery || [])}, ${root_diameter || null}, ${pot_specification || null}, ${crown_width || null})
    `;

        revalidateTag('products', {});

        return NextResponse.json({ success: true, message: 'Thêm sản phẩm thành công' });
    } catch (error: any) {
        console.error('Error creating product:', error);

        // Check for unique key violation on slug
        if (error.code === '23505') {
            return NextResponse.json(
                { error: 'Slug sản phẩm đã tồn tại.' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Lỗi server khi thêm sản phẩm' },
            { status: 500 }
        );
    }
}
