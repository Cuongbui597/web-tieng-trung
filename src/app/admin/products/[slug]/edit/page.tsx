import { sql, ensureDbReady } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditProductForm from './form';

export const dynamic = 'force-dynamic';

interface EditProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { slug } = await params;

    await ensureDbReady();
    const result = await sql`
    select * from products where slug = ${slug} limit 1
  `;

    const product = result.rows?.[0];

    if (!product) {
        notFound();
    }

    return <EditProductForm product={product} />;
}
