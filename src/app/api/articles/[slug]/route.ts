import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDbReady } from '@/lib/db';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { title, author, date, image, description, content, tags, image_alt } = body;

        const tagsJson = JSON.stringify(tags || []);

        await ensureDbReady();
        const result = await sql`
            UPDATE articles
            SET title = ${title},
                author = ${author || ''},
                date = ${date || ''},
                image = ${image || ''},
                description = ${description || ''},
                content = ${content || ''},
                image_alt = ${image_alt || ''},
                tags = ${tagsJson}
            WHERE slug = ${slug}
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ ok: false, error: 'Không tìm thấy bài viết' }, { status: 404 });
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        await ensureDbReady();
        const result = await sql`
            DELETE FROM articles WHERE slug = ${slug}
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ ok: false, error: 'Không tìm thấy bài viết' }, { status: 404 });
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
