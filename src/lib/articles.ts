import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { sql, ensureDbReady } from '@/lib/db';
import { unstable_cache } from 'next/cache';

export interface Article {
    slug: string;
    title: string;
    author: string;
    date: string;
    image: string;
    description: string;
    content?: string;
    updated?: string;
    image_alt?: string;
    tags?: string[];
}

function preferWebpIfLocalPublicAsset(src: unknown): string {
    const raw = String(src ?? '').trim();
    if (!raw || !raw.startsWith('/')) return raw;

    const withoutQuery = raw.split('?')[0].split('#')[0];
    const ext = path.extname(withoutQuery).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return raw;

    const webpPath = withoutQuery.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    const absolute = path.join(process.cwd(), 'public', webpPath);
    if (fs.existsSync(absolute)) return webpPath;
    return raw;
}

function normalizeFrontmatter(data: unknown): Partial<Article> {
    const fm = data && typeof data === 'object' ? data as Record<string, any> : {};

    const title = fm.title ?? '';
    const author = fm.author ?? fm.authors ?? '';

    const date = fm.date ?? fm.datePublished ?? fm.publishedAt ?? '';
    const updated = fm.updated ?? fm.dateModified ?? fm.modifiedAt ?? '';

    const image = preferWebpIfLocalPublicAsset(fm.image ?? fm.coverImage ?? fm.thumbnail ?? '');
    const description = fm.description ?? fm.excerpt ?? '';
    const tags = Array.isArray(fm.tags) ? fm.tags : (typeof fm.tags === 'string' ? fm.tags.split(',').map((s: string) => s.trim()) : (typeof fm.keywords === 'string' ? fm.keywords.split(',').map((s: string) => s.trim()) : []));
    const image_alt = fm.image_alt ?? fm.alt ?? title;

    return {
        ...fm,
        title,
        author,
        date,
        updated,
        image,
        image_alt,
        description,
        tags,
    };
}

function toSortableTimestamp(dateLike: unknown): number {
    const t = Date.parse(String(dateLike ?? ''));
    return Number.isFinite(t) ? t : 0;
}

function stripLeadingH1(markdown: unknown): string {
    const lines = String(markdown ?? '').split(/\r?\n/);
    let i = 0;
    while (i < lines.length && lines[i].trim() === '') i++;
    if (i >= lines.length) return '';

    if (/^\s*#\s+/.test(lines[i])) {
        lines.splice(i, 1);
        while (i < lines.length && lines[i].trim() === '') lines.splice(i, 1);
    }

    return lines.join('\n');
}

async function getArticlesFromDb(): Promise<Article[]> {
    try {
        await ensureDbReady();
        const result = await sql`
            SELECT slug, title, author, date, image, description, updated, image_alt, tags 
            FROM articles 
            ORDER BY date DESC, created_at DESC
        `;
        return (result.rows as any[]).map(row => ({
            slug: row.slug,
            title: row.title,
            author: row.author || '',
            date: row.date || '',
            image: row.image || '',
            description: row.description || '',
            updated: row.updated || undefined,
            image_alt: row.image_alt || undefined,
            tags: row.tags || []
        }));
    } catch (e) {
        console.error('DB Fetch Articles Error:', e);
        return [];
    }
}

function getArticlesFromFs(): Article[] {
    const folder = path.join(process.cwd(), 'src', 'content', 'blog');
    if (!fs.existsSync(folder)) return [];
    try {
        const files = fs.readdirSync(folder).filter(f => f.endsWith('.md'));
        return files.map(file => {
            const content = fs.readFileSync(path.join(folder, file), 'utf8');
            const matterResult = matter(content);
            const slug = file.replace('.md', '');
            const data = normalizeFrontmatter(matterResult.data);
            return {
                slug,
                title: data.title || '',
                author: data.author || '',
                date: data.date || '',
                image: data.image || '',
                description: data.description || '',
                updated: data.updated,
                image_alt: data.image_alt,
                tags: data.tags,
                content: matterResult.content,
            } as Article;
        });
    } catch (err) {
        console.error('FS Read Articles Error:', err);
        return [];
    }
}

