import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureDbReady } from '@/lib/db';
import { getAllArticles } from '@/lib/articles';

export async function GET() {
    try {
        const articles = await getAllArticles();
        return NextResponse.json({ ok: true, data: articles });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug, title, author, date, image, description, content, tags, image_alt } = body;

        if (!slug || !title) {
            return NextResponse.json({ ok: false, error: 'Thiếu thông tin bắt buộc (slug, title)' }, { status: 400 });
        }

        const tagsJson = JSON.stringify(tags || []);

        await ensureDbReady();
        await sql`
            INSERT INTO articles (slug, title, author, date, image, description, content, image_alt, tags)
            VALUES (${slug}, ${title}, ${author || ''}, ${date || ''}, ${image || ''}, ${description || ''}, ${content || ''}, ${image_alt || ''}, ${tagsJson})
        `;

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        if (error.message.includes('duplicate key value violates unique constraint')) {
            return NextResponse.json({ ok: false, error: 'Đường dẫn (slug) đã tồn tại' }, { status: 400 });
        }
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
