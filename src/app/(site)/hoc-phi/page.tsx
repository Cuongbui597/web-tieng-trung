import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bảng Học Phí & Khóa Học',
    description: 'Bảng học phí các khóa học tiếng Trung HSK 1, HSK 2, HSK 3, Giao tiếp công xưởng, Giao tiếp công ty và Tiếng Trung trẻ em tại Đà Nẵng.',
};

const PRICE_PLANS = [
    {
        name: 'HSK 1 – Sơ Cấp',
        hanzi: '初级班',
        price: '1.600.000',
        unit: 'khóa 2 tháng',
        sessions: 24,
        duration: '90 phút/buổi',
        features: [
            '150 từ vựng cốt lõi & phát âm chuẩn Pinyin',
            'Giáo trình HSK tiêu chuẩn + File Audio độc quyền',
            'Sĩ số lớp nhỏ: 6 - 8 học viên',
            'Sửa phát âm trực tiếp từng buổi học',
            'Luyện đề thi thử sát với đề thi thực tế',
            'Cam kết đầu ra HSK 1 đạt điểm cao'
        ],
        highlight: false,
        href: '/khoa-hoc/hsk-1',
    },
    {
        name: 'HSK 2 – Cơ Bản',
        hanzi: '基础班',
        price: '1.900.000',
        unit: 'khóa 2.5 tháng',
        sessions: 30,
        duration: '90 phút/buổi',
        features: [
            '300 từ vựng & cấu trúc ngữ pháp câu phức',
            'Phản xạ giao tiếp tự nhiên các tình huống đời thường',
            'Rèn luyện kỹ năng nghe hiểu tốc độ chuẩn người bản xứ',
            'Thi thử mô phỏng kỳ thi thật trên máy tính',
            'Học lại miễn phí nếu chưa đạt chứng chỉ',
            'Hỗ trợ giải đáp thắc mắc 24/7 qua Zalo nhóm'
        ],
        highlight: true,
        href: '/khoa-hoc/hsk-2',
    },
    {
        name: 'HSK 3 – Trung Cấp',
        hanzi: '中级班',
        price: '2.400.000',
        unit: 'khóa 3 tháng',
        sessions: 36,
        duration: '90 phút/buổi',
        features: [
            '600 từ vựng nâng cao & đọc hiểu văn bản dài',
            'Tự tin thuyết trình và viết đoạn văn bằng chữ Hán',
            'Chiến thuật làm bài thi HSK 3 đạt điểm tuyệt đối',
            'Bộ đề thi thử độc quyền cập nhật mới nhất',
            'Cấp chứng nhận hoàn thành khóa học tại trung tâm',
            'Giới thiệu cơ hội việc làm liên kết doanh nghiệp'
        ],
        highlight: false,
        href: '/khoa-hoc/hsk-3',
    },
    {
        name: 'Giao Tiếp Công Xưởng',
        hanzi: '工厂实战',
        price: '1.800.000',
        unit: 'khóa 1.5 tháng',
        sessions: 18,
        duration: '90 phút/buổi',
        features: [
            'Tập trung từ vựng xưởng: máy móc, linh kiện, bảo hộ',
            'Kỹ năng báo cáo sản lượng, hàng lỗi, đơn hàng gấp',
            'Giao tiếp chuẩn xác với chuyên gia & quản đốc Đài Loan',
            'Thực hành tình huống thực tế tại phân xưởng',
            'Tài liệu song ngữ Hán - Việt tiện tra cứu trên điện thoại',
            'Học linh hoạt ca tối hoặc cuối tuần'
        ],
        highlight: false,
        href: '/khoa-hoc/cong-xuong',
    },
    {
        name: 'Giao Tiếp Công Ty Văn Phòng',
        hanzi: '商务汉语',
        price: '2.200.000',
        unit: 'khóa 2 tháng',
        sessions: 24,
        duration: '90 phút/buổi',
        features: [
            'Tiếng Trung thương mại, đàm phán và thuyết trình dự án',
            'Kỹ năng viết email, báo cáo tuần/tháng chuyên nghiệp',
            'Quy tắc xã giao, văn hóa ứng xử doanh nghiệp Hoa',
            'Luyện phản xạ phỏng vấn xin việc tiếng Trung',
            'Mẫu hợp đồng kinh tế và hóa đơn chứng từ',
            'Phù hợp nhân viên văn phòng, mua hàng, xuất nhập khẩu'
        ],
        highlight: false,
        href: '/khoa-hoc/cong-ty',
    },
    {
        name: 'Tiếng Trung Trẻ Em',
        hanzi: '少儿趣味',
        price: '1.300.000',
        unit: 'tháng (8 buổi)',
        sessions: 8,
        duration: '60 phút/buổi',
        features: [
            'Dành cho bé từ 5 đến 12 tuổi',
            'Tiếp cận tự nhiên qua tranh ảnh, bài hát, truyện tranh',
            'Lớp học siêu nhỏ: 4 - 6 bé / lớp',
            'Giáo viên kiên nhẫn, yêu trẻ, phát âm chuẩn Bắc Kinh',
            'Rèn luyện trí nhớ và phản xạ ngôn ngữ song song',
            'Báo cáo tình hình học tập định kỳ hàng tuần cho phụ huynh'
        ],
        highlight: false,
        href: '/tre-em',
    },
];

