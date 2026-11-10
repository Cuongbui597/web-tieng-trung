import { redirect, notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/server';
import { slugify } from '@/lib/client';

export const dynamic = 'force-static';
export const dynamicParams = true; // Allow checking dynamic params to redirect

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DeprecatedProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product || !product.data) {
        notFound();
    }

    const categorySlug = slugify(product.data.category || 'Khác');
    redirect(`/cua-hang/${categorySlug}/${slug}`);
}
