import Link from 'next/link';
import { getAllArticles } from '@/lib/server';
import { HeroBackground } from '@/components/HeroBackground';
import { getBreadcrumbSchema, toJsonLd } from '@/lib/schema';
import { AUTHOR_INFO } from '@/lib/constants';
import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Trang Chủ",
    description: "Học tiếng Trung bài bản: HSK 1-3, giao tiếp công xưởng/công ty, tiếng Trung trẻ em. Đà Nẵng.",
    alternates: { canonical: "https://tiengtrunghsk.vn" },
    openGraph: {
        title: "Trung Tâm Tiếng Trung HSK Việt – Học HSK 1→3",
        description: "Lộ trình học rõ ràng. Giáo viên kinh nghiệm. Học online & offline.",
        url: "https://tiengtrunghsk.vn",
        type: "website"
    }
};

const COURSES = [
    {
        slug: 'hsk-1',
        title: 'HSK 1 – Sơ Cấp',
        hanzi: '初级',
        desc: 'Làm quen 150 từ vựng cơ bản, phát âm pinyin, hội thoại chào hỏi đơn giản. Phù hợp người mới bắt đầu.',
        badge: '150 từ',
        icon: '🎯',
        href: '/khoa-hoc/hsk-1',
    },
    {
        slug: 'hsk-2',
        title: 'HSK 2 – Cơ Bản',
        hanzi: '基础',
        desc: 'Mở rộng lên 300 từ, ngữ pháp câu đơn giản, kỹ năng nghe hiểu đời thường. Phù hợp người đã biết HSK 1.',
        badge: '300 từ',
        icon: '📗',
        href: '/khoa-hoc/hsk-2',
    },
    {
        slug: 'hsk-3',
        title: 'HSK 3 – Trung Cấp',
        hanzi: '中级',
        desc: 'Thành thạo 600 từ, diễn đạt ý kiến, đọc hiểu văn bản ngắn, chuẩn bị thi chứng chỉ HSK 3.',
        badge: '600 từ',
        icon: '📘',
        href: '/khoa-hoc/hsk-3',
    },
    {
        slug: 'cong-xuong',
        title: 'Giao Tiếp Công Xưởng',
        hanzi: '工厂',
        desc: 'Từ vựng, mẫu câu thực tế tại nhà máy, xưởng sản xuất. Báo cáo công việc, an toàn lao động, đặt hàng vật tư.',
        badge: 'Thực tế',
        icon: '🏭',
        href: '/khoa-hoc/cong-xuong',
    },
    {
        slug: 'cong-ty',
        title: 'Giao Tiếp Công Ty',
        hanzi: '公司',
        desc: 'Tiếng Trung văn phòng, họp hành, giới thiệu bản thân, email, điện thoại. Phù hợp nhân viên văn phòng.',
        badge: 'Văn phòng',
        icon: '🏢',
        href: '/khoa-hoc/cong-ty',
    },
    {
        slug: 'tre-em',
        title: 'Tiếng Trung Trẻ Em',
        hanzi: '儿童',
        desc: 'Phương pháp vui học qua hình ảnh, bài hát, trò chơi. Từ vựng màu sắc, con số, động vật, gia đình.',
        badge: '5–12 tuổi',
        icon: '🎨',
        href: '/tre-em',
    },
];

const FEATURES = [
    { icon: '👨🏫', title: 'Giáo viên kinh nghiệm', desc: 'Giáo viên bản ngữ và Việt Nam có chứng chỉ, nhiều năm kinh nghiệm giảng dạy.' },
    { icon: '📋', title: 'Lộ trình rõ ràng', desc: 'Từ HSK 1 đến HSK 3 theo chuẩn quốc tế. Học có hệ thống, đúng trọng tâm.' },
    { icon: '📱', title: 'Học mọi lúc, mọi nơi', desc: 'Tài liệu PDF, audio, bài tập online. Học online qua Zoom hoặc trực tiếp tại Đà Nẵng.' },
    { icon: '🏆', title: 'Cam kết đầu ra', desc: 'Học viên được thi thử, luyện đề trước kỳ thi HSK chính thức. Đảm bảo chất lượng.' },
    { icon: '💬', title: 'Lớp nhỏ, cá nhân hóa', desc: 'Lớp tối đa 8 người. Giáo viên theo dõi tiến độ từng học viên.' },
    { icon: '🔄', title: 'Học lại miễn phí', desc: 'Nếu chưa đạt, học viên được học lại buổi đó miễn phí trong vòng 3 tháng.' },
];

