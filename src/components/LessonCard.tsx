import Link from 'next/link';

interface LessonCardProps {
    lesson: {
        slug: string;
        title: string;
        description?: string;
        category?: string;
        hsk_level?: string;
        duration?: string;
        vocabCount?: number;
        hanzi?: string;
        pinyin?: string;
        meaning?: string;
    };
    href?: string;
}

const CATEGORY_TAGS: Record<string, { label: string; badgeClass: string }> = {
    'hsk-1': { label: 'HSK 1', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
    'hsk-2': { label: 'HSK 2', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    'hsk-3': { label: 'HSK 3', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
    'cong-xuong': { label: 'Công xưởng', badgeClass: 'bg-amber-50 text-amber-800 border-amber-200' },
    'cong-ty': { label: 'Công ty', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
    'tre-em': { label: 'Trẻ em', badgeClass: 'bg-pink-50 text-pink-700 border-pink-200' },
};

export default function LessonCard({ lesson, href }: LessonCardProps) {
    const dest = href || `/bai-hoc/${lesson.slug}`;
    const categoryInfo = lesson.category ? CATEGORY_TAGS[lesson.category] : null;

    return (
        <Link href={dest} className="block group h-full">
            <div className="card card-hover h-full rounded-[2rem] bg-white/30 backdrop-blur-lg border border-white/30 p-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:bg-white/45 transition-all">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                        {categoryInfo && (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryInfo.badgeClass}`}>
                                {categoryInfo.label}
                            </span>
                        )}
                        {lesson.duration && (
                            <span className="text-xs text-[var(--muted)] flex items-center gap-1 font-medium">
                                ⏱ {lesson.duration}
                            </span>
                        )}
                    </div>

                    {lesson.hanzi && (
                        <div className="mb-2">
                            <span className="text-2xl font-[family:var(--font-serif)] font-bold text-[var(--accent)] tracking-wide">
                                {lesson.hanzi}
                            </span>
                            {lesson.pinyin && (
                                <span className="ml-2 text-xs text-[var(--muted)]">({lesson.pinyin})</span>
                            )}
                        </div>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {lesson.title}
                    </h3>

                    {lesson.description && (
                        <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-3 leading-relaxed mb-4">
                            {lesson.description}
                        </p>
                    )}
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold">
                    <span className="text-[var(--muted)]">
                        {lesson.vocabCount ? `📚 ${lesson.vocabCount} từ vựng` : 'Tài liệu đầy đủ'}
                    </span>
                    <span className="link-accent inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Vào học ngay →
                    </span>
                </div>
            </div>
        </Link>
    );
}
