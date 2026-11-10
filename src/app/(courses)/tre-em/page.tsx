import Link from 'next/link';
import { Metadata } from 'next';
import { getLessonsByCategory } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';

export const metadata: Metadata = {
    title: 'Tiếng Trung Trẻ Em',
    description: 'Khóa tiếng Trung vui học cho trẻ 5-12 tuổi. Học qua hình ảnh, bài hát, trò chơi phản xạ tự nhiên.',
};

const KIDS_TOPICS = [
    { icon: '🎨', hanzi: '颜色', title: 'Màu Sắc', desc: 'Học tên các màu sắc rực rỡ qua tranh vẽ vui nhộn.' },
    { icon: '🔢', hanzi: '数字', title: 'Số Đếm', desc: 'Đếm 1-100 bằng tiếng Trung qua giai điệu bài hát.' },
    { icon: '🐼', hanzi: '动物', title: 'Động Vật', desc: 'Gấu trúc, cún con, mèo con và muông thú đáng yêu.' },
    { icon: '👨‍👩‍👧', hanzi: '家庭', title: 'Gia Đình', desc: 'Gọi tên ông bà, bố mẹ, anh chị em bằng tiếng Trung.' },
    { icon: '🏫', hanzi: '学校', title: 'Trường Học', desc: 'Từ vựng lớp học, cặp sách, bạn bè và thầy cô.' },
    { icon: '🍎', hanzi: '水果', title: 'Trái Cây', desc: 'Nhận biết và gọi tên táo, chuối, dưa hấu thơm ngon.' },
    { icon: '🎵', hanzi: '歌曲', title: 'Bài Hát', desc: 'Hát theo các giai điệu thiếu nhi Hoa ngữ dễ nhớ.' },
    { icon: '🎮', hanzi: '游戏', title: 'Trò Chơi', desc: 'Mini game từ vựng, flashcard tương tác giúp nhớ sâu.' },
];

export default async function KidsPage() {
    const kidsLessons = await getLessonsByCategory('tre-em');

    return (
        <div className="min-h-screen py-16 px-4">
            <div className="container-app">
                {/* Hero */}
                <div className="text-center mb-16 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-pink-100/70 via-amber-50/50 to-orange-100/60 border border-white/40 shadow-xl backdrop-blur-lg">
                    <div className="text-6xl mb-3">🎨</div>
                    <div className="text-4xl sm:text-5xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] mb-3">
                        儿童汉语
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4">
                        Tiếng Trung Cho Trẻ Em (5 – 12 Tuổi)
                    </h1>
                    <p className="text-[var(--muted)] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-6">
                        Khơi nguồn đam mê ngôn ngữ từ sớm cho bé. Phương pháp tiếp cận tự nhiên qua hình ảnh màu sắc, ca khúc thiếu nhi và trò chơi tương tác. Lớp học thân thiện, vui vẻ, chỉ từ 4-6 bạn nhỏ/lớp.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <span className="badge">🎯 Dành cho bé 5–12 tuổi</span>
                        <span className="badge">👩‍🏫 Giáo viên chuyên sư phạm mầm non & tiểu học</span>
                        <span className="badge">🎵 100% Học qua bài hát & hình ảnh</span>
                        <span className="badge">🎮 Không áp lực bài vở</span>
                    </div>
                </div>

                {/* Bài học mẫu cho bé */}
                {kidsLessons.length > 0 && (
                    <div className="mb-14">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Bài Học Mẫu Dành Cho Bé</h2>
                                <p className="text-xs sm:text-sm text-[var(--muted)]">Nhấp vào bài học để bé thử khám phá từ vựng và câu chuyện vui nhé</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {kidsLessons.map((lesson) => (
                                <LessonCard key={lesson.slug} lesson={lesson} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Chủ đề */}
                <h2 className="text-2xl font-bold text-[var(--text)] mb-8 text-center">8 Chủ Đề Học Vui Nhộn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {KIDS_TOPICS.map((t, i) => (
                        <div key={i} className="card p-6 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-md hover:bg-white/45 transition-all text-center">
                            <div className="text-4xl mb-3">{t.icon}</div>
                            <div className="text-2xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] mb-1">{t.hanzi}</div>
                            <h3 className="font-bold text-base text-[var(--text)] mb-1">{t.title}</h3>
                            <p className="text-xs sm:text-sm text-[var(--muted)]">{t.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="card p-10 rounded-[2.5rem] bg-white/30 backdrop-blur-xl border border-white/30 shadow-xl text-center max-w-xl mx-auto">
                    <h3 className="text-2xl font-bold text-[var(--text)] mb-3">Đăng Ký Cho Bé Học Thử Miễn Phí</h3>
                    <p className="text-sm text-[var(--muted)] mb-6">
                        Ba mẹ đăng ký ngay để bé tham gia 1 buổi học trải nghiệm hoàn toàn miễn phí cùng thầy cô nhé!
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/dang-ky" className="btn btn-primary px-8 py-3.5 text-base font-semibold shadow-md">
                            Đăng ký học thử cho bé
                        </Link>
                        <Link href="/lien-he" className="btn btn-secondary px-8 py-3.5 text-base font-semibold">
                            Tư vấn qua Zalo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
