import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { getReadingStatsFromMarkdown } from './text';

export interface Service {
    slug: string;
    title: string;
    excerpt: string;
    image?: string;
    bullets: string[];
    wordCount: number;
    readingMinutes: number;
    [key: string]: any;
}

function stripLeadingH1(markdown: string): string {
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

import { unstable_cache } from 'next/cache';

export const getAllServices = cache(
    unstable_cache(
        async function getAllServices(): Promise<Service[]> {
            const folder = path.join(process.cwd(), 'src', 'content', 'services');

            if (!fs.existsSync(folder)) {
                return [];
            }

            const files = fs.readdirSync(folder).filter((f) => f.endsWith('.md'));

            return files
                .map((file) => {
                    const raw = fs.readFileSync(path.join(folder, file), 'utf8');
                    const parsed = matter(raw);
                    const slugFromFile = file.replace('.md', '');
                    const slug = parsed.data.slug || slugFromFile;
                    const bullets = Array.isArray(parsed.data.bullets) ? parsed.data.bullets : [];

                    const excerpt = parsed.data.excerpt || parsed.data.description || '';
                    const content = stripLeadingH1(parsed.content);
                    const statsSource = [excerpt, ...bullets, content].filter(Boolean).join('\n\n');
                    const stats = getReadingStatsFromMarkdown(statsSource);

                    return {
                        slug,
                        title: parsed.data.title || '',
                        excerpt,
                        image: parsed.data.image || '',
                        bullets,
                        wordCount: stats.wordCount,
                        readingMinutes: stats.minutes,
                    };
                })
                .sort((a, b) => (a.title || '').localeCompare(b.title || '', 'vi'));
        },
        ['services-list'],
        { tags: ['services'] }
    )
);

export const getServiceBySlug = cache(
    unstable_cache(
        async function getServiceBySlug(slug: string) {
            const file = path.join(process.cwd(), 'src', 'content', 'services', `${slug}.md`);

            if (!fs.existsSync(file)) {
                return null;
            }

            const raw = fs.readFileSync(file, 'utf8');
            const parsed = matter(raw);

            const content = stripLeadingH1(parsed.content);

            const bullets = Array.isArray(parsed.data.bullets) ? parsed.data.bullets : [];
            const excerpt = parsed.data.excerpt || parsed.data.description || '';
            const statsSource = [excerpt, ...bullets, content].filter(Boolean).join('\n\n');
            const stats = getReadingStatsFromMarkdown(statsSource);

            const serviceData: Service = {
                ...parsed.data,
                slug,
                title: parsed.data.title || '',
                bullets: bullets,
                excerpt: excerpt,
                wordCount: stats.wordCount,
                readingMinutes: stats.minutes
            };

            return {
                slug,
                data: serviceData,
                content,
                stats,
            };
        },
        ['service-by-slug'],
        { tags: ['services'] }
    )
);


