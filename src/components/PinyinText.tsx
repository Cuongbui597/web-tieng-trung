interface PinyinTextProps {
    hanzi: string;
    pinyin: string;
    className?: string;
    hanziSize?: string;
}

export default function PinyinText({ hanzi, pinyin, className = '', hanziSize = 'text-xl' }: PinyinTextProps) {
    return (
        <ruby className={`inline-flex flex-col items-center leading-none ${className}`}>
            <span className={`${hanziSize} font-[family:var(--font-serif)] font-medium text-[var(--text)]`}>
                {hanzi}
            </span>
            <rp>(</rp>
            <rt className="text-[10px] sm:text-xs font-normal text-[var(--accent)] tracking-normal mt-0.5">
                {pinyin}
            </rt>
            <rp>)</rp>
        </ruby>
    );
}
