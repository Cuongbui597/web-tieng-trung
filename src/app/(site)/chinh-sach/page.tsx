import Link from 'next/link';
import { policyPages } from '@/lib/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chính Sách & Quy Định',
    description: 'Thông tin chi tiết về chính sách bảo hành, vận chuyển, đổi trả và thanh toán của Cây Cảnh Đà Nẵng.',
    keywords: ["chính sách bảo hành", "quy định vận chuyển", "hướng dẫn thanh toán"],
    alternates: {
        canonical: 'https://chamsoccanhquan.com/chinh-sach',
    },
    openGraph: {
        title: "Chính Sách & Quy Định - Cây Cảnh Đà Nẵng",
        description: "Cam kết minh bạch về quyền lợi khách hàng.",
        url: "https://chamsoccanhquan.com/chinh-sach",
        type: "website"
    }
};

export default function PoliciesIndexPage() {
    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <section className="bg-[var(--bg)] py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-4 tracking-tight">Chính Sách & Quy Định</h1>
                    <p className="text-lg text-[var(--muted)]">Cam kết minh bạch và bảo vệ quyền lợi khách hàng</p>
                </div>
            </section>

            <section className="py-16 px-4 bg-[var(--bg)]">
                <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
                    {policyPages.map((p) => (
                        <Link
                            key={p.slug}
                            href={`/chinh-sach/${p.slug}`}
                            className="card card-hover p-6"
                        >
                            <p className="text-base font-[family:var(--font-serif)] font-semibold text-[var(--text)]">{p.title}</p>
                            <p className="text-sm text-[var(--muted)] mt-1">{p.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
