import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLessonsByCategory } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';

const COURSE_INFO: Record<string, {
    title: string;
    hanzi: string;
    desc: string;
    icon: string;
    color: string;
    vocab: number;
    topics: string[];
}> = {
    'hsk-1': {
        title: 'HSK 1 – Sơ Cấp',
        hanzi: '初级',
        desc: 'Khóa học HSK 1 dành cho người mới bắt đầu từ con số 0. Học 150 từ vựng thiết yếu, phát âm pinyin chuẩn xác, hội thoại chào hỏi và sinh hoạt căn bản.',
        icon: '🎯',
        color: 'from-red-500/20 to-orange-400/10',
        vocab: 150,
        topics: ['Phát âm Pinyin & Thanh điệu', 'Chào hỏi & Xưng hô', 'Số đếm, Ngày tháng, Giờ giấc', 'Gia đình & Bản thân', 'Mua sắm đồ dùng hàng ngày', 'Ăn uống & Nhà hàng'],
    },
    'hsk-2': {
        title: 'HSK 2 – Cơ Bản',
        hanzi: '基础',
        desc: 'Khóa học HSK 2 mở rộng vốn từ lên 300 từ, cấu trúc câu phức vừa phải, kỹ năng nghe hiểu và phản xạ giao tiếp đời thường trôi chảy.',
        icon: '📗',
        color: 'from-emerald-500/20 to-teal-400/10',
        vocab: 300,
        topics: ['Thời tiết & Mùa màng', 'Du lịch & Hỏi đường', 'Sức khỏe & Khám bệnh', 'Công việc & Thói quen', 'Sở thích & Giải trí', 'Phương tiện giao thông'],
    },
    'hsk-3': {
        title: 'HSK 3 – Trung Cấp',
        hanzi: '中级',
        desc: 'Khóa học HSK 3 nâng cao lên 600 từ vựng, diễn đạt quan điểm cá nhân, đọc hiểu đoạn văn dài và tự tin thi đạt chứng chỉ HSK 3 quốc tế.',
        icon: '📘',
        color: 'from-blue-500/20 to-indigo-400/10',
        vocab: 600,
        topics: ['Phỏng vấn & Xin việc làm', 'Kinh tế & Thương mại cơ bản', 'Văn hóa & Đời sống xã hội', 'Môi trường sống', 'Thể thao & Sức khỏe tinh thần', 'Công nghệ & Mạng xã hội'],
    },
    'cong-xuong': {
        title: 'Giao Tiếp Công Xưởng',
        hanzi: '工厂',
        desc: 'Tiếng Trung thực chiến tại nhà máy, xí nghiệp, khu công nghiệp. Từ vựng chuyên ngành cơ khí, may mặc, điện tử, quy trình vận hành máy và an toàn lao động.',
        icon: '🏭',
        color: 'from-amber-500/20 to-yellow-400/10',
        vocab: 250,
        topics: ['Quy tắc an toàn & Thiết bị bảo hộ', 'Vận hành máy & Báo cáo sự cố', 'Báo cáo sản lượng & Giao ca', 'Kiểm tra chất lượng (QC/KCS)', 'Đặt hàng vật tư & Quản lý kho', 'Giao tiếp đốc công & quản đốc Đài Loan/Trung Quốc'],
    },
    'cong-ty': {
        title: 'Giao Tiếp Công Ty & Văn Phòng',
        hanzi: '公司',
        desc: 'Tiếng Trung công sở, thương mại: Giới thiệu dự án, soạn thảo email, văn bản kinh doanh, đàm phán hợp đồng và giao tiếp lịch sự trong môi trường tập đoàn.',
        icon: '🏢',
        color: 'from-purple-500/20 to-pink-400/10',
        vocab: 300,
        topics: ['Giới thiệu doanh nghiệp & Năng lực', 'Họp giao ban & Thuyết trình dự án', 'Soạn email & Tin nhắn Wechat/Zalo', 'Điện thoại & Đón tiếp đối tác', 'Thương lượng giá cả & Hợp đồng', 'Báo cáo tài chính & Kế toán tổng quan'],
    },
};

interface Props {
    params: Promise<{ 'cap-do': string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { 'cap-do': capDo } = await params;
    const info = COURSE_INFO[capDo];
    if (!info) return {};
    return {
        title: `${info.title} | Khóa Học Tiếng Trung`,
        description: info.desc,
    };
}

export default async function CourseDetailPage({ params }: Props) {
    const { 'cap-do': capDo } = await params;
    const info = COURSE_INFO[capDo];
    if (!info) notFound();

    const lessons = await getLessonsByCategory(capDo);

    return (
        <div className="min-h-screen py-16 px-4">
            <div className="container-app">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-[var(--muted)] mb-8">
                    <Link href="/" className="hover:text-[var(--text)] transition">Trang chủ</Link>
                    <span>/</span>
                    <Link href="/khoa-hoc" className="hover:text-[var(--text)] transition">Khóa học</Link>
                    <span>/</span>
                    <span className="text-[var(--text)] font-semibold">{info.title}</span>
                </nav>

                {/* Hero khóa học */}
                <div className={`rounded-[2.5rem] bg-gradient-to-br ${info.color} border border-white/30 p-8 sm:p-12 mb-12 shadow-xl backdrop-blur-lg`}>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <span className="text-6xl sm:text-7xl p-3 bg-white/40 rounded-3xl shadow-sm shrink-0">
                            {info.icon}
                        </span>
                        <div>
                            <div className="text-3xl sm:text-4xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] mb-2">
                                {info.hanzi}
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-bold text-[var(--text)] mb-3">
                                {info.title}
                            </h1>
                            <p className="text-base text-[var(--muted)] max-w-2xl leading-relaxed mb-6">
                                {info.desc}
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                <span className="badge">📚 Chuẩn {info.vocab}+ từ vựng</span>
                                <span className="badge">🎓 {info.topics.length} học phần lớn</span>
                                <span className="badge">⏱ Lộ trình 2.5 - 3 tháng</span>
                                <span className="badge">🎯 Cam kết đầu ra</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bài học mẫu trực tuyến */}
                {lessons.length > 0 && (
                    <div className="mb-14">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Bài Học Trực Tuyến Đã Xuất Bản</h2>
                                <p className="text-xs sm:text-sm text-[var(--muted)]">Nhấp vào bài để xem đầy đủ hội thoại pinyin và từ vựng</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {lessons.map((lesson) => (
                                <LessonCard key={lesson.slug} lesson={lesson} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Khung chương trình chi tiết */}
                <div className="mb-14">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-6">Nội Dung Khung Chương Trình Đào Tạo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {info.topics.map((topic, i) => (
                            <div key={i} className="card p-6 rounded-[1.5rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/45 transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="font-semibold text-sm sm:text-base text-[var(--text)]">{topic}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="card p-10 rounded-[2.5rem] bg-white/30 backdrop-blur-xl border border-white/30 shadow-xl text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-[var(--text)] mb-3">Sẵn Sàng Chinh Phục {info.title}?</h3>
                    <p className="text-sm text-[var(--muted)] mb-8">
                        Đăng ký ngay hôm nay để nhận ưu đãi học phí và được xếp lớp phù hợp với trình độ hiện tại của bạn.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/dang-ky" className="btn btn-primary px-8 py-3.5 text-base font-semibold shadow-md">
                            Đăng Ký Khóa Học Này
                        </Link>
                        <Link href="/hoc-phi" className="btn btn-secondary px-8 py-3.5 text-base font-semibold">
                            Xem Bảng Học Phí
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
