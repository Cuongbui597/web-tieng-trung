import Link from 'next/link';
import { getBreadcrumbSchema, toJsonLd } from '@/lib/schema';
import { Metadata } from 'next';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, SITE_ADDRESS } from '@/lib/constants';

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
                                {SITE_NAME} được sáng lập bởi đội ngũ thạc sĩ ngôn ngữ và giảng viên từng du học tại các trường đại học danh tiếng tại Bắc Kinh và Thượng Hải. Chúng tôi hiểu rằng học ngoại ngữ không đơn thuần là ghi nhớ từ vựng mà là xây dựng phản xạ tư duy và ứng dụng thực tế.
                            </p>
                            <p className="text-sm sm:text-base text-[var(--muted)] mb-4 leading-relaxed">
                                Trung tâm tập trung vào 3 phân khúc đào tạo trọng yếu: **Luyện thi HSK chuẩn quốc tế (cấp độ 1 đến 3)**, **Tiếng Trung thực chiến phục vụ nhà máy - công xưởng - doanh nghiệp** và **Khóa tiếng Trung vui học phát triển tư duy sớm cho trẻ em**.
                            </p>
                            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                                Với phương pháp giảng dạy tương tác cao, lớp học quy mô nhỏ và sự đồng hành sát sao của giảng viên, học viên sẽ nhanh chóng vượt qua rào cản phát âm để tự tin giao tiếp chỉ sau 2-3 tháng.
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
