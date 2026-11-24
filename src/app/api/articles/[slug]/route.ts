import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import fs from 'fs';
import path from 'path';
import { sql, ensureDbReady } from '@/lib/db';
import { getRandomArticleImage } from '@/lib/wordFormatter';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const body = await request.json();
        const { title, author, date, description, content, tags, image_alt } = body;
        let { image } = body;

        if (!image || !String(image).trim()) {
            image = getRandomArticleImage();
        }

        const tagsList = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map((s: string) => s.trim()) : []);
        const tagsJson = JSON.stringify(tagsList);
        const finalAuthor = author || 'Cô Lê Nguyễn Hồng Yên';
        const finalDate = date || new Date().toISOString().split('T')[0];
        const finalDesc = description || title;

        // 1. Cập nhật file markdown
        try {
            const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
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
            console.warn('Ghi file markdown cập nhật:', fsErr);
        }

        // 2. Cập nhật Database nếu có
        try {
            await ensureDbReady();
            await sql`
                UPDATE articles
                SET title = ${title},
                    author = ${finalAuthor},
                    date = ${finalDate},
                    image = ${image},
                    description = ${finalDesc},
                    content = ${content || ''},
                    image_alt = ${image_alt || ''},
                    tags = ${tagsJson}
                WHERE slug = ${slug}
            `;
        } catch (dbErr: any) {
            console.warn('Cập nhật DB cảnh báo:', dbErr.message);
        }

        try {
            (revalidateTag as any)('articles');
            revalidatePath('/bai-viet');
            revalidatePath(`/bai-viet/${slug}`);
            revalidatePath('/');
        } catch (_) {}

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        // 1. Xóa file markdown nếu có
        try {
            const mdFilePath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
            if (fs.existsSync(mdFilePath)) {
                fs.unlinkSync(mdFilePath);
            }
        } catch (fsErr) {
            console.warn('Xóa file markdown cảnh báo:', fsErr);
        }

        // 2. Xóa trong database
        try {
            await ensureDbReady();
            await sql`DELETE FROM articles WHERE slug = ${slug}`;
        } catch (dbErr: any) {
            console.warn('Xóa DB cảnh báo:', dbErr.message);
        }

        try {
            (revalidateTag as any)('articles');
            revalidatePath('/bai-viet');
            revalidatePath(`/bai-viet/${slug}`);
            revalidatePath('/');
        } catch (_) {}

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}
