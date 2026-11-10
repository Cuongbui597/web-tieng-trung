import Link from 'next/link';
import { getAllServices } from '@/lib/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dịch Vụ Đào Tạo & Luyện Thi Tiếng Trung',
    description: 'Cung cấp các giải pháp đào tạo tiếng Trung cho doanh nghiệp, công xưởng, luyện thi HSK cấp tốc và gia sư 1 kèm 1 theo yêu cầu.',
    keywords: ["đào tạo tiếng trung doanh nghiệp", "tiếng trung công xưởng", "luyện thi hsk cấp tốc", "gia sư tiếng trung đà nẵng"],
    alternates: {
        canonical: 'https://tiengtrunghsk.vn/dich-vu',
    },
    openGraph: {
        title: "Dịch Vụ Đào Tạo & Luyện Thi Tiếng Trung - HSK Việt",
        description: "Giải pháp đào tạo tiếng Trung thực chiến cho người đi làm và doanh nghiệp.",
        url: "https://tiengtrunghsk.vn/dich-vu",
        type: "website"
    }
};

export default async function ServicesPage() {
    const services = await getAllServices();
    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <section className="bg-[var(--bg)] py-20 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex badge-gradient mb-3">Đào Tạo Theo Yêu Cầu</div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight">
                        Dịch Vụ Đào Tạo Tiếng Trung
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--muted)] mx-auto leading-relaxed">
                        Chương trình đào tạo may đo riêng biệt cho tổ chức, doanh nghiệp, người đi làm và học viên có nhu cầu cấp bách.
                    </p>
                </div>
            </section>

            <section className="pb-24 px-4 bg-[var(--bg)]">
                <div className="max-w-[var(--container)] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s) => (
                            <Link
                                key={s.slug}
                                href={`/dich-vu/${s.slug}`}
                                className="card card-hover p-8 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg hover:bg-white/45 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-[var(--text)] mb-3 leading-snug">
                                        {s.title}
                                    </h2>
                                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                                        {s.excerpt}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-[var(--border)] text-xs font-semibold link-accent inline-flex items-center gap-1">
                                    Xem chi tiết dịch vụ →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
