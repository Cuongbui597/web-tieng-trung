'use client';

import { useState, FormEvent, ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { convertWordToMarkdown, getRandomArticleImage, RANDOM_ARTICLE_IMAGES } from '@/lib/wordFormatter';

export default function EditArticleForm({ article }: { article: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState(article.image || getRandomArticleImage());
    const [title, setTitle] = useState(article.title || '');
    const [content, setContent] = useState(article.content || '');
    const [description, setDescription] = useState(article.description || '');
    const [author, setAuthor] = useState(article.author || 'Cô Lê Nguyễn Hồng Yên');
    const [date, setDate] = useState(article.date || new Date().toISOString().split('T')[0]);
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [wordNotice, setWordNotice] = useState<string | null>(null);

    // Đổi ảnh ngẫu nhiên khác
    function handlePickRandomImage() {
        let nextImg = getRandomArticleImage();
        while (nextImg === imageUrl && RANDOM_ARTICLE_IMAGES.length > 1) {
            nextImg = getRandomArticleImage();
        }
        setImageUrl(nextImg);
    }

    // Tự động chuẩn hóa khi dán từ Word
    function handleContentPaste(e: ClipboardEvent<HTMLTextAreaElement>) {
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');

        const inputToConvert = html || text;
        if (!inputToConvert) return;

        if (html || /^(?:I|II|III|IV|V|\d+\.\d+|Phần|Chương|Bài)/m.test(text)) {
            e.preventDefault();
            const { content: formatted, detectedTitle } = convertWordToMarkdown(inputToConvert);

            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newContent = content.substring(0, start) + formatted + content.substring(end);
            setContent(newContent);

            if (!title && detectedTitle) {
                setTitle(detectedTitle);
            }

            setWordNotice('✨ Đã tự động nhận diện và chuẩn hóa các đề mục H1, H2, H3 từ Word!');
            setTimeout(() => setWordNotice(null), 4000);
        }
    }

    // Nút thủ công: Chuẩn hóa nội dung hiện tại
    function handleFormatNow() {
        if (!content.trim()) {
            alert('Chưa có nội dung để chuẩn hóa.');
            return;
        }
        const { content: formatted, detectedTitle } = convertWordToMarkdown(content);
        setContent(formatted);
        if (!title && detectedTitle) {
            setTitle(detectedTitle);
        }
        setWordNotice('✨ Đã chuẩn hóa toàn bộ nội dung thành H1, H2, H3 chuẩn SEO!');
        setTimeout(() => setWordNotice(null), 4000);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!title.trim()) {
            setError('Tiêu đề không được để trống');
            setLoading(false);
            return;
        }

        const finalImage = imageUrl.trim() || getRandomArticleImage();

        const data = {
            title: title.trim(),
            author: author.trim() || 'Cô Lê Nguyễn Hồng Yên',
            date: date,
            image: finalImage,
            description: description.trim() || title.trim(),
            content: content.trim(),
            tags: ['tiếng trung', 'hsk', 'kinh nghiệm học'],
        };

        try {
            const res = await fetch(`/api/articles/${article.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Có lỗi xảy ra khi lưu bài viết');
            }

            alert('Đã cập nhật bài viết thành công!');
            router.push('/admin/articles');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.')) {
            return;
        }

        setDeleting(true);
        try {
            const res = await fetch(`/api/articles/${article.slug}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Lỗi khi xóa bài viết');
            }

            alert('Đã xóa bài viết thành công!');
            router.push('/admin/articles');
            router.refresh();
        } catch (err: any) {
            alert('Lỗi: ' + err.message);
            setDeleting(false);
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
                        Chỉnh Sửa Bài Viết
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                    >
                        {deleting ? 'Đang xóa...' : '🗑️ Xóa bài'}
                    </button>
                    <Link
                        href={`/bai-viet/${article.slug}`}
                        target="_blank"
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                    >
                        Xem bài thực tế ↗
                    </Link>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl">
                    ⚠️ {error}
                </div>
            )}

            {wordNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2">
                    <span>{wordNotice}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                {/* 1. Ô ĐẶT TIÊU ĐỀ */}
                <div className="space-y-2">
                    <label className="block text-sm font-extrabold text-slate-900">
                        1. Tiêu đề bài viết <span className="text-rose-600">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề bài viết..."
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none text-base sm:text-lg font-bold text-slate-900 transition"
                    />
                </div>

                {/* Slug & Tác giả & Ngày */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Đường dẫn URL (Cố định)
                        </label>
                        <input
                            type="text"
                            disabled
                            value={article.slug}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono bg-slate-100 text-slate-500 cursor-not-allowed"
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
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:border-rose-500 outline-none transition"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Ngày xuất bản
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:border-rose-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* 2. HÌNH ẢNH ĐẠI DIỆN */}
                <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                <span>🖼️</span> 2. Ảnh bài viết
                            </label>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                                Tự động hoặc chọn ngẫu nhiên từ kho ảnh bài viết chất lượng cao.
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 outline-none transition"
                    />
                </div>

                {/* 3. NỘI DUNG VÀ WORD FORMATTER */}
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <div>
                            <label className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                                <span>📄</span> 3. Nội dung bài viết (Tự sửa định dạng H1, H2, H3 từ Word)
                            </label>
                            <span className="text-[11px] text-slate-500">
                                Dán (Ctrl+V) từ Word để tự động chuẩn hóa các mục thành H1, H2, H3.
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleFormatNow}
                                className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                                title="Bấm để quét và chuẩn hóa toàn bộ nội dung thành H1, H2, H3"
                            >
                                <span>🪄</span> Chuẩn hóa H1, H2, H3
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
                        <textarea
                            required
                            rows={16}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onPaste={handleContentPaste}
                            className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none font-mono text-sm leading-relaxed text-slate-800 bg-slate-50/50 focus:bg-white transition"
                        />
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
                                        return <h3 key={idx} className="text-base font-bold text-slate-800 mt-4 mb-1.5 text-indigo-700">{trimmed.replace(/^###\s+/, '')}</h3>;
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
                                    Chưa có nội dung để xem trước.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Nút lưu */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href="/admin/articles"
                        className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                        Hủy thay đổi
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg hover:scale-102 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Đang lưu...' : '💾 Cập Nhật Bài Viết'}
                    </button>
                </div>
            </form>
        </main>
    );
}
