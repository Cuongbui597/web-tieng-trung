import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug } from '@/lib/server';
import MarkdownImage from '@/components/MarkdownImage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getBreadcrumbSchema, getServiceSchema, toJsonLd } from '@/lib/schema';

// Helper types
interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

function toPlainText(node: any): string {
    if (node == null) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(toPlainText).join('');
    if (typeof node === 'object' && 'props' in node) return toPlainText(node.props?.children);
    return '';
}

function slugifyHeading(input: string): string {
    return String(input ?? '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

export async function generateStaticParams() {
    const services = await getAllServices();
    return services.map((s) => ({ slug: s.slug }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    if (!service) return { title: 'Dịch vụ không tìm thấy' };
    return {
        title: service.data.title,
        description: service.data.excerpt,
        alternates: {
            canonical: `https://chamsoccanhquan.com/dich-vu/${slug}`,
        },
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    if (!service) notFound();

    const info = service.data;
    const content = service.content;
    const bullets = Array.isArray(info.bullets) ? info.bullets : [];
    const stats = service.stats || { wordCount: 0, minutes: 0 };

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Dịch vụ', url: '/dich-vu' },
        { name: info.title, url: `/dich-vu/${slug}` },
    ]);

    const combinedDescription = [info.excerpt, ...bullets].filter(Boolean).join(' ');
    const serviceSchema = getServiceSchema({
        url: `/dich-vu/${slug}`,
        name: info.title,
        description: combinedDescription,
        image: info.image || '/placeholder-plant.svg',
        serviceType: 'Dịch vụ cây xanh',
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />

            <main className="min-h-screen bg-[var(--bg)]">
                <section className="bg-[var(--bg)] py-24 px-4">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-sm text-[var(--muted)] mb-3">Dịch vụ</p>
                        <h1 className="text-4xl md:text-5xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-4 tracking-tight">{info.title}</h1>
                        <p className="text-lg text-[var(--muted)] leading-relaxed">{info.excerpt}</p>

                        {stats.wordCount > 0 ? (
                            <p className="text-sm text-[var(--muted)] mt-4">
                                {stats.wordCount.toLocaleString('vi-VN')} từ
                                {stats.minutes ? ` • ~${stats.minutes} phút đọc` : ''}
                            </p>
                        ) : null}

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/lien-he" className="btn btn-primary">
                                Liên hệ tư vấn
                            </Link>
                            <Link href="/dich-vu" className="btn btn-secondary">
                                Xem tất cả dịch vụ
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-4 bg-[var(--bg)]">
                    <div className="max-w-4xl mx-auto card p-8">
                        <h2 className="text-lg font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-3">Tóm tắt</h2>
                        {bullets.length > 0 ? (
                            <ul className="list-disc pl-5 text-[var(--muted)] leading-relaxed space-y-2">
                                {bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[var(--muted)] leading-relaxed">Đang cập nhật nội dung.</p>
                        )}

                        {content?.trim() ? (
                            <div className="article-content mt-8">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h1: (props) => <h2 {...props} />,
                                        table: ({ className, ...props }) => (
                                            <div className="md-table">
                                                <table
                                                    {...props}
                                                    className={[className].filter(Boolean).join(' ')}
                                                />
                                            </div>
                                        ),
                                        h2: ({ id, children, ...props }) => {
                                            const fallbackId = slugifyHeading(toPlainText(children));
                                            return (
                                                <h2 id={id || fallbackId || undefined} {...props}>
                                                    {children}
                                                </h2>
                                            );
                                        },
                                        h3: ({ id, children, ...props }) => {
                                            const fallbackId = slugifyHeading(toPlainText(children));
                                            return (
                                                <h3 id={id || fallbackId || undefined} {...props}>
                                                    {children}
                                                </h3>
                                            );
                                        },
                                        img: (props) => <MarkdownImage {...props} />,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        ) : null}
                    </div>
                </section>
            </main>
        </>
    );
}