export default async function Home() {
    const latestArticles = (await getAllArticles()).slice(0, 3);

    const formatDateVi = (dateLike: string | Date | undefined): string => {
        const ts = Date.parse(String(dateLike ?? ''));
        if (!Number.isFinite(ts) || ts <= 0) return '';
        return new Date(ts).toLocaleDateString('vi-VN');
    };

    const breadcrumbSchema = getBreadcrumbSchema([{ name: 'Trang chủ', url: '/' }]);

    return (
        <main className="min-h-screen relative">
            <HeroBackground />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }} />

            <div className="relative z-10">
                {/* Hero */}
                <section className="pt-14 pb-14 md:pt-24 md:pb-24 flex items-center justify-center min-h-[60vh]">
                    <div className="container-app">
                        <div className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-[2.5rem] bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl">
                            <div className="inline-flex badge-gradient mb-6 bg-white/30 backdrop-blur-2xl ring-1 ring-white/20 shadow-sm">HSK 1 · HSK 2 · HSK 3 · Giao tiếp · Trẻ em</div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-sm">
                                Học Tiếng Trung{' '}
                                <span className="text-gradient-accent">Đúng Trọng Tâm</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-800 mb-4 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
                                Lộ trình từ HSK 1 → HSK 3. Giao tiếp công xưởng, công ty. Tiếng Trung vui học cho trẻ em.
                            </p>
                            <p className="text-base text-gray-700 mb-10 max-w-xl mx-auto font-normal">
                                Học online & offline tại Đà Nẵng · Lớp nhỏ · Giáo viên kinh nghiệm
                            </p>
                            <div className="flex gap-4 flex-wrap justify-center">
                                <Link href="/khoa-hoc/hsk-1" className="btn btn-gradient shine-gradient px-8 py-3 text-lg shadow-xl hover:scale-105 transition-transform">
                                    Xem khóa học
                                </Link>
                                <Link href="/dang-ky" className="btn bg-white/30 backdrop-blur-xl text-gray-900 border-white/30 hover:bg-white/60 px-8 py-3 text-lg shadow-lg hover:scale-105 transition-transform">
                                    Đăng ký miễn phí
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6 Khóa học */}
                <section className="py-24 px-4 bg-white/30 backdrop-blur-2xl">
                    <div className="container-app">
                        <div className="flex items-end justify-between gap-4 mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] tracking-tight">Các Khóa Học</h2>
                                <p className="text-[var(--muted)] mt-2">Lộ trình học rõ ràng cho từng mục tiêu</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {COURSES.map((course) => (
                                <Link
                                    key={course.slug}
                                    href={course.href}
                                    className="card card-hover p-8 rounded-[2rem] bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/30 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-4xl">{course.icon}</span>
                                        <span className="badge-gradient text-xs px-3 py-1 rounded-full">{course.badge}</span>
                                    </div>
                                    <div className="mb-1">
                                        <span className="text-2xl font-[family:var(--font-serif)] text-[var(--accent)] mr-2">{course.hanzi}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">{course.title}</h3>
                                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{course.desc}</p>
                                    <p className="text-sm font-semibold link-accent mt-auto">Xem chi tiết →</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tính năng */}
                <section className="py-20 px-4">
                    <div className="container-app">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] tracking-tight">Tại Sao Chọn Chúng Tôi?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {FEATURES.map((f, i) => (
                                <div key={i} className="card p-8 rounded-[2rem] bg-white/20 border border-white/20 backdrop-blur-lg hover:bg-white/30 transition-colors shadow-xl">
                                    <div className="text-3xl mb-3">{f.icon}</div>
                                    <p className="text-sm font-semibold text-[var(--text)] mb-1">{f.title}</p>
                                    <p className="text-sm text-[var(--muted)]">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Founder & Lead Teacher Section */}
                <section className="py-20 px-4 bg-gradient-to-r from-amber-50/40 via-white/50 to-rose-50/40">
                    <div className="container-app">
                        <div className="card rounded-[2.5rem] p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl relative overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Left: Profile Card */}
                                <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-3xl bg-white/70 border border-white/70 shadow-lg">
                                    <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-500 via-amber-500 to-rose-400 p-1 shadow-xl mb-3 flex items-center justify-center">
                                        <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                                            <span className="text-5xl">👩‍🏫</span>
                                            <span className="text-[11px] font-black text-rose-700 uppercase mt-1">Cô Hồng Yên</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-[var(--text)]">
                                        {AUTHOR_INFO.name}
                                    </h3>
                                    <p className="text-xs text-rose-700 font-bold mt-0.5">
                                        {AUTHOR_INFO.role}
                                    </p>
                                    <p className="text-[11px] text-[var(--muted)] mt-1 font-semibold">
                                        Sinh năm {AUTHOR_INFO.birthYear} • Hotline / Zalo: {AUTHOR_INFO.phone}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                                            HSK 6 Quốc Tế
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                                            HSK 5+ Xuất Sắc
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                                            Bằng Giỏi ĐH Ngoại Ngữ
                                        </span>
                                    </div>

                                    <a
                                        href={AUTHOR_INFO.zaloUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary w-full mt-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-102 transition-all block text-center"
                                    >
                                        💬 Chat Zalo Cùng Cô Yên ({AUTHOR_INFO.phone})
                                    </a>
                                </div>

                                {/* Right: Credentials & Message */}
                                <div className="lg:col-span-7">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100/80 text-rose-800 uppercase tracking-wider mb-3">
                                        <span>🌟</span> Giảng Viên Trực Tiếp Đào Tạo
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] mb-4 leading-tight">
                                        Học Tiếng Trung Thực Chiến Cùng Chuyên Gia Phiên Dịch
                                    </h2>
                                    <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-4">
                                        Cô <strong>Lê Nguyễn Hồng Yên</strong> tốt nghiệp loại <strong>Giỏi khoa Tiếng Trung trường Đại học Ngoại ngữ – ĐH Đà Nẵng</strong>, đạt chứng chỉ <strong>HSK 6</strong> quốc tế cùng hơn <strong>3 năm kinh nghiệm làm phiên dịch viên</strong> cho các tập đoàn giày da Đài Loan xuất khẩu.
                                    </p>
                                    <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed mb-6">
                                        Phương pháp giảng dạy trực quan, xóa bỏ lối học vẹt. Học viên được trực tiếp rèn luyện phản xạ ngữ cảnh thực tế, thuật ngữ nhà xưởng và kỹ năng giao tiếp công xưởng - doanh nghiệp để ứng dụng vào công việc ngay sau khóa học.
                                    </p>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                        <div className="p-3 rounded-2xl bg-white/60 border border-white/60 text-center">
                                            <div className="text-lg font-black text-rose-600">3+ Năm</div>
                                            <div className="text-[11px] text-[var(--muted)] font-semibold">Dịch Thuật Giày Da</div>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-white/60 border border-white/60 text-center">
                                            <div className="text-lg font-black text-amber-600">3+ Năm</div>
                                            <div className="text-[11px] text-[var(--muted)] font-semibold">Kinh Nghiệm Giảng Dạy</div>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-white/60 border border-white/60 text-center col-span-2 sm:col-span-1">
                                            <div className="text-lg font-black text-emerald-600">100%</div>
                                            <div className="text-[11px] text-[var(--muted)] font-semibold">Theo Sát Từng Học Viên</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog mới nhất */}
                <section className="py-24 px-4 bg-white/30 backdrop-blur-xl">
                    <div className="container-app">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-[family:var(--font-serif)] font-semibold text-[var(--text)] mb-4 tracking-tight">Bài Viết Mới Nhất</h2>
                            <p className="text-lg text-[var(--muted)]">Mẹo học tiếng Trung & kiến thức bổ ích</p>
                        </div>
                        {latestArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {latestArticles.map((article) => {
                                    const dateText = formatDateVi(article.date);
                                    return (
                                        <Link key={article.slug} href={`/bai-viet/${article.slug}`} className="block h-full">
                                            <div className="card card-hover overflow-hidden cursor-pointer h-full rounded-[2rem] bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/30 transition-all">
                                                <div className="p-6 flex flex-col h-full">
                                                    {dateText && <p className="text-sm text-[var(--muted)] mb-2">{dateText}</p>}
                                                    <h3 className="text-xl font-semibold text-[var(--text)] mb-2 leading-snug line-clamp-2">{article.title}</h3>
                                                    {article.description && <p className="text-sm text-[var(--muted)] line-clamp-3 mb-4">{article.description}</p>}
                                                    <p className="link-accent mt-auto font-semibold text-sm">Đọc tiếp →</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-[var(--muted)]">Chưa có bài viết nào.</p>
                        )}
                        <div className="text-center mt-10">
                            <Link href="/bai-viet" className="btn btn-secondary bg-white/80">Xem tất cả bài viết</Link>
                        </div>
                    </div>
                </section>

                {/* CTA Đăng ký */}
                <section className="py-20 md:py-28">
                    <div className="container-app">
                        <div className="card overflow-hidden rounded-[2.5rem] bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl">
                            <div className="p-10 md:p-14 bg-gradient-to-br from-white/10 to-white/5">
                                <div className="max-w-2xl">
                                    <div className="text-5xl mb-4">汉语</div>
                                    <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)] mb-4 tracking-tight">Bắt đầu học tiếng Trung ngay hôm nay!</h2>
                                    <p className="text-[var(--muted)] mb-8">Tư vấn miễn phí lộ trình học phù hợp. Đăng ký thử học 1 buổi không mất phí.</p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Link href="/dang-ky" className="btn btn-primary">Đăng ký ngay</Link>
                                        <Link href="/lien-he" className="btn btn-secondary">Liên hệ tư vấn</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
