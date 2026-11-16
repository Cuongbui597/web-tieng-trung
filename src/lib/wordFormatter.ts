/**
 * Chuyển đổi và chuẩn hóa nội dung sao chép từ Microsoft Word hoặc Google Docs
 * thành định dạng Markdown chuẩn với các cấp tiêu đề H1, H2, H3 tương xứng.
 * Giải mã toàn bộ HTML Entities (&#299;, &#7843;, &#183;...) thành chữ tiếng Việt và Pinyin có dấu chuẩn.
 */

export const RANDOM_ARTICLE_IMAGES = [
    '/images/blog/hsk-1-huong-dan.jpg',
    '/images/blog/hoc-tieng-trung.jpg',
    '/images/blog/tieng-trung-cong-xuong.jpg',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop',
];

export function getRandomArticleImage(): string {
    const idx = Math.floor(Math.random() * RANDOM_ARTICLE_IMAGES.length);
    return RANDOM_ARTICLE_IMAGES[idx];
}

/**
 * Giải mã triệt để tất cả HTML Entities (Decimal, Hex, Named) sang ký tự Unicode thực tế
 * Ví dụ: &#299; -> ī, &#249; -> ù, &#7843; -> ả, &#183; -> ·, &nbsp; -> khoảng trắng
 */
export function decodeAllHtmlEntities(str: string): string {
    if (!str) return '';
    return str
        // Decimal entities: &#299;, &#7843;...
        .replace(/&#(\d+);?/g, (_, dec) => {
            try {
                const code = parseInt(dec, 10);
                return code ? String.fromCodePoint(code) : '';
            } catch {
                return '';
            }
        })
        // Hex entities: &#x1F600;, &#x00B7;...
        .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => {
            try {
                const code = parseInt(hex, 16);
                return code ? String.fromCodePoint(code) : '';
            } catch {
                return '';
            }
        })
        // Named entities thông dụng
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&apos;/gi, "'")
        .replace(/&middot;/gi, '·')
        .replace(/&bull;/gi, '•')
        .replace(/&ndash;/gi, '–')
        .replace(/&mdash;/gi, '—');
}

/**
 * Chuẩn hóa một chuỗi văn bản hoặc HTML từ Word thành Markdown chuẩn
 */
