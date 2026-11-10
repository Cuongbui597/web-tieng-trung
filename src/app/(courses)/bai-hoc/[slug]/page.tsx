import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLessonBySlug, getAllLessons } from '@/lib/lessons';
import VocabCard from '@/components/VocabCard';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const lesson = await getLessonBySlug(slug);
    if (!lesson) return {};
    return {
        title: `${lesson.title} | Học Tiếng Trung`,
        description: lesson.description,
    };
}

export async function generateStaticParams() {
    const lessons = await getAllLessons();
    return lessons.map((l) => ({ slug: l.slug }));
}

export default async function LessonDetailPage({ params }: Props) {
    const { slug } = await params;
    const lesson = await getLessonBySlug(slug);
    if (!lesson) notFound();

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container-app max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-[var(--muted)] mb-8 flex-wrap">
                    <Link href="/" className="hover:text-[var(--text)] transition">Trang chủ</Link>
                    <span>/</span>
                    <Link href="/khoa-hoc" className="hover:text-[var(--text)] transition">Khóa học</Link>
                    <span>/</span>
                    <Link href={`/khoa-hoc/${lesson.category}`} className="hover:text-[var(--text)] transition capitalize">
                        {lesson.category}
                    </Link>
                    <span>/</span>
                    <span className="text-[var(--text)] font-medium truncate max-w-xs">{lesson.title}</span>
                </nav>

                {/* Lesson Header Banner */}
                <div className="card rounded-[2.5rem] p-8 md:p-12 bg-white/35 backdrop-blur-xl border border-white/40 shadow-xl mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="badge-gradient text-xs px-3 py-1 rounded-full font-semibold">
                            {lesson.hsk_level || lesson.category}
                        </span>
                        <div className="flex items-center gap-3 text-xs sm:text-sm text-[var(--muted)] font-medium">
                            <span>⏱ {lesson.duration}</span>
                            <span>•</span>
                            <span>📚 {lesson.vocabCount} từ vựng</span>
                        </div>
                    </div>

                    {lesson.hanzi && (
                        <div className="mb-3">
                            <span className="text-4xl sm:text-5xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] tracking-wider">
                                {lesson.hanzi}
                            </span>
                            {lesson.pinyin && (
                                <span className="ml-3 text-lg sm:text-xl font-medium text-[var(--muted)]">
                                    [{lesson.pinyin}]
                                </span>
                            )}
                        </div>
                    )}

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
                        {lesson.title}
                    </h1>

                    <p className="text-base text-[var(--muted)] leading-relaxed">
                        {lesson.description}
                    </p>
                </div>

                {/* Section 1: Đoạn hội thoại mẫu */}
                {lesson.dialogue && lesson.dialogue.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-9 h-9 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                💬
                            </span>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Hội Thoại Mẫu (对话)</h2>
                                <p className="text-xs sm:text-sm text-[var(--muted)]">Luyện nghe và nói theo ngữ cảnh thực tế</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {lesson.dialogue.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-5 sm:p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-white/30 shadow-sm hover:bg-white/45 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-bold text-sm shrink-0">
                                            {item.speaker}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="text-lg sm:text-xl font-[family:var(--font-serif)] font-medium text-[var(--text)]">
                                                {item.hanzi}
                                            </div>
                                            <div className="text-xs sm:text-sm text-[var(--accent)] font-medium">
                                                {item.pinyin}
                                            </div>
                                            <div className="text-xs sm:text-sm text-[var(--muted)] pt-1">
                                                👉 {item.viet}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 2: Danh sách từ vựng trọng tâm */}
                {lesson.vocabList && lesson.vocabList.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                📖
                            </span>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Từ Vựng Trọng Tâm (生词)</h2>
                                <p className="text-xs sm:text-sm text-[var(--muted)]">Hán tự, phiên âm chuẩn Pinyin và giải nghĩa tiếng Việt</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {lesson.vocabList.map((vocab, i) => (
                                <VocabCard
                                    key={i}
                                    hanzi={vocab.hanzi}
                                    pinyin={vocab.pinyin}
                                    viet={vocab.viet}
                                    example={vocab.example}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 3: Điểm ngữ pháp & Ghi chú */}
                {lesson.notes && lesson.notes.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                💡
                            </span>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Ngữ Pháp & Điểm Cần Lưu Ý (语法点)</h2>
                                <p className="text-xs sm:text-sm text-[var(--muted)]">Quy tắc biến âm, cấu trúc câu và mẹo nhớ lâu</p>
                            </div>
                        </div>

                        <div className="card p-6 sm:p-8 rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 shadow-md space-y-4">
                            {lesson.notes.map((note, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-[var(--accent)] font-bold text-base mt-0.5">•</span>
                                    <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
                                        {note}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer Navigation CTA */}
                <div className="card p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-[var(--earth-100)] to-white/50 border border-white/40 shadow-xl text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-3">
                        Bạn muốn luyện nói 1 kèm 1 và sửa phát âm chuẩn?
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-6 max-w-xl mx-auto">
                        Đăng ký lớp học tương tác trực tiếp với giáo viên để được chỉnh sửa khẩu hình và luyện phản xạ tự nhiên.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/dang-ky" className="btn btn-primary px-8 py-3 font-semibold shadow-md">
                            Đăng ký học kèm
                        </Link>
                        <Link href={`/khoa-hoc/${lesson.category}`} className="btn btn-secondary px-8 py-3 font-semibold">
                            ← Quay lại danh sách bài học
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
