import Link from 'next/link';
import { getBreadcrumbSchema, toJsonLd } from '@/lib/schema';
import { Metadata } from 'next';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, SITE_ADDRESS, AUTHOR_INFO } from '@/lib/constants';

export const metadata: Metadata = {
    title: "Về Chúng Tôi",
    description: "Tìm hiểu về Trung Tâm Tiếng Trung HSK Việt - Đơn vị đào tạo tiếng Trung thực chiến hàng đầu tại Đà Nẵng với 1000+ học viên đạt chuẩn HSK.",
    keywords: ["giới thiệu trung tâm tiếng trung", "học tiếng trung đà nẵng", "hsk việt", "trung tâm hsk"],
    alternates: {
        canonical: "https://tiengtrunghsk.vn/gioi-thieu"
    },
    openGraph: {
        title: "Giới Thiệu - Trung Tâm Tiếng Trung HSK Việt",
        description: "Trung tâm đào tạo tiếng Trung thực chiến hàng đầu tại Đà Nẵng.",
        url: "https://tiengtrunghsk.vn/gioi-thieu",
        type: "website"
    }
};

export default function AboutPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Giới thiệu', url: '/gioi-thieu' },
    ]);

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />

            {/* Hero Section */}
            <section className="bg-[var(--bg)] py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex badge-gradient mb-3">Tâm Huyết · Chuyên Nghiệp · Hiệu Quả</div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight">
                        Về {SITE_NAME}
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                        Cùng bạn mở cánh cửa ngôn ngữ Trung Hoa, kiến tạo tương lai sự nghiệp vững chắc và khám phá nền văn hóa phương Đông rực rỡ.
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-16 px-4 bg-[var(--bg)]">
                <div className="max-w-[var(--container)] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="text-3xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] mb-2">
                                笃学尚行 · 止于至善
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-5 tracking-tight">
                                Sứ Mệnh Đào Tạo Của Chúng Tôi
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--muted)] mb-4 leading-relaxed">
                                {SITE_NAME} được sáng lập bởi cô <strong>Lê Nguyễn Hồng Yên</strong> – Cử nhân loại Giỏi chuyên ngành Ngôn ngữ Trung Quốc tại <strong>Đại học Ngoại ngữ – Đại học Đà Nẵng</strong>, đạt chứng chỉ HSK 6 cao cấp cùng hơn 3 năm kinh nghiệm làm việc phiên dịch viên chuyên môn tại các tập đoàn sản xuất Đài Loan ngành Giày da – May mặc.
                            </p>
                            <p className="text-sm sm:text-base text-[var(--muted)] mb-4 leading-relaxed">
                                Chúng tôi hiểu rằng học ngoại ngữ không đơn thuần là ghi nhớ từ vựng mà là xây dựng phản xạ tư duy, hiểu sâu thuật ngữ chuyên ngành và ứng dụng trực tiếp vào công việc để nâng cao thu nhập.
                            </p>
                            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                                Trung tâm tập trung vào 3 trụ cột đào tạo: <strong>Luyện thi HSK chuẩn quốc tế (HSK 1, 2, 3)</strong>, <strong>Tiếng Trung thực chiến phục vụ nhà máy – công xưởng – doanh nghiệp</strong> và <strong>Khóa tiếng Trung vui học phản xạ cho trẻ em</strong>.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="card p-6 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)] mb-1">1000+</div>
                                <div className="text-xs sm:text-sm font-semibold text-[var(--text)]">Học Viên Tốt Nghiệp</div>
                                <div className="text-xs text-[var(--muted)] mt-1">Đạt chứng chỉ HSK 1-3</div>
                            </div>
                            <div className="card p-6 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-1">98%</div>
                                <div className="text-xs sm:text-sm font-semibold text-[var(--text)]">Đậu Kỳ Thi HSK</div>
                                <div className="text-xs text-[var(--muted)] mt-1">Ngay trong lần thi đầu</div>
                            </div>
                            <div className="card p-6 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">100%</div>
                                <div className="text-xs sm:text-sm font-semibold text-[var(--text)]">Giảng Viên Chuẩn HSK 6</div>
                                <div className="text-xs text-[var(--muted)] mt-1">Hoặc bản ngữ có chứng chỉ</div>
                            </div>
                            <div className="card p-6 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 mb-1">6 - 8</div>
                                <div className="text-xs sm:text-sm font-semibold text-[var(--text)]">Học Viên Mỗi Lớp</div>
                                <div className="text-xs text-[var(--muted)] mt-1">Đảm bảo tối đa tương tác</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Giảng viên & Nhà sáng lập Lê Nguyễn Hồng Yên */}
            <section className="py-20 px-4 bg-gradient-to-br from-amber-50/50 via-white/40 to-rose-50/40">
                <div className="max-w-5xl mx-auto">
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/50 backdrop-blur-xl border border-amber-200/70 shadow-2xl relative overflow-hidden">
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <div className="inline-flex badge-gradient mb-3 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                                Đội Ngũ Giảng Dạy & Chuyên Môn
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
                                Người Đồng Hành Cùng Bạn
                            </h2>
                            <p className="text-xs sm:text-sm text-[var(--muted)] mt-2">
                                Giảng viên chuẩn quốc tế, tận tâm theo sát tiến độ của từng học viên
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            {/* Card ảnh đại diện & Thông số */}
                            <div className="md:col-span-5 flex flex-col items-center text-center p-6 rounded-3xl bg-white/70 border border-white/60 shadow-lg">
                                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 via-amber-500 to-rose-400 p-1 shadow-xl mb-3 flex items-center justify-center">
                                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                                        <span className="text-5xl">👩‍🏫</span>
                                        <span className="text-[11px] font-black text-rose-700 uppercase mt-1">Cô Hồng Yên</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-[var(--text)]">
                                    {AUTHOR_INFO.name}
                                </h3>
                                <p className="text-xs text-rose-700 font-bold mt-0.5">
                                    {AUTHOR_INFO.role}
                                </p>
                                <p className="text-[11px] text-[var(--muted)] mt-1 font-semibold">
                                    Sinh năm {AUTHOR_INFO.birthYear} • Hotline: {AUTHOR_INFO.phone}
                                </p>

                                <div className="w-full mt-4 pt-4 border-t border-gray-100 space-y-2 text-left">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>ĐH Ngoại ngữ Đà Nẵng (Bằng Giỏi)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>Chứng chỉ HSK 5+, HSK 6 Quốc Tế</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>3 năm phiên dịch da giày Đài Loan</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>3 năm kinh nghiệm giảng dạy HSK</span>
                                    </div>
                                </div>

                                <a
                                    href={AUTHOR_INFO.zaloUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary w-full mt-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-102 transition-all block text-center"
                                >
                                    💬 Liên Hệ Trực Tiếp Cô Yên ({AUTHOR_INFO.phone})
                                </a>
                            </div>

                            {/* Chi tiết kinh nghiệm & triết lý giảng dạy */}
                            <div className="md:col-span-7 space-y-4">
                                <div className="p-4 rounded-2xl bg-white/70 border border-amber-100 shadow-xs">
                                    <h4 className="text-sm font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                                        <span>🎓</span> Trình Độ Học Vấn & Bằng Cấp
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                                        Tốt nghiệp <strong>loại Giỏi ngành Ngôn ngữ Trung Quốc</strong> tại Trường Đại học Ngoại ngữ – Đại học Đà Nẵng. Sở hữu chứng chỉ <strong>HSK 6</strong> (cấp độ cao nhất theo chuẩn Hán ngữ quốc tế) cùng chứng chỉ <strong>HSK 5+</strong> và khẩu ngữ HSKK Cao cấp.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/70 border border-rose-100 shadow-xs">
                                    <h4 className="text-sm font-bold text-rose-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                                        <span>🏭</span> Kinh Nghiệm Phiên Dịch Thực Chiến
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                                        Hơn <strong>3 năm làm phiên dịch viên hiện trường</strong> cho các tập đoàn & doanh nghiệp Đài Loan chuyên ngành Giày da – May mặc xuất khẩu. Trực tiếp dịch đàm phán hợp đồng, dịch kỹ thuật dây chuyền công nghệ, an toàn nhà xưởng và điều hành sản xuất cùng chuyên gia bản ngữ.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/70 border border-emerald-100 shadow-xs">
                                    <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                                        <span>❤️</span> Phương Pháp Giảng Dạy & Tâm Huyết
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                                        Mang 100% kinh nghiệm thực tế vào bài giảng. Học viên không chỉ được học phát âm chuẩn, cấu trúc câu tự nhiên mà còn được trang bị kỹ năng giao tiếp công xưởng, đàm phán và văn hóa ứng xử chuyên nghiệp trong môi trường doanh nghiệp Đài Loan – Trung Quốc.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Giá trị cốt lõi */}
            <section className="py-20 px-4 bg-white/20 backdrop-blur-md">
                <div className="max-w-[var(--container)] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text)] mb-3">
                            Giá Trị Cốt Lõi Tại HSK Việt
                        </h2>
                        <p className="text-sm sm:text-base text-[var(--muted)]">Những nguyên tắc định hình chất lượng đào tạo của chúng tôi</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-8 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg">
                            <div className="text-4xl mb-3">🎯</div>
                            <h3 className="text-lg font-bold text-[var(--text)] mb-2">Thực Chiến Là Số 1</h3>
                            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                                Nói được, nghe được, phản xạ tức thì trong công việc và cuộc sống. Loại bỏ hoàn toàn phương pháp học vẹt ngữ pháp khô khan.
                            </p>
                        </div>
                        <div className="card p-8 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg">
                            <div className="text-4xl mb-3">🤝</div>
                            <h3 className="text-lg font-bold text-[var(--text)] mb-2">Tận Tâm Đồng Hành</h3>
                            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                                Giáo viên và trợ giảng theo sát tiến độ từng buổi học, chữa bài tập về nhà hàng ngày và hỗ trợ giải đáp 24/7 qua nhóm lớp.
                            </p>
                        </div>
                        <div className="card p-8 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-lg">
                            <div className="text-4xl mb-3">🏆</div>
                            <h3 className="text-lg font-bold text-[var(--text)] mb-2">Cam Kết Kết Quả</h3>
                            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                                Cam kết chuẩn đầu ra bằng văn bản. Học viên được học lại hoàn toàn miễn phí nếu thi chưa đạt chứng chỉ mong muốn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Thông tin liên hệ CTA */}
            <section className="py-20 px-4">
                <div className="max-w-2xl mx-auto text-center card p-10 rounded-[2.5rem] bg-white/35 backdrop-blur-xl border border-white/40 shadow-xl">
                    <h3 className="text-2xl font-bold text-[var(--text)] mb-3">
                        Ghé Thăm Cơ Sở Đào Tạo
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-6">
                        Địa chỉ: {SITE_ADDRESS}<br />
                        Hotline: {SITE_PHONE} • Email: {SITE_EMAIL}
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/dang-ky" className="btn btn-primary px-8 py-3.5 font-semibold shadow-md">
                            Đăng Ký Học Thử
                        </Link>
                        <Link href="/lien-he" className="btn btn-secondary px-8 py-3.5 font-semibold">
                            Liên Hệ Tuyển Sinh
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