export default function HocPhiPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="container-app">
                <div className="text-center mb-14 max-w-3xl mx-auto">
                    <div className="inline-flex badge-gradient mb-4">Minh Bạch · Hợp Lý · Đáng Tin Cậy</div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight">
                        Bảng Học Phí Khóa Học
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                        Học phí trọn gói đã bao gồm toàn bộ giáo trình, tài liệu bản cứng và audio ôn tập. Cam kết không phát sinh bất kỳ phụ phí nào trong suốt khóa học.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {PRICE_PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`card rounded-[2.5rem] p-8 border shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                                plan.highlight
                                    ? 'bg-gradient-to-b from-white/60 to-[var(--earth-100)] border-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                                    : 'bg-white/30 backdrop-blur-xl border-white/40 hover:bg-white/40'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="text-2xl font-[family:var(--font-serif)] font-bold text-[var(--accent)]">
                                        {plan.hanzi}
                                    </span>
                                    {plan.highlight && (
                                        <span className="badge-gradient text-xs px-3 py-1 rounded-full font-bold">
                                            ⭐ Được Chọn Nhiều Nhất
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-2">
                                    {plan.name}
                                </h2>

                                <div className="mb-4">
                                    <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm font-semibold text-[var(--accent)] ml-1">
                                        VNĐ
                                    </span>
                                    <span className="text-xs text-[var(--muted)] block mt-0.5">
                                        / {plan.unit} • {plan.sessions} buổi ({plan.duration})
                                    </span>
                                </div>

                                <div className="border-t border-[var(--border)] pt-4 mb-6">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
                                        Quyền lợi khóa học:
                                    </div>
                                    <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text)]">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                                                <span className="leading-snug">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <Link
                                    href={`/dang-ky?course=${encodeURIComponent(plan.name)}`}
                                    className="btn btn-primary w-full text-center block py-3 font-semibold shadow-md"
                                >
                                    Đăng ký giữ chỗ ngay
                                </Link>
                                <Link
                                    href={plan.href}
                                    className="text-xs text-center block text-[var(--muted)] hover:text-[var(--text)] transition pt-1"
                                >
                                    Xem chi tiết lộ trình học →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ưu đãi đăng ký theo nhóm */}
                <div className="card p-8 sm:p-12 rounded-[2.5rem] bg-white/35 backdrop-blur-xl border border-white/40 shadow-xl max-w-4xl mx-auto mb-14">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                            <div className="text-4xl mb-2">👥</div>
                            <h3 className="font-bold text-base text-[var(--text)] mb-1">Đăng Ký Nhóm 2 Người</h3>
                            <p className="text-xs text-[var(--muted)]">Giảm ngay 10% học phí cho cả 2 học viên khi đăng ký cùng khóa.</p>
                        </div>
                        <div className="p-4 border-y md:border-y-0 md:border-x border-[var(--border)]">
                            <div className="text-4xl mb-2">🎓</div>
                            <h3 className="font-bold text-base text-[var(--text)] mb-1">Học Sinh - Sinh Viên</h3>
                            <p className="text-xs text-[var(--muted)]">Ưu đãi giảm 15% học phí khi xuất trình thẻ học sinh, sinh viên còn hạn.</p>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl mb-2">🔄</div>
                            <h3 className="font-bold text-base text-[var(--text)] mb-1">Học Thử Miễn Phí</h3>
                            <p className="text-xs text-[var(--muted)]">Tham gia 1 buổi học thử không mất phí để cảm nhận chất lượng giảng dạy.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Form redirect */}
                <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-3">
                        Cần được tư vấn lộ trình học phù hợp với quỹ thời gian của bạn?
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-6">
                        Đội ngũ cố vấn đào tạo sẽ liên hệ phân tích trình độ và gợi ý khóa học tối ưu nhất cho bạn.
                    </p>
                    <Link href="/dang-ky" className="btn btn-primary px-10 py-3.5 text-base font-semibold shadow-lg">
                        Nhận tư vấn miễn phí ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}
