import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tất Cả Khóa Học',
    description: 'Danh sách các khóa tiếng Trung: HSK 1, HSK 2, HSK 3, giao tiếp công xưởng, công ty, trẻ em.',
};

const ALL_COURSES = [
    { slug: 'hsk-1', href: '/khoa-hoc/hsk-1', title: 'HSK 1 – Sơ Cấp', hanzi: '初级', icon: '🎯', badge: '150 từ', desc: 'Dành cho người mới bắt đầu từ con số 0. Chuẩn phát âm pinyin và hội thoại sinh hoạt.' },
    { slug: 'hsk-2', href: '/khoa-hoc/hsk-2', title: 'HSK 2 – Cơ Bản', hanzi: '基础', icon: '📗', badge: '300 từ', desc: 'Mở rộng vốn từ, ngữ pháp căn bản, phản xạ đời thường và chuẩn bị thi HSK 2.' },
    { slug: 'hsk-3', href: '/khoa-hoc/hsk-3', title: 'HSK 3 – Trung Cấp', hanzi: '中级', icon: '📘', badge: '600 từ', desc: 'Đọc hiểu đoạn văn dài, giao tiếp trôi chảy và thi lấy chứng chỉ HSK 3 quốc tế.' },
    { slug: 'cong-xuong', href: '/khoa-hoc/cong-xuong', title: 'Giao Tiếp Công Xưởng', hanzi: '工厂', icon: '🏭', badge: 'Thực tế', desc: 'Từ vựng nhà máy, máy móc thiết bị, an toàn lao động và giao tiếp với quản đốc.' },
    { slug: 'cong-ty', href: '/khoa-hoc/cong-ty', title: 'Giao Tiếp Công Ty Văn Phòng', hanzi: '公司', icon: '🏢', badge: 'Văn phòng', desc: 'Tiếng Trung văn phòng, họp hành, soạn email, hợp đồng và thương mại.' },
    { slug: 'tre-em', href: '/tre-em', title: 'Tiếng Trung Trẻ Em', hanzi: '儿童', icon: '🎨', badge: '5–12 tuổi', desc: 'Phương pháp vui học qua hình ảnh, ca khúc thiếu nhi và trò chơi tương tác.' },
];

export default function AllCoursesPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="container-app">
                <div className="text-center mb-14 max-w-2xl mx-auto">
                    <div className="inline-flex badge-gradient mb-3">Lộ Trình Toàn Diện</div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] mb-4">Tất Cả Khóa Học</h1>
                    <p className="text-[var(--muted)] text-base sm:text-lg">
                        Lựa chọn lộ trình phù hợp với mục tiêu cá nhân: luyện thi chứng chỉ, phục vụ công việc hay khơi dậy đam mê cho con trẻ.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_COURSES.map(c => (
                        <Link key={c.slug} href={c.href} className="card card-hover p-8 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-xl hover:bg-white/45 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-4xl p-2 bg-white/40 rounded-2xl shadow-sm">{c.icon}</span>
                                    <span className="badge-gradient text-xs px-3 py-1 rounded-full font-bold">{c.badge}</span>
                                </div>
                                <div className="text-2xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] mb-1">{c.hanzi}</div>
                                <h2 className="text-lg font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">{c.title}</h2>
                                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{c.desc}</p>
                            </div>
                            <div className="pt-3 border-t border-[var(--border)] text-xs font-semibold link-accent inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Xem chi tiết khóa học →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
