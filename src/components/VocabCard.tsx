interface VocabCardProps {
    hanzi: string;
    pinyin: string;
    viet: string;
    example?: string;
}

export default function VocabCard({ hanzi, pinyin, viet, example }: VocabCardProps) {
    return (
        <div className="card p-4 sm:p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-sm hover:shadow-md hover:bg-white/60 transition-all flex flex-col justify-between">
            <div>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-[family:var(--font-serif)] font-bold text-[var(--accent)]">
                        {hanzi}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[var(--muted)]">
                        [{pinyin}]
                    </span>
                </div>
                <div className="text-sm font-semibold text-[var(--text)] mt-1">
                    {viet}
                </div>
            </div>

            {example && (
                <div className="mt-3 pt-2 border-t border-[var(--border)] text-xs text-[var(--muted)] italic">
                    Ví dụ: {example}
                </div>
            )}
        </div>
    );
}
