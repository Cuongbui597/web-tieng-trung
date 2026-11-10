import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/server';
import AddToCartButton from '@/components/AddToCartButton';
import MarkdownImage from '@/components/MarkdownImage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { absoluteUrl, getBreadcrumbSchema, getProductSchema, parseVndPrice, toJsonLd } from '@/lib/schema';
import { slugify } from '@/lib/client';
import { formatPrice } from '@/lib/format';
import ProductGallery from '@/components/ProductGallery';

function stripMarkdownLite(markdown: string) {
    const s = String(markdown ?? '');
    return s
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[`*_>#-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Generate static params for all products with their categories
export async function generateStaticParams() {
    const products = await getAllProducts();
    return products.map((product) => ({
        category: slugify(product.category || 'Khác'), // Pre-calculate category slug
        slug: product.slug,
    }));
}

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600;

interface PageProps {
    params: Promise<{
        slug: string;
        category: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug, category } = await params;
    const data = await getProductBySlug(slug);

    if (!data) {
        return {
            title: "Sản phẩm không tìm thấy",
        };
    }

    const info = data.data;
    const productImage = info.images || '/placeholder-plant.svg'; // Use info.images
    const ogImage = productImage.startsWith('http') ? productImage : `https://chamsoccanhquan.com${productImage}`;

    return {
        title: info.name, // Use info.name
        description: `${info.name} - ${info.price}. Loại: ${info.category}. Giao hàng nhanh 24h.`,
        keywords: [info.name, info.category || 'Cây cảnh', "cây cảnh", "mua online"],
        alternates: {
            canonical: `https://chamsoccanhquan.com/cua-hang/${category}/${slug}`
        },
        openGraph: {
            title: info.name,
            description: `Mua ${info.name} với giá ${info.price}. Chất lượng đảm bảo.`,
            url: `https://chamsoccanhquan.com/cua-hang/${category}/${slug}`,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 800,
                    height: 600,
                    alt: info.name
                }
            ]
        }
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug, category } = await params;
    const data = await getProductBySlug(slug);
    if (!data) {
        notFound();
    }

    const info = data.data;

    const content = data.content;
    const excerpt = stripMarkdownLite(content).slice(0, 260);

    // SANITIZE: Ignore Google Drive links
    // Use info.images
    const productImage = (info.images && !info.images.includes('drive.google.com'))
        ? info.images
        : '/placeholder-plant.svg';
    const productImageAbs = absoluteUrl(productImage);
    const priceVnd = parseVndPrice(info.price);

    const productSchema = getProductSchema({
        url: `/cua-hang/${category}/${slug}`,
        name: info.name, // Use info.name
        image: productImageAbs,
        description: content,
        category: info.category,
        priceVnd: priceVnd !== null ? priceVnd : undefined,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Sản phẩm', url: '/san-pham' }, // Keep this or change to /cua-hang?
        { name: info.category || 'Sản phẩm', url: `/cua-hang/${category}` },
        { name: info.name, url: `/cua-hang/${category}/${slug}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />
            <main className="min-h-screen bg-[var(--bg)]">
                {/* Breadcrumb */}
                <div className="border-b border-[var(--border)] px-4 py-4 bg-[color:rgba(252,250,241,0.70)] backdrop-blur">
                    <div className="max-w-[var(--container)] mx-auto flex items-center gap-2 text-xs text-[var(--muted)]">
                        <Link href="/" className="hover:text-[var(--text)]">Trang chủ</Link>
                        <span>/</span>
                        <Link href="/cua-hang" className="hover:text-[var(--text)]">Cửa hàng</Link>
                        <span>/</span>
                        <Link href={`/cua-hang/${category}`} className="hover:text-[var(--text)]">{info.category}</Link>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="max-w-[var(--container)] mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Image Gallery */}
                        <div className="flex items-start lg:sticky lg:top-24 lg:h-fit">
                            <div className="w-full">
                                <ProductGallery
                                    mainImage={productImage}
                                    gallery={info.gallery}
                                    productName={info.name}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            {/* Category badge */}
                            <Link href={`/cua-hang/${category}`}>
                                <span className="badge-gradient hover:opacity-80 transition-opacity cursor-pointer mb-4">
                                    {info.category}
                                </span>
                            </Link>

                            {/* Product name */}
                            <h1 className="text-4xl md:text-5xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] tracking-tight leading-tight">{info.name}</h1>

                            {/* Metadata Badges */}
                            <div className="flex flex-wrap gap-3">
                                {info.height && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 9V14"></path><path d="M21 5H17"></path><path d="M10 5H3"></path><path d="M7 22V5"></path></svg>
                                        {info.height}
                                    </div>
                                )}
                                {info.root_diameter && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                                        <span className="font-semibold text-xs text-amber-900">ĐK Gốc:</span> {info.root_diameter}
                                    </div>
                                )}
                                {info.crown_width && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        <span className="font-semibold text-xs text-green-900">Tán:</span> {info.crown_width}
                                    </div>
                                )}
                                {info.pot_specification && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-sm font-medium">
                                        <span className="font-semibold text-xs text-stone-900">Chậu:</span> {info.pot_specification}
                                    </div>
                                )}
                                {info.light && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>
                                        {info.light}
                                    </div>
                                )}
                                {info.water && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                                        {info.water}
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-4">
                                <p className="text-3xl text-[var(--accent)] font-bold">{formatPrice(info.price)}</p>
                                {info.original_price != null && info.price != null && info.original_price > info.price && (
                                    <p className="text-xl text-gray-400 line-through decoration-gray-400 decoration-1">{formatPrice(info.original_price)}</p>
                                )}
                            </div>

                            {/* Description - Readable */}
                            <div className="text-base text-[var(--muted)] leading-relaxed pt-4 max-w-xl">
                                {excerpt}{stripMarkdownLite(content).length > excerpt.length ? '…' : ''}
                            </div>

                            {/* CTA - Apple button style */}
                            <div className="pt-8 space-y-4">
                                <AddToCartButton product={{
                                    id: info.id || -1,
                                    created_at: info.created_at || new Date(),
                                    slug: slug,
                                    name: info.name,
                                    price: info.price,
                                    images: info.images,
                                    category: info.category,
                                    description: info.description,
                                    in_stock: info.in_stock !== undefined ? info.in_stock : true
                                }} />
                                <p className="text-sm text-[var(--muted)]">Giao hàng có tính phí tùy số lượng đơn hàng • Đổi trả trong 7 ngày</p>
                            </div>

                            {/* Features - Minimal */}
                            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-[var(--border)] mt-12">
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text)] mb-1">Chất lượng cao</p>
                                    <p className="text-xs text-[var(--muted)]">Đảm bảo tươi tốt</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text)] mb-1">Giao nhanh 24h</p>
                                    <p className="text-xs text-[var(--muted)]">Miễn phí ship</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[var(--text)] mb-1">Đổi trả dễ dàng</p>
                                    <p className="text-xs text-[var(--muted)]">Trong 7 ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Description - Clean section */}
                    <div className="mt-32 max-w-3xl">
                        <h2 className="text-2xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-8">Chi tiết sản phẩm</h2>
                        <div className="article-content max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    table: ({ className, ...props }) => (
                                        <div className="md-table">
                                            <table
                                                {...props}
                                                className={[className].filter(Boolean).join(' ')}
                                            />
                                        </div>
                                    ),
                                    img: (props) => <MarkdownImage {...props} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
