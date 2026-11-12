import Link from 'next/link';
import { getBreadcrumbSchema, toJsonLd } from '@/lib/schema';
import { Metadata } from 'next';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, SITE_ADDRESS, SITE_HOURS } from '@/lib/constants';

export const metadata: Metadata = {
    title: "Liên Hệ Tuyển Sinh",
    description: "Liên hệ Trung Tâm Tiếng Trung HSK Việt tại Đà Nẵng để được tư vấn lộ trình học HSK 1-3, giao tiếp công xưởng và trẻ em.",
    alternates: {
        canonical: "https://tiengtrunghsk.vn/lien-he"
    },
    openGraph: {
        title: "Liên Hệ - Trung Tâm Tiếng Trung HSK Việt",
        description: "Hỗ trợ và tư vấn tuyển sinh 24/7",
        url: "https://tiengtrunghsk.vn/lien-he",
        type: "website"
    }
};

export default function ContactPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Liên hệ', url: '/lien-he' },
    ]);

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />

            {/* Header */}
            <section className="bg-[var(--bg)] py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex badge-gradient mb-3">Tư Vấn Tận Tình</div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight">
                        Liên Hệ Tuyển Sinh
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--muted)]">
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn lựa chọn khóa học phù hợp nhất
                    </p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="pb-24 px-4 bg-[var(--bg)]">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* Phone */}
                        <div className="card p-8 rounded-3xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-lg">
                            <div className="text-3xl mb-3">📞</div>
                            <h3 className="text-base font-bold text-[var(--text)]">Hotline & Zalo Tuyển Sinh</h3>
                            <p className="text-xs text-[var(--muted)] mt-1">Tư vấn lộ trình học cùng cô Lê Nguyễn Hồng Yên</p>
                            <a href={`tel:${SITE_PHONE}`} className="mt-3 inline-block text-lg font-bold link-accent">
                                {SITE_PHONE}
                            </a>
                        </div>

                        {/* Email */}
                        <div className="card p-8 rounded-3xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-lg">
                            <div className="text-3xl mb-3">✉️</div>
                            <h3 className="text-base font-bold text-[var(--text)]">Hòm Thư Điện Tử</h3>
                            <p className="text-xs text-[var(--muted)] mt-1">Tiếp nhận hợp tác doanh nghiệp & thắc mắc</p>
                            <a href={`mailto:${SITE_EMAIL}`} className="mt-3 inline-block text-base font-bold link-accent">
                                {SITE_EMAIL}
                            </a>
                        </div>

                        {/* Address */}
                        <div className="card p-8 rounded-3xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-lg">
                            <div className="text-3xl mb-3">📍</div>
                            <h3 className="text-base font-bold text-[var(--text)]">Địa Chỉ Cơ Sở Đào Tạo</h3>
                            <p className="text-xs text-[var(--muted)] mt-1">Đón tiếp học viên đăng ký trực tiếp</p>
                            <p className="mt-3 text-sm font-semibold text-[var(--text)]">
                                {SITE_ADDRESS}
                            </p>
                        </div>

                        {/* Hours */}
                        <div className="card p-8 rounded-3xl bg-white/35 backdrop-blur-xl border border-white/40 shadow-lg">
                            <div className="text-3xl mb-3">⏰</div>
                            <h3 className="text-base font-bold text-[var(--text)]">Thời Gian Làm Việc</h3>
                            <p className="text-xs text-[var(--muted)] mt-1">Tất cả các ngày trong tuần</p>
                            <p className="mt-3 text-sm font-semibold text-[var(--text)]">
                                {SITE_HOURS} (kể cả Thứ 7 & Chủ Nhật)
                            </p>
                        </div>
                    </div>

                    {/* Quick CTA */}
                    <div className="card p-10 rounded-[2.5rem] bg-gradient-to-r from-[var(--earth-100)] to-white/60 border border-white/40 shadow-xl text-center">
                        <h2 className="text-2xl font-bold text-[var(--text)] mb-3">
                            Bạn Đã Sẵn Sàng Trải Nghiệm Buổi Học Thử Đầu Tiên?
                        </h2>
                        <p className="text-sm text-[var(--muted)] mb-6 max-w-xl mx-auto">
                            Đăng ký trực tuyến chỉ mất 30 giây. Nhận ngay 1 buổi học thử miễn phí cùng giáo viên bản ngữ!
                        </p>
                        <Link href="/dang-ky" className="btn btn-primary px-8 py-3.5 font-bold shadow-lg">
                            Đi đến form đăng ký học ngay →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
