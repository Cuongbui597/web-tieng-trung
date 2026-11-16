/**
 * Chuyển đổi và chuẩn hóa nội dung sao chép từ Microsoft Word hoặc Google Docs
 * thành định dạng Markdown chuẩn với các cấp tiêu đề H1, H2, H3 tương xứng.
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
 * Chuẩn hóa một chuỗi văn bản hoặc HTML từ Word thành Markdown
 */
export function convertWordToMarkdown(input: string): { content: string; detectedTitle?: string } {
    if (!input || !input.trim()) {
        return { content: '' };
    }

    let text = input;
    let detectedTitle: string | undefined;

    const isHtml = /<[a-z][\s\S]*>/i.test(input);

    if (isHtml) {
        // 1. Loại bỏ các thẻ rác đặc thù của Word Office
        text = text.replace(/<!--[\s\S]*?-->/gi, '');
        text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
        text = text.replace(/<xml[\s\S]*?<\/xml>/gi, '');
        text = text.replace(/<o:p[\s\S]*?<\/o:p>/gi, '');

        // 2. Trích xuất tiêu đề nếu có thẻ Title của Word
        const titleMatch = text.match(/<p[^>]*class="?(?:MsoTitle|Title)"?[^>]*>([\s\S]*?)<\/p>/i);
        if (titleMatch) {
            detectedTitle = cleanHtmlText(titleMatch[1]);
        }

        // 3. Chuẩn hóa các cấp tiêu đề Word HTML sang Markdown
        // H1 hoặc MsoTitle / MsoHeading1
        text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
        text = text.replace(/<p[^>]*class="?(?:MsoHeading1|Heading1)"?[^>]*>([\s\S]*?)<\/p>/gi, '\n\n## $1\n\n');

        // H2 hoặc MsoHeading2
        text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
        text = text.replace(/<p[^>]*class="?(?:MsoHeading2|Heading2)"?[^>]*>([\s\S]*?)<\/p>/gi, '\n\n## $1\n\n');

        // H3 hoặc MsoHeading3
        text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
        text = text.replace(/<p[^>]*class="?(?:MsoHeading3|Heading3)"?[^>]*>([\s\S]*?)<\/p>/gi, '\n\n### $1\n\n');

        // H4, H5, H6
        text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n### $1\n\n');
        text = text.replace(/<h[56][^>]*>([\s\S]*?)<\/h[56]>/gi, '\n\n### $1\n\n');

        // 4. In đậm, in nghiêng
        text = text.replace(/<(?:b|strong)[^>]*>([\s\S]*?)<\/(?:b|strong)>/gi, '**$1**');
        text = text.replace(/<(?:i|em)[^>]*>([\s\S]*?)<\/(?:i|em)>/gi, '*$1*');

        // 5. Danh sách
        text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
        text = text.replace(/<p[^>]*class="?(?:MsoListParagraph|ListParagraph)"?[^>]*>([\s\S]*?)<\/p>/gi, '- $1\n');

        // 6. Đoạn văn và ngắt dòng
        text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');
        text = text.replace(/<br\s*\/?>/gi, '\n');

        // 7. Bỏ các thẻ HTML còn lại
        text = text.replace(/<[^>]+>/g, '');

        // 8. Giải mã các ký tự HTML thực thể
        text = text
            .replace(/&nbsp;/gi, ' ')
            .replace(/&amp;/gi, '&')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')
            .replace(/&quot;/gi, '"')
            .replace(/&#39;/gi, "'")
            .replace(/&bull;/gi, '•');
    }

    // 9. Xử lý logic phát hiện tiêu đề theo quy tắc đề mục thông dụng tại Việt Nam (Dù là paste HTML hay Text thô)
    const lines = text.split(/\r?\n/);
    const formattedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) {
            formattedLines.push('');
            continue;
        }

        // Nếu đã có đánh dấu Markdown (#, ##, ###) thì giữ nguyên
        if (/^#{1,6}\s+/.test(line)) {
            formattedLines.push(line);
            continue;
        }

        // Quy tắc A: La Mã lớn (I., II., III., IV., V., VI., VII., VIII., IX., X.) -> H2
        if (/^(?:I|II|III|IV|V|VI|VII|VIII|IX|X)[\.\:\-\s]+(.+)$/i.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1'); // gỡ bớt bold thừa
            formattedLines.push(`\n## ${line}`);
            continue;
        }

        // Quy tắc B: Phần, Chương, Bài (Phần 1., Chương I., Bài 1:...) -> H2
        if (/^(?:PHẦN|Phần|CHƯƠNG|Chương|BÀI|Bài|MỤC|Mục)\s+[0-9A-Za-zIVXLCDM]+[\.\:\-\s]+(.+)$/i.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1');
            formattedLines.push(`\n## ${line}`);
            continue;
        }

        // Quy tắc C: Số phân cấp nhỏ (1.1, 1.2, 2.1, 2.2, a), b)...) -> H3
        if (/^\d+\.\d+(?:\.\d+)?[\.\:\-\s]+(.+)$/.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1');
            formattedLines.push(`\n### ${line}`);
            continue;
        }

        // Quy tắc D: Đánh số 1., 2., 3. nếu toàn chữ hoa hoặc in đậm đứng một mình -> H2 hoặc H3
        if (/^\d+[\.\:\s]+([A-ZÀ-Ỹ0-9\s\(\)\-\,\.\/]{4,80})$/.test(line) && !line.endsWith('.')) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1');
            formattedLines.push(`\n## ${line}`);
            continue;
        }

        // Quy tắc E: Dòng in hoa toàn bộ ngắn gọn (từ 5 đến 70 ký tự, không dấu chấm cuối câu) -> H2
        const isAllCaps = line === line.toUpperCase() && /[A-ZÀ-Ỹ]/.test(line) && line.length >= 5 && line.length <= 70;
        if (isAllCaps && !/[.,:;]$/.test(line)) {
            line = line.replace(/^\*{2}([\s\S]+)\*{2}$/, '$1');
            formattedLines.push(`\n## ${line}`);
            continue;
        }

        formattedLines.push(line);
    }

    let finalContent = formattedLines.join('\n');

    // Chuẩn hóa dòng trống thừa (tối đa 2 dòng trống liên tiếp)
    finalContent = finalContent
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^\s+|\s+$/g, '');

    // Nếu chưa trích xuất được tiêu đề, xem dòng đầu tiên có phải là H1 hoặc H2 không
    if (!detectedTitle) {
        const firstLineMatch = finalContent.match(/^#+\s+(.+)$/m);
        if (firstLineMatch) {
            detectedTitle = firstLineMatch[1].replace(/\*\*/g, '').trim();
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
