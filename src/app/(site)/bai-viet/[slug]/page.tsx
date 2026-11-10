import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/server';
import MarkdownImage from '@/components/MarkdownImage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { absoluteUrl, getBlogPostingSchema, getBreadcrumbSchema, getFAQSchema, toJsonLd } from '@/lib/schema';
import { Article } from '@/lib/articles';

// Helper types
interface TocItem {
    level: number;
    text: string;
    id: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

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

function removeManualTocBlock(markdown: string): string {
    const s = String(markdown ?? '');
    const start = s.indexOf('<details>');
    if (start === -1) return s;
    const end = s.indexOf('</details>', start);
    if (end === -1) return s;

    const block = s.slice(start, end + '</details>'.length);
    if (!/\bMục lục\b/i.test(block)) return s;
    return (s.slice(0, start) + s.slice(end + '</details>'.length)).trim();
}

function buildTocFromMarkdown(markdown: string): TocItem[] {
    const s = String(markdown ?? '');
    const lines = s.split(/\r?\n/);
    const items: TocItem[] = [];

    for (const line of lines) {
        // Markdown headings
        const md = line.match(/^(#{2,3})\s+(.+?)\s*$/);
        if (md) {
            const level = md[1].length;
            const text = md[2].replace(/#+\s*$/, '').trim();
            const id = slugifyHeading(text);
            if (text && id) items.push({ level, text, id });
            continue;
        }

        // HTML headings with id
        const html = line.match(/^\s*<h([23])\s+[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>\s*$/i);
        if (html) {
            const level = Number(html[1]);
            const id = html[2];
            const text = html[3].replace(/<[^>]+>/g, '').trim();
            if (text && id) items.push({ level, text, id });
        }
    }

    return items;
}

function hashStringToInt(input: string): number {
    // Simple deterministic hash for stable "random" picks per slug
    let hash = 0;
    for (let i = 0; i < input.length; i += 1) {
        hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
    }
    return hash;
}

function pickTwoDeterministic(items: Article[], seedString: string): Article[] {
    const list = Array.isArray(items) ? [...items] : [];
    if (list.length <= 2) return list;

    const seed = hashStringToInt(seedString);
    // Deterministic shuffle
    for (let i = list.length - 1; i > 0; i -= 1) {
        const j = (seed + i * 2654435761) % (i + 1);
        const tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
    }
    return list.slice(0, 2);
}

// Generate static params for all articles
export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;

// Revalidate every hour
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const result = await getArticleBySlug(slug);

    if (!result) {
        return {
            title: "Bài viết không tìm thấy"
        };
    }

    const info = result.data;
    const imagePath = info.image || '/placeholder-plant.svg';
    const ogImage = imagePath.startsWith('http') ? imagePath : `https://chamsoccanhquan.com${imagePath}`;

    return {
        title: info.title,
        description: info.description,
        keywords: (info.tags && info.tags.length > 0) ? info.tags : ["bài viết", info.title || "Bài viết", "cây cảnh"],
        authors: [{ name: info.author }],
        alternates: {
            canonical: `https://chamsoccanhquan.com/bai-viet/${slug}`
        },
        openGraph: {
            title: info.title,
            description: info.description,
            url: `https://chamsoccanhquan.com/bai-viet/${slug}`,
            type: "article",
            publishedTime: info.date,
            modifiedTime: info.updated || undefined,
            authors: [info.author],
            tags: info.tags,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: info.image_alt || info.title
                }
            ]
        }
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const data = await getArticleBySlug(slug);

    if (!data) {
        notFound();
    }

    const info = data.data;
    const rawContent = data.content;
    const toc = buildTocFromMarkdown(rawContent);
    const content = removeManualTocBlock(rawContent);
    const imagePath = info.image || '/placeholder-plant.svg';
    const imageAbs = absoluteUrl(imagePath);

    const articleSchema = getBlogPostingSchema({
        url: `/bai-viet/${slug}`,
        title: info.title || '',
        description: info.description,
        image: imageAbs,
        author: info.author,
        datePublished: info.date,
        dateModified: info.updated || info.date,
        keywords: info.tags,
    });

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Bài viết', url: '/bai-viet' },
        { name: info.title || '', url: `/bai-viet/${slug}` },
    ]);

    const faqs: FAQItem[] = [];
    const lines = rawContent.split(/\r?\n/);
    let inFaqSection = false;
    let currentQuestion: string | null = null;
    let currentAnswer: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Detect FAQ Section Header
        if (/^#{2,3}\s+(FAQ|Câu hỏi thường gặp|Hỏi đáp)/i.test(line)) {
            inFaqSection = true;
            // Save pending if any (edge case where section header follows a question immediately?)
            if (currentQuestion && currentAnswer.length) {
                faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
                currentQuestion = null;
                currentAnswer = [];
            }
            continue;
        }

        if (!inFaqSection) continue;

        // Detect End of Section (Next H2 that isn't FAQ)
        if (/^##\s+/.test(line)) {
            // Save pending
            if (currentQuestion && currentAnswer.length) {
                faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
            }
            break;
        }

        // Detect New Question (H3/H4 or Bold ?)
        if (/^#{3,4}\s+/.test(line) || (/^\*\*.+\*\*$/.test(line) && line.includes('?'))) {
            // Save previous question
            if (currentQuestion && currentAnswer.length) {
                faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
            }

            // Start new question
            currentQuestion = line
                .replace(/^#{3,4}\s*/, '')
                .replace(/^\*\*/, '')
                .replace(/\*\*$/, '')
                .trim();
            currentAnswer = [];
            continue;
        }

        // Accumulate Answer
        if (currentQuestion && line !== '') {
            currentAnswer.push(line);
        }
    }

    // Save the very last question found
    if (currentQuestion && currentAnswer.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(' ').trim() });
    }

    const faqSchema = faqs.length > 0 ? getFAQSchema(faqs) : null;

    const allArticles = await getAllArticles();
    const relatedPool = allArticles.filter((a) => a.slug && a.slug !== slug);
    const related = pickTwoDeterministic(relatedPool, slug);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
                />
            )}
            <div id="debug-faqs" style={{ display: 'none' }}>
                {JSON.stringify({ faqs, rawLength: rawContent.length, linesCount: lines.length, lastLine: lines[lines.length - 1] })}
            </div>
            <main className="min-h-screen bg-[var(--bg)]">
                {/* Breadcrumb */}
                <div className="bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-6 lg:px-8 py-4">
                    <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm">
                        <Link href="/" className="link-accent">Trang chủ</Link>
                        <span className="text-[var(--muted)]">/</span>
                        <Link href="/bai-viet" className="link-accent">Bài viết</Link>
                        <span className="text-[var(--muted)]">/</span>
                        <span className="text-[var(--text)]">{info.title}</span>
                    </div>
                </div>

                {/* Article Content */}
                <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Meta Info */}
                    <div className="mb-8">
                        <p className="text-[var(--muted)] font-semibold text-sm uppercase tracking-widest mb-2">
                            {new Date(info.date || new Date()).toLocaleDateString('vi-VN')}
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--title)] mb-3 font-serif">{info.title}</h1>
                        <div className="flex items-center gap-2 text-[var(--muted)]">
                            <span>Tác giả:</span>
                            <span className="font-semibold text-[var(--title)]">{info.author}</span>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="article-content mb-10">
                        {toc.length ? (
                            <details className="toc-details" open={false}>
                                <summary className="toc-summary">**Mục lục:**</summary>
                                <ul className="toc-list">
                                    {toc
                                        .filter((i) => i.level === 2)
                                        .map((i) => (
                                            <li key={i.id}>
                                                <a href={`#${i.id}`}>{i.text}</a>
                                            </li>
                                        ))}
                                </ul>
                            </details>
                        ) : null}

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

                    {/* Divider */}
                    <hr className="my-12 border-[var(--border)]" />

                    {/* Author Box */}
                    <div className="card-gradient p-6 mb-10">
                        <h3 className="text-lg font-bold text-[var(--title)] mb-2 font-serif">Về tác giả</h3>
                        <p className="text-[var(--muted)]">{info.author} là chuyên gia về chăm sóc cây cảnh với kinh nghiệm nhiều năm.</p>
                    </div>

                    {/* Related Articles */}
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--title)] mb-8 font-serif">Bài Viết Khác</h2>
                        {related.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {related.map((a) => (
                                    <Link key={a.slug} href={`/bai-viet/${a.slug}`} className="group">
                                        <div className="card-gradient card-hover overflow-hidden">
                                            {a.image ? (
                                                <div className="relative aspect-square bg-[var(--surface-2)]">
                                                    <Image
                                                        src={a.image}
                                                        alt={a.title || 'Bài viết'}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 400px"
                                                        quality={60}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-square bg-[var(--surface-2)]" />
                                            )}

                                            <div className="p-5">
                                                <p className="text-xs text-[var(--muted)] font-semibold mb-2 uppercase">
                                                    {a.date ? new Date(a.date).toLocaleDateString('vi-VN') : 'Bài viết'}
                                                </p>
                                                <p className="text-base font-semibold text-[var(--title)] font-serif line-clamp-2">{a.title}</p>
                                                {a.description ? (
                                                    <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">{a.description}</p>
                                                ) : null}
                                                <p className="link-accent text-sm font-medium inline-flex items-center gap-1 mt-4">
                                                    Đọc bài viết
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--muted)]">Chưa có bài viết gợi ý.</p>
                        )}
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 text-center">
                        <Link href="/bai-viet">
                            <button className="btn btn-gradient">
                                Quay lại danh sách bài viết
                            </button>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}