export function convertWordToMarkdown(input: string): { content: string; detectedTitle?: string } {
    if (!input || !input.trim()) {
        return { content: '' };
    }

    // Bước 1: Luôn giải mã toàn bộ HTML Entities trước
    let text = decodeAllHtmlEntities(input);
    let detectedTitle: string | undefined;

    const isHtml = /<[a-z][\s\S]*>/i.test(text);

    if (isHtml) {
        // Loại bỏ thẻ rác của Word
        text = text.replace(/<!--[\s\S]*?-->/gi, '');
        text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
        text = text.replace(/<xml[\s\S]*?<\/xml>/gi, '');
        text = text.replace(/<o:p[\s\S]*?<\/o:p>/gi, '');

        // Trích xuất tiêu đề nếu có thẻ Title của Word
        const titleMatch = text.match(/<p[^>]*class="?(?:MsoTitle|Title)"?[^>]*>([\s\S]*?)<\/p>/i);
        if (titleMatch) {
            detectedTitle = decodeAllHtmlEntities(cleanHtmlText(titleMatch[1]));
        }

        // Chuyển đổi các thẻ Heading HTML
        text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
        text = text.replace(/<p[^>]*class="?(?:MsoHeading1|Heading1)"?[^>]*>([\s\S]*?)<\/p>/gi, '\n\n## $1\n\n');

        text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
        text = text.replace(/<p[^>]*class="?(?:MsoHeading2|Heading2)"?[^>]*>([\s\S]*?)<\/p>/gi, '\n\n## $1\n\n');

        text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
        text = text.replace(/<p[^>]*class="?(?:MsoHeading3|Heading3)"?[^>]*>([\s\S]*?)<\/p>/gi, '\n\n### $1\n\n');

        text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n### $1\n\n');
        text = text.replace(/<h[56][^>]*>([\s\S]*?)<\/h[56]>/gi, '\n\n### $1\n\n');

        // In đậm, in nghiêng
        text = text.replace(/<(?:b|strong)[^>]*>([\s\S]*?)<\/(?:b|strong)>/gi, '**$1**');
        text = text.replace(/<(?:i|em)[^>]*>([\s\S]*?)<\/(?:i|em)>/gi, '*$1*');

        // Danh sách gạch đầu dòng từ Word
        text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
        text = text.replace(/<p[^>]*class="?(?:MsoListParagraph|ListParagraph)"?[^>]*>([\s\S]*?)<\/p>/gi, '- $1\n');

        // Đoạn văn
        text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');
        text = text.replace(/<br\s*\/?>/gi, '\n');

        // Bỏ các thẻ HTML còn lại
        text = text.replace(/<[^>]+>/g, '');

        // Giải mã lần 2 cho phần ruột thẻ
        text = decodeAllHtmlEntities(text);
    }

    // Bước 2: Dọn dẹp asterisks thừa như **** do lồng thẻ bold từ Word
    text = text.replace(/\*{4,}/g, '');

    // Bước 3: Chuẩn hóa theo từng dòng
    const lines = text.split(/\r?\n/);
    const formattedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) {
            formattedLines.push('');
            continue;
        }

        // Bỏ dấu **** thừa ở cuối dòng (chỉ xóa nếu có 3 dấu * trở lên, tránh xóa dấu ** của bold)
        line = line.replace(/\*{3,}$/, '').trim();

        // Nếu dòng đã có đánh dấu Markdown (#, ##, ###)
        if (/^#{1,6}\s+/.test(line)) {
            formattedLines.push(line);
            continue;
        }

        // Quy tắc 1: Dấu chấm đầu dòng (bullet point của Word: ·, •, &#183;, -, *)
        if (/^[\u00B7\u2022\u25E6\u2219\*\-]\s*(.*)$/.test(line)) {
            const bulletContent = line.replace(/^[\u00B7\u2022\u25E6\u2219\*\-]\s*/, '').trim();
            formattedLines.push(`- ${bulletContent}`);
            continue;
        }

        // Quy tắc 2: Tiêu đề cấp cao (BUỔI 1:, CHƯƠNG 1:, PHẦN A:, I., II., III.) -> H2 (##)
        if (
            /^(?:BUỔI|Buổi|CHƯƠNG|Chương|PHẦN|Phần)\s+[0-9A-Za-zIVXLCDM]+[\.\:\-\s]+(.+)$/i.test(line) ||
            /^(?:I|II|III|IV|V|VI|VII|VIII|IX|X)[\.\:\-\s]+(.+)$/i.test(line)
        ) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1').trim();
            formattedLines.push(`\n## ${line}\n`);
            continue;
        }

        // Quy tắc 3: Từ vựng có đánh số thứ tự (1. 你好..., 7. 织物样本..., 8. 衣料样品卡...) -> H3 (###)
        if (/^\d+[\.\:\-\)]\s+(.+)$/.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1').trim();
            formattedLines.push(`\n### ${line}\n`);
            continue;
        }

        // Quy tắc 4: Phân cấp nhỏ hơn (1.1, 1.2, 2.1, 2.2, a), b)...) -> H3 (###)
        if (/^\d+\.\d+(?:\.\d+)?[\.\:\-\s]+(.+)$/.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1').trim();
            formattedLines.push(`\n### ${line}\n`);
            continue;
        }

        // Quy tắc 5: Dòng in hoa toàn bộ ngắn gọn (từ 5 đến 70 ký tự, không kết thúc bằng dấu chấm) -> H2 (##)
        const isAllCaps = line === line.toUpperCase() && /[A-ZÀ-Ỹ]/.test(line) && line.length >= 5 && line.length <= 70;
        if (isAllCaps && !/[.,:;]$/.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1').trim();
            formattedLines.push(`\n## ${line}\n`);
            continue;
        }

        formattedLines.push(line);
    }

    let finalContent = formattedLines.join('\n');

    // Chuẩn hóa dòng trống thừa (tối đa 2 dòng trống liên tiếp)
    finalContent = finalContent
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^\s+|\s+$/g, '');

    // Nếu chưa trích xuất được tiêu đề, xem dòng đầu tiên có thể làm tiêu đề không
    if (!detectedTitle) {
        const firstLineMatch = finalContent.match(/^#+\s+(.+)$/m);
        if (firstLineMatch) {
            detectedTitle = firstLineMatch[1].replace(/\*\*/g, '').trim();
        } else {
            // Lấy dòng đầu tiên nếu ngắn gọn
            const firstLine = finalContent.split('\n')[0]?.trim();
            if (firstLine && firstLine.length <= 100) {
                detectedTitle = firstLine.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim();
            }
        }
    }

    return {
        content: finalContent,
        detectedTitle,
    };
}

function cleanHtmlText(html: string): string {
    return html
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}
