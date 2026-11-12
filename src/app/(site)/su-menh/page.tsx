import Link from 'next/link';
import { Metadata } from 'next';
import { getBreadcrumbSchema, toJsonLd } from '@/lib/schema';
import { SITE_NAME, SITE_PHONE, AUTHOR_INFO } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Tầm Nhìn & Sứ Mệnh',
    description: `Tìm hiểu về tầm nhìn, sứ mệnh đào tạo tiếng Trung thực chiến và người sáng lập cô Lê Nguyễn Hồng Yên tại ${SITE_NAME}.`,
    alternates: {
        canonical: 'https://tiengtrunghsk.vn/su-menh',
    },
    openGraph: {
        title: 'Tầm Nhìn & Sứ Mệnh - Tiếng Trung HSK Việt',
        description: 'Đào tạo tiếng Trung thực chiến, kết nối việc làm với các doanh nghiệp Đài Loan và Trung Quốc.',
        url: 'https://tiengtrunghsk.vn/su-menh',
        type: 'website',
    },
};

export default function MissionPage() {
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Trang chủ', url: '/' },
        { name: 'Sứ mệnh & Tầm nhìn', url: '/su-menh' },
    ]);

    return (
        <main className="min-h-screen bg-[var(--bg)] pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
            />

            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-white/40 via-white/20 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex badge-gradient mb-4 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                        笃学尚行 · 止于至善
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text)] tracking-tight mb-6">
                        Tầm Nhìn & Sứ Mệnh
                    </h1>
                    <p className="text-base sm:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
                        Chúng tôi không chỉ dạy ngôn ngữ để lấy chứng chỉ, mà đào tạo <strong>tiếng Trung thực chiến</strong> giúp bạn làm chủ phản xạ và mở lối thăng tiến sự nghiệp.
                    </p>
                </div>
            </section>

            {/* Block 1: Lời ngỏ từ Founder Lê Nguyễn Hồng Yên */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                            {/* Avatar & Badges */}
                            <div className="lg:col-span-5 flex flex-col items-center text-center">
                                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-rose-500 via-amber-500 to-rose-400 p-1.5 shadow-2xl mb-4">
                                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-3 border border-white">
                                        <span className="text-5xl mb-1">👩‍🏫</span>
                                        <span className="text-xs font-black text-rose-700 uppercase tracking-wider">Cô Hồng Yên</span>
                                        <span className="text-[10px] text-gray-500 font-semibold">Founder & Giảng Viên</span>
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-[var(--text)]">
                                    {AUTHOR_INFO.name}
                                </h3>
                                <p className="text-xs text-[var(--muted)] mt-1 font-semibold">
                                    Sinh năm {AUTHOR_INFO.birthYear} • Hotline: {AUTHOR_INFO.phone}
                                </p>

                                <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                                        HSK 6 Chuẩn Quốc Tế
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                                        HSK 5+ Xuất Sắc
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                                        Bằng Giỏi ĐH Ngoại Ngữ
                                    </span>
                                </div>
                            </div>

                            {/* Bio & Thông điệp */}
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200 uppercase tracking-wider mb-3">
                                    <span>✍️</span> Lời Ngỏ Từ Người Sáng Lập
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mb-4 leading-snug">
                                    &ldquo;Học tiếng Trung để dùng được – Nói chuẩn, nghe thông, làm chủ cơ hội nghề nghiệp.&rdquo;
                                </h2>
                                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">
                                    Chào bạn, tôi là <strong>Lê Nguyễn Hồng Yên</strong>. Sau khi tốt nghiệp loại Giỏi ngành Ngôn ngữ Trung Quốc tại <strong>Trường Đại học Ngoại ngữ – Đại học Đà Nẵng</strong>, tôi có hơn 3 năm làm việc trực tiếp với vai trò phiên dịch viên tại các tập đoàn sản xuất Đài Loan trong ngành <strong>Giày da – May mặc xuất khẩu</strong>.
                                </p>
                                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">
                                    Tôi nhận thấy rất nhiều bạn có chứng chỉ HSK trên tay nhưng khi bước vào nhà xưởng hay phòng họp lại vô cùng bối rối: không nghe kịp khẩu âm thực tế, không nắm rõ thuật ngữ chuyên ngành và thiếu phản xạ đàm phán.
                                </p>
                                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-medium text-gray-800">
                                    Đó chính là lý do tôi thành lập <strong>{SITE_NAME}</strong>: Mang tinh thần thực chiến vào từng buổi học, biến tiếng Trung thành vũ khí đắc lực giúp bạn gia tăng thu nhập và thăng tiến vững chắc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Block 2: Tầm nhìn chiến lược */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-gradient-to-br from-white/40 via-amber-50/40 to-white/30 backdrop-blur-xl border border-amber-200/60 shadow-xl">
                        <div className="text-center max-w-3xl mx-auto mb-10">
                            <span className="text-3xl mb-2 inline-block">🔭</span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
                                Tầm Nhìn Chiến Lược 2026 – 2030
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--muted)]">
                                Định vị của {SITE_NAME} trong hệ thống đào tạo ngoại ngữ tại Việt Nam
                            </p>
                        </div>

                        <div className="p-6 sm:p-8 rounded-3xl bg-white/70 border border-amber-200 shadow-sm text-center">
                            <p className="text-base sm:text-xl font-bold text-gray-800 leading-relaxed italic">
                                &ldquo;Trở thành <strong>hệ sinh thái đào tạo tiếng Trung thực chiến hàng đầu</strong> tại Đà Nẵng và khu vực miền Trung – nơi người học không chỉ lấy chứng chỉ HSK với điểm số ấn tượng, mà còn <strong>làm chủ phản xạ giao tiếp tự nhiên</strong>, thành thạo tiếng Trung công xưởng – doanh nghiệp và tự tin nắm bắt các vị trí quản lý thu nhập cao tại các tập đoàn Đài Loan, Trung Quốc.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Block 3: 3 Sứ Mệnh Trọng Tâm */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
                            3 Sứ Mệnh Cốt Lõi
                        </h2>
                        <p className="text-sm sm:text-base text-[var(--muted)]">
                            Mỗi bài giảng, mỗi khóa học tại trung tâm đều xoay quanh 3 giá trị phụng sự học viên:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sứ mệnh 1 */}
                        <div className="card p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-black mb-5 shadow-inner">
                                    01
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text)] mb-3">
                                    Thực Chiến Là Số 1 – Học Là Dùng Được
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                                    Xóa bỏ hoàn toàn phương pháp học vẹt ngữ pháp lý thuyết. Rút ngắn khoảng cách giữa giáo trình và hiện trường sản xuất. Học viên nói được, hiểu được và có phản xạ đối đáp ngay sau 2–3 tháng.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs font-bold text-rose-600">
                                Ứng dụng ngay vào công việc →
                            </div>
                        </div>

                        {/* Sứ mệnh 2 */}
                        <div className="card p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-black mb-5 shadow-inner">
                                    02
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text)] mb-3">
                                    Cầu Nối Việc Làm Doanh Nghiệp Đài Loan
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                                    Truyền đạt trọn vẹn văn hóa làm việc, quy trình vận hành và kỹ năng đàm phán với chuyên gia Đài Loan/Trung Quốc từ kinh nghiệm phiên dịch thực tế ngành giày da – may mặc.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs font-bold text-amber-700">
                                Mở rộng cơ hội nghề nghiệp →
                            </div>
                        </div>

                        {/* Sứ mệnh 3 */}
                        <div className="card p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all">
                            <div>
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-black mb-5 shadow-inner">
                                    03
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text)] mb-3">
                                    Đồng Hành Tận Tâm & Cá Nhân Hóa
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                                    Lớp học giới hạn 6–8 học viên. Giảng viên trực tiếp chỉnh từng thanh điệu Pinyin, theo sát tiến độ hàng ngày và cam kết chuẩn đầu ra HSK bằng văn bản minh bạch.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs font-bold text-emerald-700">
                                Cam kết học lại miễn phí →
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Block 4: CTA Liên hệ trực tiếp Founder */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto card rounded-[2.5rem] p-8 sm:p-12 bg-gradient-to-br from-rose-900 to-rose-950 text-white shadow-2xl text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-4xl mb-3">💬</div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-rose-100">
                            Nhận Tư Vấn Lộ Trình Cùng Cô Hồng Yên
                        </h2>
                        <p className="text-xs sm:text-sm text-rose-200/90 max-w-xl mx-auto mb-8 leading-relaxed">
                            Dù bạn bắt đầu từ con số 0 hay cần tiếng Trung gấp để làm việc tại các nhà máy, công ty Đài Loan – cô Hồng Yên luôn sẵn sàng hỗ trợ bạn lựa chọn lộ trình tinh gọn và hiệu quả nhất.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href={AUTHOR_INFO.zaloUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn px-8 py-4 bg-white text-rose-900 font-extrabold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-base"
                            >
                                💬 Chat Zalo Với Cô Yên ({AUTHOR_INFO.phone})
                            </a>
                            <Link
                                href="/dang-ky"
                                className="btn px-8 py-4 bg-rose-700 hover:bg-rose-600 text-white font-extrabold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-base border border-rose-500"
                            >
                                Đăng Ký Học Thử Miễn Phí →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