function getArticleFromFsBySlug(slug: string): { slug: string; data: Partial<Article>; content: string } | null {
    const file = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
    if (!fs.existsSync(file)) {
        return null;
    }
    try {
        const content = fs.readFileSync(file, 'utf8');
        const matterResult = matter(content);
        const data = normalizeFrontmatter(matterResult.data);
        return {
            slug,
            data,
            content: stripLeadingH1(matterResult.content),
        };
    } catch (err) {
        console.error(`FS Read Article (${slug}) Error:`, err);
        return null;
    }
}

let hasSyncedArticles = false;

async function syncFsArticlesToDb(): Promise<void> {
    if (hasSyncedArticles) return;
    try {
        await ensureDbReady();
        const fsArticles = getArticlesFromFs();
        if (fsArticles.length === 0) return;

        const existing = await sql`SELECT slug FROM articles`;
        const existingSlugs = new Set((existing.rows as any[]).map(r => r.slug));

        for (const a of fsArticles) {
            if (!existingSlugs.has(a.slug)) {
                const tagsJson = JSON.stringify(a.tags || []);
                await sql`
                    INSERT INTO articles (slug, title, author, date, image, description, content, image_alt, tags)
                    VALUES (${a.slug}, ${a.title}, ${a.author}, ${a.date}, ${a.image}, ${a.description}, ${a.content || ''}, ${a.image_alt || ''}, ${tagsJson})
                    ON CONFLICT (slug) DO UPDATE
                    SET title = EXCLUDED.title,
                        author = EXCLUDED.author,
                        date = EXCLUDED.date,
                        image = EXCLUDED.image,
                        description = EXCLUDED.description,
                        content = EXCLUDED.content,
                        tags = EXCLUDED.tags;
                `;
            }
        }
        hasSyncedArticles = true;
    } catch {
        // Silently continue if DB is offline or not configured
    }
}

export const getAllArticles = cache(
    unstable_cache(
        async function getAllArticles(): Promise<Article[]> {
            await syncFsArticlesToDb();

            // 1. Fetch from DB
            const dbArticles = await getArticlesFromDb();

            // 2. Fetch from FS
            const fsArticles = getArticlesFromFs();

            // Combine and Dedup (DB takes precedence)
            const combined = [...dbArticles, ...fsArticles];
            const seen = new Set<string>();
            const deduped: Article[] = [];
            
            for (const a of combined) {
                if (!seen.has(a.slug)) {
                    seen.add(a.slug);
                    deduped.push(a);
                }
            }

            return deduped.sort((a, b) => toSortableTimestamp(b.date) - toSortableTimestamp(a.date));
        },
        ['articles-list'],
        { tags: ['articles'], revalidate: 60 }
    )
);

async function getArticleFromDbBySlug(slug: string): Promise<{ slug: string; data: Partial<Article>; content: string } | null> {
    try {
        await ensureDbReady();
        const result = await sql`
            SELECT slug, title, author, date, image, description, updated, image_alt, tags, content
            FROM articles 
            WHERE slug = ${slug}
            LIMIT 1
        `;
        const row = result.rows?.[0];
        if (!row) return null;

        const data: Partial<Article> = {
            title: row.title,
            author: row.author || '',
            date: row.date || '',
            image: row.image || '',
            description: row.description || '',
            updated: row.updated || undefined,
            image_alt: row.image_alt || undefined,
            tags: row.tags || []
        };

        return {
            slug: row.slug,
            data,
            content: stripLeadingH1(row.content || '')
        };
    } catch (e) {
        console.error('DB Fetch Article By Slug Error:', e);
        return null;
    }
}

export const getArticleBySlug = cache(
    async function getArticleBySlug(slug: string): Promise<{ slug: string; data: Partial<Article>; content: string } | null> {
        const cleanSlug = String(slug || '').trim();
        if (!cleanSlug) return null;

        return unstable_cache(
            async () => {
                await syncFsArticlesToDb();

                // 1. Try DB first
                const dbArticle = await getArticleFromDbBySlug(cleanSlug);
                if (dbArticle) return dbArticle;

                // 2. Fallback to FS
                return getArticleFromFsBySlug(cleanSlug);
            },
            ['article-by-slug', cleanSlug],
            { tags: ['articles'], revalidate: 60 }
        )();
    }
);
