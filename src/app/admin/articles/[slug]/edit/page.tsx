import { sql, ensureDbReady } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditArticleForm from './form';

export const dynamic = 'force-dynamic';

interface EditArticlePageProps {
    params: Promise<{ slug: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const { slug } = await params;

    await ensureDbReady();
    const result = await sql`
        SELECT * FROM articles WHERE slug = ${slug} LIMIT 1
    `;

    const article = result.rows?.[0];

    if (!article) {
        notFound();
    }

    return <EditArticleForm article={article} />;
}
