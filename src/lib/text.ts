export function safeDecode(value: unknown): string {
    if (typeof value !== 'string') return '';
    let current = value;
    for (let i = 0; i < 3; i++) {
        if (!current.includes('%')) break;
        try {
            current = decodeURIComponent(current);
        } catch {
            break;
        }
    }
    return current.replace(/\+/g, ' ');
}

export function normalizeText(value: unknown): string {
    return safeDecode(value)
        .trim()
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function slugify(text: unknown): string {
    return normalizeText(text)
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-word chars
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/-+/g, '-');         // Collapse dashes
}

function stripMarkdownToText(markdown: unknown): string {
    const raw = String(markdown ?? '');
    if (!raw.trim()) return '';

    return (
        raw
            // Remove code blocks (fenced)
            .replace(/```[\s\S]*?```/g, ' ')
            // Remove inline code
            .replace(/`[^`]*`/g, ' ')
            // Images: keep nothing
            .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
            // Links: keep the label text
            .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
            // HTML tags
            .replace(/<[^>]+>/g, ' ')
            // Common markdown syntax chars
            .replace(/[*_~>#\-|]+/g, ' ')
            // Collapse whitespace
            .replace(/\s+/g, ' ')
            .trim()
    );
}

export function getWordCountFromMarkdown(markdown: unknown): number {
    const text = stripMarkdownToText(markdown);
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
}

export function getReadingTimeMinutesFromWordCount(wordCount: unknown, wordsPerMinute: unknown = 200): number {
    const wc = Number(wordCount);
    const wpm = Number(wordsPerMinute);
    if (!Number.isFinite(wc) || wc <= 0) return 0;
    if (!Number.isFinite(wpm) || wpm <= 0) return 0;
    return Math.max(1, Math.ceil(wc / wpm));
}

export function getReadingStatsFromMarkdown(markdown: unknown, { wordsPerMinute = 200 }: { wordsPerMinute?: number } = {}): { wordCount: number; minutes: number } {
    const wordCount = getWordCountFromMarkdown(markdown);
    const minutes = getReadingTimeMinutesFromWordCount(wordCount, wordsPerMinute);
    return { wordCount, minutes };
}
