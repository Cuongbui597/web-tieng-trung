'use client';

import { useState, FormEvent, ChangeEvent, ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { convertWordToMarkdown, decodeAllHtmlEntities, getRandomArticleImage, RANDOM_ARTICLE_IMAGES } from '@/lib/wordFormatter';

export default function CreateArticlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('Cô Lê Nguyễn Hồng Yên');
    const [imageUrl, setImageUrl] = useState(() => getRandomArticleImage());
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [wordNotice, setWordNotice] = useState<string | null>(null);

    // Sinh slug tự động từ tiêu đề
    function generateSlug(str: string): string {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!slug || slug === generateSlug(title)) {
            setSlug(generateSlug(newTitle));
        }
    }

    // Đổi ảnh ngẫu nhiên khác
    function handlePickRandomImage() {
        let nextImg = getRandomArticleImage();
        while (nextImg === imageUrl && RANDOM_ARTICLE_IMAGES.length > 1) {
            nextImg = getRandomArticleImage();
        }
        setImageUrl(nextImg);
    }

    // Tự động chuẩn hóa định dạng khi Paste (Ctrl + V) từ Word vào ô nội dung
    function handleContentPaste(e: ClipboardEvent<HTMLTextAreaElement>) {
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');

        const inputToConvert = html || text;
        if (!inputToConvert) return;

        e.preventDefault();
        const { content: formatted, detectedTitle } = convertWordToMarkdown(inputToConvert);

        // Chèn vào vị trí con trỏ hoặc thay thế vùng chọn
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + formatted + content.substring(end);
        setContent(newContent);

        // Tự động điền tiêu đề nếu ô tiêu đề đang trống
        if (!title.trim() && detectedTitle) {
            setTitle(detectedTitle);
            setSlug(generateSlug(detectedTitle));
        }

        setWordNotice('✨ Đã tự động giải mã font tiếng Việt/Pinyin và chuẩn hóa các đề mục H1, H2, H3!');
        setTimeout(() => setWordNotice(null), 5000);
    }

    // Nút thủ công: Chuẩn hóa toàn bộ nội dung hiện tại
    function handleFormatNow() {
        if (!content.trim()) {
            alert('Vui lòng dán hoặc nhập nội dung vào ô bài viết trước.');
            return;
        }
        const { content: formatted, detectedTitle } = convertWordToMarkdown(content);
        setContent(formatted);
        if (!title.trim() && detectedTitle) {
            setTitle(detectedTitle);
            setSlug(generateSlug(detectedTitle));
        }
        setWordNotice('✨ Đã giải mã toàn bộ ký tự & chuẩn hóa H1, H2, H3 thành công!');
        setTimeout(() => setWordNotice(null), 5000);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Tự động chuẩn hóa nội dung lần cuối trước khi gửi (đảm bảo không còn ký tự &#...;)
        const { content: cleanContent, detectedTitle } = convertWordToMarkdown(content);
        setContent(cleanContent);

        const finalTitle = title.trim() || detectedTitle || 'Bài viết Tiếng Trung May Mặc & Dệt Sợi';
        const finalSlug = slug.trim() || generateSlug(finalTitle);
        const finalImage = imageUrl.trim() || getRandomArticleImage();

        const data = {
            title: finalTitle,
            slug: finalSlug,
            author: author.trim() || 'Cô Lê Nguyễn Hồng Yên',
            date: new Date().toISOString().split('T')[0],
            image: finalImage,
            description: description.trim() || finalTitle,
            content: cleanContent,
            tags: ['tiếng trung', 'hsk', 'may mặc', 'dệt sợi'],
        };

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Có lỗi xảy ra khi lưu bài viết');
            }

            alert('🎉 Bài viết đã được xuất bản thành công kèm ảnh đại diện tự động!');
            router.push('/admin/articles');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-4xl mx-auto space-y-6 pb-16">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/articles"
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1 mb-1"
                    >
                        ← Quay lại danh sách bài viết
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Thêm Bài Viết Mới
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={handlePickRandomImage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition shadow-2xs"
                    title="Đổi ảnh đại diện ngẫu nhiên khác"
                >
                    🎲 Đổi ảnh ngẫu nhiên
                </button>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl animate-shake">
                    ⚠️ {error}
                </div>
            )}

            {wordNotice && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2 shadow-xs">
                    <span>{wordNotice}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                {/* 1. Ô ĐẶT TIÊU ĐỀ (NỔI BẬT) */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-extrabold text-slate-900">
                            1. Tiêu đề bài viết <span className="text-rose-600">*</span>
                        </label>
                        <span className="text-xs text-slate-400">Tự động điền nếu dán từ Word có tiêu đề</span>
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Nhập tiêu đề bài viết (Ví dụ: Từ Vựng Chuyên Ngành Dệt Sợi May Mặc & Kiểm Hàng QC)..."
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none text-base sm:text-lg font-bold text-slate-900 placeholder:text-slate-400 transition"
                    />
                </div>

                {/* Slug & Tác giả */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Đường dẫn URL (Slug)
                        </label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="tu-vung-chuyen-nganh-det-soi-may-mac"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50 text-slate-700 focus:bg-white focus:border-rose-500 outline-none transition"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Tác giả
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Cô Lê Nguyễn Hồng Yên"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:border-rose-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* 2. HÌNH ẢNH ĐẠI DIỆN TỰ ĐỘNG NGẪU NHIÊN */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                <span>🖼️</span> 2. Ảnh đại diện (Hệ thống tự chọn ngẫu nhiên khi đăng)
                            </label>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                                Tự động gán hình ảnh đẹp mắt không bị trống. Bấm nút bên cạnh để đổi hình khác nếu muốn.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handlePickRandomImage}
                            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-rose-700 border border-rose-200 text-xs font-bold shadow-2xs transition shrink-0 cursor-pointer"
                        >
                            🎲 Đổi ảnh ngẫu nhiên khác
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-32 sm:w-44 aspect-video rounded-xl overflow-hidden border-2 border-white shadow-md bg-slate-200 shrink-0">
                            <Image
                                src={imageUrl}
                                alt="Ảnh đại diện bài viết"
                                fill
                                className="object-cover"
                                unoptimized={imageUrl.startsWith('http')}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-bold text-slate-500 block mb-1">
                                Đường dẫn ảnh:
                            </span>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 bg-white"
                                placeholder="Tự động hoặc dán URL tùy thích"
                            />
                        </div>
                    </div>
                </div>

                {/* Mô tả ngắn */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Mô tả tóm tắt (Hiển thị ngoài trang danh sách & SEO)
                    </label>
                    <textarea
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Đoạn tóm tắt ngắn 1–2 câu thu hút học viên đọc bài viết..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 outline-none transition"
                    />
                </div>

                {/* 3. NỘI DUNG VÀ TỰ ĐỘNG CHUẨN HÓA WORD -> H1, H2, H3 */}
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <div>
                            <label className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                <span>📄</span> 3. Nội dung bài viết (Tự động giải mã font & sửa H1, H2, H3 từ Word)
                            </label>
                            <span className="text-[11px] text-slate-500">
                                Dán (Ctrl+V) trực tiếp từ Word: chữ có dấu, pinyin và các mục số 1., 2., 7., 8. sẽ tự thành tiêu đề đẹp!
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleFormatNow}
                                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                                title="Bấm để quét và sửa lại toàn bộ chữ có dấu, gạch đầu dòng và tiêu đề H2, H3"
                            >
                                <span>🪄</span> Chuẩn hóa H1, H2, H3 từ Word
                            </button>

                            <div className="inline-flex rounded-xl bg-slate-100 p-0.5 text-xs font-bold">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('edit')}
                                    className={`px-3 py-1 rounded-lg transition ${
                                        activeTab === 'edit'
                                            ? 'bg-white text-slate-900 shadow-2xs'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    ✍️ Soạn thảo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-3 py-1 rounded-lg transition ${
                                        activeTab === 'preview'
                                            ? 'bg-white text-slate-900 shadow-2xs'
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    👁️ Xem trước
                                </button>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'edit' ? (
                        <div className="relative">
                            <textarea
                                required
                                rows={18}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onPaste={handleContentPaste}
                                placeholder="Hãy dán (Ctrl+V) nội dung copy từ file Word của bạn vào đây.&#10;&#10;Hệ thống sẽ tự động:&#10;1. Giải mã toàn bộ font tiếng Việt và Pinyin (loại bỏ sạch sẽ các mã &#299;, &#7843;...)&#10;2. Biến các mục số 1., 2., 7., 8. thành tiêu đề H3 (###)&#10;3. Biến các dấu chấm đầu dòng thành gạch đầu dòng danh sách Markdown chuẩn"
                                className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none font-mono text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white transition"
                            />
                        </div>
                    ) : (
                        <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white min-h-[360px] prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed overflow-y-auto">
                            {content ? (
                                content.split('\n\n').map((block: string, idx: number) => {
                                    const trimmed = block.trim();
                                    if (trimmed.startsWith('# ')) {
                                        return <h1 key={idx} className="text-2xl font-black text-slate-900 border-b pb-2 mt-4 mb-2">{trimmed.replace(/^#\s+/, '')}</h1>;
                                    }
                                    if (trimmed.startsWith('## ')) {
                                        return <h2 key={idx} className="text-xl font-extrabold text-slate-900 border-b pb-1.5 mt-5 mb-2 text-rose-700">{trimmed.replace(/^##\s+/, '')}</h2>;
                                    }
                                    if (trimmed.startsWith('### ')) {
                                        return <h3 key={idx} className="text-base font-bold text-slate-900 mt-4 mb-1.5 text-indigo-700 border-l-4 border-indigo-500 pl-2.5 bg-indigo-50/50 py-1 rounded-r-lg">{trimmed.replace(/^###\s+/, '')}</h3>;
                                    }
                                    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                                        const items = trimmed.split('\n');
                                        return (
                                            <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                                                {items.map((it: string, i: number) => <li key={i}>{it.replace(/^[-*]\s+/, '')}</li>)}
                                            </ul>
                                        );
                                    }
                                    return <p key={idx} className="my-2 text-slate-700">{trimmed}</p>;
                                })
                            ) : (
                                <div className="text-center text-slate-400 py-12">
                                    Chưa có nội dung để xem trước. Hãy chuyển sang tab &quot;Soạn thảo&quot; và dán nội dung từ Word vào.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Nút lưu xuất bản */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                        Bài viết sau khi đăng sẽ tự động lưu và hiển thị trực tiếp tại trang blog <strong>/bai-viet</strong>.
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg hover:scale-102 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Đang xuất bản...' : '🚀 Xuất Bản Bài Viết'}
                    </button>
                </div>
            </form>
        </main>
    );
}
