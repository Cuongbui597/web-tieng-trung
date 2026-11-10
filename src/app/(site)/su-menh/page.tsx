import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sứ Mệnh',
    description: 'Tầm nhìn, sứ mệnh và định hướng phát triển.',
    alternates: {
        canonical: 'https://chamsoccanhquan.com/su-menh',
    },
};

export default function MissionPage() {
    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <section className="bg-[var(--bg)] py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-6 tracking-tight">Sứ mệnh</h1>
                    <p className="text-lg text-[var(--muted)] leading-relaxed">
                        Chúng tôi mong muốn giúp bạn dễ dàng chọn được loại cây phù hợp với không gian sống, đồng thời cung cấp hướng dẫn chăm sóc rõ ràng để cây luôn xanh tốt.
                    </p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card p-6">
                            <p className="text-sm font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-2">Đơn giản</p>
                            <p className="text-sm text-[var(--muted)]">Trình bày dễ đọc, dễ tìm, dễ mua.</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-2">Chất lượng</p>
                            <p className="text-sm text-[var(--muted)]">Cây khỏe, thông tin minh bạch.</p>
                        </div>
                        <div className="card p-6">
                            <p className="text-sm font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-2">Đồng hành</p>
                            <p className="text-sm text-[var(--muted)]">Tư vấn chăm sóc và hỗ trợ sau mua.</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Link href="/lien-he" className="text-sm font-medium link-accent">
                            Liên hệ để được tư vấn
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
