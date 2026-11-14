import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/server';
import { getBreadcrumbSchema, toJsonLd } from '@/lib/schema';
import { Metadata } from 'next';

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Góc Học Tập & Mẹo Học Tiếng Trung",
    description: "Tổng hợp mẹo học tiếng Trung, luyện thi HSK 1-3 bứt tốc, từ vựng công xưởng giày da - may mặc và kinh nghiệm phiên dịch thực chiến từ cô Lê Nguyễn Hồng Yên.",
    keywords: ["học tiếng trung", "mẹo thi hsk", "từ vựng công xưởng", "tiếng trung giao tiếp", "phiên dịch tiếng trung"],
    alternates: {
        canonical: "https://tiengtrunghsk.vn/bai-viet"
    },
    openGraph: {
        title: "Góc Học Tập & Mẹo Học Tiếng Trung - Tiếng Trung HSK Việt",
        description: "Chia sẻ kinh nghiệm luyện thi HSK, tiếng Trung công xưởng và kỹ năng phiên dịch thực tế.",
        url: "https://tiengtrunghsk.vn/bai-viet",
        type: "website"
    }
};

interface SearchParams {
    page?: string;
    [key: string]: string | string[] | undefined;
}

export default async function ArticleListPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const allArticles = await getAllArticles();

    // Pagination logic
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams?.page) || 1;
    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentArticles = allArticles.slice(start, end);

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Bài viết', url: '/bai-viet' },
    ]);

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />
            {/* Header */}
            <section className="py-24 px-4 bg-gradient-sage">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold text-gradient-accent mb-4 tracking-tight font-serif">Góc Học Tập & Blog</h1>
                    <p className="text-lg text-[var(--muted)] mx-auto">Chia sẻ phương pháp học tiếng Trung, lộ trình thi HSK và kinh nghiệm phiên dịch thực chiến từ cô Lê Nguyễn Hồng Yên</p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-24 px-4 bg-[var(--bg)]">
                <div className="max-w-5xl mx-auto">
                    {currentArticles.length === 0 ? (
                        <p className="text-[var(--muted)] text-center py-12 text-lg">Chưa có bài viết nào</p>
                    ) : (
                        <>
                            <div className="space-y-14">
                                {currentArticles.map((article) => {
                                    const imageSrc = article.image || '/placeholder-plant.svg'; // Fallback for image
                                    return (
                                        <Link key={article.slug} href={`/bai-viet/${article.slug}`} className="block">
                                            <div className="card-gradient card-hover overflow-hidden cursor-pointer">
                                                <div className="flex flex-col md:flex-row gap-1">
                                                    {/* Image on left - Apple style rectangle */}
                                                    <div className="relative w-full aspect-square md:w-64 md:aspect-square flex-shrink-0 bg-[var(--surface-2)]">
                                                        <Image
                                                            src={imageSrc}
                                                            alt={article.title || 'Bài viết'}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, 400px"
                                                            quality={60}
                                                        />
                                                    </div>

                                                    {/* Content on right */}
                                                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                                                        <p className="text-xs text-[var(--muted)] mb-3">
                                                            {new Date(article.date).toLocaleDateString('vi-VN')}
                                                        </p>
                                                        <h2 className="text-xl md:text-2xl font-semibold text-[var(--title)] mb-3 leading-tight font-serif">{article.title}</h2>
                                                        <p className="text-[var(--muted)] mb-4 line-clamp-2">{article.description}</p>
                                                        <p className="link-accent text-sm font-medium inline-flex items-center gap-1">
                                                            Đọc bài viết
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-16">
                                    <Link
                                        href={currentPage > 1 ? `/bai-viet?page=${currentPage - 1}` : '#'}
                                        className={`btn btn-ghost px-3 py-2 ${currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
                                        aria-label="Trang trước"
                                        aria-disabled={currentPage <= 1}
                                    >
                                        ←
                                    </Link>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <Link
                                            key={p}
                                            href={`/bai-viet?page=${p}`}
                                            className={`w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] text-sm font-medium transition-colors ${p === currentPage
                                                ? 'bg-[var(--accent)] text-white'
                                                : 'hover:bg-[var(--surface-2)] text-[var(--text)]'
                                                }`}
                                        >
                                            {p}
                                        </Link>
                                    ))}

                                    <Link
                                        href={currentPage < totalPages ? `/bai-viet?page=${currentPage + 1}` : '#'}
                                        className={`btn btn-ghost px-3 py-2 ${currentPage >= totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                                        aria-label="Trang sau"
                                        aria-disabled={currentPage >= totalPages}
                                    >
                                        →
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
