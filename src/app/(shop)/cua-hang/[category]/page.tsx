import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProducts } from '@/lib/server';
import ProductCard from '@/components/ProductCard';
import { safeDecode, slugify } from '@/lib/client';
import { CATEGORY_ITEMS } from '@/lib/constants';

function getCategoryLabel(val: string | undefined | null) {
    const found = CATEGORY_ITEMS.find(c => c.value === val || c.label === val);
    return found ? found.label : (val || 'Khác');
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    const products = await getAllProducts();
    const categories = Array.from(new Set(products.map((p) => p.category || 'Khác').filter(Boolean)));
    return categories.map((category) => ({ category: slugify(category) }));
}

export async function generateMetadata({ params }: PageProps) {
    const { category } = await params;
    const products = await getAllProducts();
    // We need to reverse lookup the display name from the slug
    const matchingProduct = products.find(p => slugify(p.category || 'Khác') === category);
    const rawCategory = matchingProduct ? (matchingProduct.category || 'Khác') : safeDecode(category);
    const displayCategory = getCategoryLabel(rawCategory);

    return {
        title: `Cửa Hàng: ${displayCategory}`,
        description: `Khám phá sản phẩm trong danh mục ${displayCategory}.`,
        alternates: {
            canonical: `https://chamsoccanhquan.com/cua-hang/${category}`,
        },
    };
}

export default async function StoreCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const products = await getAllProducts();

    // Filter by matching slugified category
    const filtered = products.filter((p) => slugify(p.category || 'Khác') === category);

    if (!filtered.length) {
        notFound();
    }

    // Get display name from first product
    const displayCategory = getCategoryLabel(filtered[0].category);

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <section className="bg-[var(--bg)] py-12 md:py-14 px-4">
                <div className="max-w-[var(--container)] mx-auto">
                    <p className="text-sm text-[var(--muted)] mb-1">Danh mục</p>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h1 className="text-3xl md:text-4xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] tracking-tight">{displayCategory}</h1>
                        <Link href="/cua-hang" className="text-sm font-medium link-accent">
                            Xem tất cả danh mục
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-[var(--bg)]">
                <div className="max-w-[var(--container)] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filtered.map((product) => (
                            <ProductCard key={product.slug} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
