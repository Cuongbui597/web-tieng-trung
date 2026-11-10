import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDbReady } from '@/lib/db';
import { revalidateTag } from 'next/cache';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { name, price, description, images, category, in_stock, sort_order, original_price, height, light, water, gallery, root_diameter, pot_specification, crown_width } = body;

        // Basic Validation
        if (!name || !slug) {
            return NextResponse.json(
                { error: 'Tên và Slug là bắt buộc' },
                { status: 400 }
            );
        }

        await ensureDbReady();

        // Check if product exists
        const check = await sql`SELECT id FROM products WHERE slug = ${slug}`;
        if (check.rows.length === 0) {
            return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
        }

        // Update
        await sql`
      UPDATE products
      SET 
        name = ${name},
        price = ${price || 0},
        description = ${description || ''},
        images = ${images || ''},
        category = ${category || ''},
        in_stock = ${in_stock ?? true},
        sort_order = ${sort_order || 0},
        original_price = ${original_price || null},
        height = ${height || null},
        light = ${light || null},
        water = ${water || null},
        gallery = ${JSON.stringify(gallery || [])},
        root_diameter = ${root_diameter || null},
        pot_specification = ${pot_specification || null},
        crown_width = ${crown_width || null}
      WHERE slug = ${slug}
    `;

        revalidateTag('products', {});
        return NextResponse.json({ success: true, slug });
    } catch (err: any) {
        console.error('Update Product Error:', err);
        return NextResponse.json(
            { error: 'Lỗi server: ' + err.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        await ensureDbReady();

        await sql`DELETE FROM products WHERE slug = ${slug}`;
        revalidateTag('products', {});

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Delete Product Error:', err);
        return NextResponse.json(
            { error: 'Lỗi server: ' + err.message },
            { status: 500 }
        );
    }
}
