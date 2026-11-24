import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { sql, ensureDbReady } from '@/lib/db';
import { getAllArticles } from '@/lib/articles';
import { getRandomArticleImage } from '@/lib/wordFormatter';

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
        const { slug, title, author, date, description, content, tags, image_alt } = body;
        let { image } = body;

        if (!slug || !title) {
            return NextResponse.json({ ok: false, error: 'Thiếu thông tin bắt buộc (slug, title)' }, { status: 400 });
        }

        // Tự động bỏ hình ngẫu nhiên nếu không có hình
        if (!image || !String(image).trim()) {
            image = getRandomArticleImage();
        }

        const tagsList = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map((s: string) => s.trim()) : []);
        const tagsJson = JSON.stringify(tagsList);
        const finalAuthor = author || 'Cô Lê Nguyễn Hồng Yên';
        const finalDate = date || new Date().toISOString().split('T')[0];
        const finalDesc = description || title;

        // 1. Luôn ghi file markdown dự phòng vào src/content/blog để lưu trữ bền vững
        try {
            const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
            if (!fs.existsSync(blogDir)) {
                fs.mkdirSync(blogDir, { recursive: true });
            }
            const mdFilePath = path.join(blogDir, `${slug}.md`);
            const frontmatter = [
                '---',
                `title: "${title.replace(/"/g, '\\"')}"`,
                `slug: ${slug}`,
                `description: "${finalDesc.replace(/"/g, '\\"')}"`,
                `date: "${finalDate}"`,
                `image: "${image}"`,
                `author: "${finalAuthor.replace(/"/g, '\\"')}"`,
                `tags: ${tagsJson}`,
                '---',
                '',
                content || '',
            ].join('\n');

            fs.writeFileSync(mdFilePath, frontmatter, 'utf8');
        } catch (fsErr) {
            console.warn('Ghi file markdown cảnh báo:', fsErr);
        }

        // 2. Lưu vào Database nếu DB sẵn sàng
        try {
            await ensureDbReady();
            await sql`
                INSERT INTO articles (slug, title, author, date, image, description, content, image_alt, tags)
                VALUES (${slug}, ${title}, ${finalAuthor}, ${finalDate}, ${image}, ${finalDesc}, ${content || ''}, ${image_alt || ''}, ${tagsJson})
                ON CONFLICT (slug) DO UPDATE
                SET title = EXCLUDED.title,
                    author = EXCLUDED.author,
                    date = EXCLUDED.date,
                    image = EXCLUDED.image,
                    description = EXCLUDED.description,
                    content = EXCLUDED.content,
                    tags = EXCLUDED.tags;
            `;
        } catch (dbErr: any) {
            console.warn('Lưu DB cảnh báo (đã lưu file markdown thành công):', dbErr.message);
        }

        try {
            (revalidateTag as any)('articles');
            revalidatePath('/bai-viet');
            revalidatePath(`/bai-viet/${slug}`);
            revalidatePath('/');
        } catch (_) {}

        return NextResponse.json({ ok: true, slug, image });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
