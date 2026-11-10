import Link from 'next/link';
import { getAllProducts } from '@/lib/server';
import { STORE_CATEGORIES, slugify, normalizeText } from '@/lib/client';
import { getCollectionPageSchema, toJsonLd } from '@/lib/schema';
import ProductCard from '@/components/ProductCard';

export const revalidate = 3600;

export const metadata = {
    title: 'Cửa Hàng',
    description: 'Khám phá danh mục cây cảnh và sản phẩm nổi bật.',
    alternates: {
        canonical: 'https://chamsoccanhquan.com/cua-hang',
    },
};

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StoreIndexPage({ searchParams }: PageProps) {
    const products = await getAllProducts();
    const categories = STORE_CATEGORIES;

    const resolvedSearchParams = await searchParams;
    const searchQuery = typeof resolvedSearchParams?.search === 'string' ? resolvedSearchParams.search : '';

    // Filter for Search Result
    const searchResults = (() => {
        if (!searchQuery.trim()) return [];

        // Fuzzy search logic:
        const queryTokens = normalizeText(searchQuery).split(/\s+/).filter(Boolean);
        return products.filter((p) => {
            const productText = normalizeText(p.name || ''); // Use name only as requested
            return queryTokens.every(token => productText.includes(token));
        });
    })();

    const isSearching = !!searchQuery.trim();

    const collectionSchema = getCollectionPageSchema({
        url: '/cua-hang',
        name: 'Cửa hàng Cây Cảnh Đà Nẵng',
        description: 'Danh sách các loại cây cảnh trong nhà, cây văn phòng, cây phong thuỷ.',
        items: products.slice(0, 20).map(p => ({
            name: p.name, // Use name
            url: `/san-pham/${p.slug}`
        }))
    });

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }}
            />
            {/* Header Section */}
            <section className="bg-[var(--bg)] py-12 md:py-16 px-4">
                <div className="max-w-sm mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-4 tracking-tight">Cửa hàng</h1>
                    <p className="text-lg text-[var(--muted)] max-w-xs mx-auto">Chọn danh mục hoặc tìm kiếm</p>
                </div>
            </section>

            {/* Search Header Info (Only if searching) */}
            {isSearching && (
                <section className="container-app mb-10">
                    <div className="max-w-[var(--container)] mx-auto">
                        <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-3 sm:px-4 py-2 sm:py-3 mb-6">
                            <p className="text-xs sm:text-sm text-[var(--text)]">
                                Kết quả tìm kiếm cho: <span className="font-semibold">&quot;{searchQuery.trim()}&quot;</span> ({searchResults.length} sản phẩm)
                            </p>
                            <Link href="/cua-hang" className="text-xs sm:text-sm font-semibold link-accent">
                                Xóa tìm kiếm
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Content Area */}
            {isSearching ? (
                // SEARCH VIEW: Flat List
                <section className="pb-24 px-4 bg-[var(--bg)]">
                    <div className="max-w-[var(--container)] mx-auto">
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {searchResults.map((product) => (
                                    <ProductCard key={product.slug} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-[var(--muted)]">Không tìm thấy sản phẩm nào khớp với từ khóa.</p>
                                <Link href="/cua-hang" className="text-sm font-semibold link-accent mt-2 inline-block">
                                    Xem tất cả danh mục
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                // CATEGORY VIEW: Structured Sections
                <div className="space-y-16 pb-24">
                    {categories.map((category) => {
                        const catSlug = slugify(category);
                        // Filter products for this specific category
                        const catProducts = products.filter(p => slugify(p.category || 'Khác') === slugify(category));

                        // If no products in this category, do we hide it? 
                        // Usually yes, to avoid empty sections.
                        if (catProducts.length === 0) return null;

                        // Sort by newest or important? (Default order usually fine, logic is in server.js)
                        const displayProducts = catProducts.slice(0, 4); // Limit to 4 for the section preview

                        return (
                            <section key={category} className="px-4 bg-[var(--bg)]">
                                <div className="max-w-[var(--container)] mx-auto">
                                    <div className="flex items-end justify-between mb-6 border-b border-[var(--border)] pb-4">
                                        <div>
                                            <h2 className="text-2xl font-[family:var(--font-serif)] font-semibold text-[var(--text)]">
                                                <Link href={`/cua-hang/${catSlug}`} className="hover:text-[var(--accent)] transition-colors">
                                                    {category}
                                                </Link>
                                            </h2>
                                            <p className="text-sm text-[var(--muted)] mt-1 hidden sm:block">
                                                {catProducts.length} sản phẩm
                                            </p>
                                        </div>
                                        <Link href={`/cua-hang/${catSlug}`} className="text-sm font-medium link-accent flex items-center gap-1">
                                            Xem tất cả
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {displayProducts.map((product) => (
                                            <ProductCard key={product.slug} product={product} priority={true} />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
