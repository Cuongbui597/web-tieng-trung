import Link from 'next/link';
import { notFound } from 'next/navigation';
import { policyPages, getPolicyBySlug } from '@/lib/server';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return policyPages.map((p) => ({ slug: p.slug }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const policy = getPolicyBySlug(slug);
    if (!policy) return { title: 'Chính sách không tìm thấy' };
    return {
        title: policy.title,
        description: policy.excerpt,
        alternates: {
            canonical: `https://chamsoccanhquan.com/chinh-sach/${slug}`,
        },
    };
}

export default async function PolicyPage({ params }: PageProps) {
    const { slug } = await params;
    const policy = getPolicyBySlug(slug);
    if (!policy) notFound();

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <section className="bg-[var(--bg)] py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/chinh-sach" className="text-sm font-medium link-accent">
                        Quay lại danh sách
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mt-4 tracking-tight">{policy.title}</h1>
                    <p className="text-[var(--muted)] mt-3">{policy.excerpt}</p>
                </div>
            </section>

            <section className="py-16 px-4 bg-[var(--bg)]">
                <div className="max-w-4xl mx-auto card p-8">
                    <div className="space-y-3 text-[var(--muted)] leading-relaxed">
                        {policy.content.map((para) => (
                            <p key={para}>{para}</p>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
