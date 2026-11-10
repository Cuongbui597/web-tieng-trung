'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditArticleForm({ article }: { article: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState(article.image || '');
    const [title, setTitle] = useState(article.title || '');
    const [slug, setSlug] = useState(article.slug || '');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title'),
            author: formData.get('author'),
            date: formData.get('date'),
            image: formData.get('image'),
            description: formData.get('description'),
            content: formData.get('content'),
            tags: (formData.get('tags') as string || '').split(',').map(s => s.trim()).filter(Boolean),
        };

        try {
            const res = await fetch(`/api/articles/${article.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Có lỗi xảy ra');
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
                throw new Error(json.error || 'Lỗi khi xóa');
            }

            alert('Đã xóa thành công!');
            router.push('/admin/articles');
            router.refresh();
        } catch (err: any) {
            alert('Lỗi: ' + err.message);
            setDeleting(false);
        }
    }

    // Convert stored JSON/array to string
    let defaultTags = '';
    if (Array.isArray(article.tags)) {
        defaultTags = article.tags.join(', ');
    } else if (typeof article.tags === 'string') {
        try {
            const parsed = JSON.parse(article.tags);
            if (Array.isArray(parsed)) defaultTags = parsed.join(', ');
        } catch {
            defaultTags = article.tags;
        }
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <Link href="/admin/articles" className="text-sm text-gray-500 hover:underline">
                        &larr; Quay lại danh sách
                    </Link>
                    <h1 className="text-2xl font-semibold mt-2">Sửa bài viết</h1>
                </div>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-2 border border-red-200 hover:bg-red-50 rounded-lg transition"
                >
                    {deleting ? 'Đang xóa...' : 'Xóa bài viết'}
                </button>
            </header>

            {error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-white shadow-sm">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Tiêu đề bài viết</label>
                    <input
                        name="title"
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường dẫn (Slug - Không thể sửa)</label>
                        <input
                            name="slug"
                            disabled
                            type="text"
                            value={slug}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Ngày xuất bản</label>
                        <input
                            name="date"
                            type="date"
                            defaultValue={article.date}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Tác giả</label>
                        <input
                            name="author"
                            type="text"
                            defaultValue={article.author}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Tags (cách nhau bởi dấu phẩy)</label>
                        <input
                            name="tags"
                            type="text"
                            defaultValue={defaultTags}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Ảnh đại diện (URL)</label>
                    <input
                        name="image"
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        type="url"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs text-gray-500 block mb-2">Xem trước ảnh:</span>
                        {imageUrl ? (
                            <div className="relative w-full max-w-xs aspect-video border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                />
                            </div>
                        ) : (
                            <div className="w-full max-w-xs aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                <span className="text-xs">Chưa có ảnh</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Mô tả ngắn (Description)</label>
                    <textarea
                        name="description"
                        rows={3}
                        defaultValue={article.description}
                        className="w-full border rounded-lg px-3 py-2"
                    ></textarea>
                </div>
                
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Nội dung chi tiết (Markdown)</label>
                    <textarea
                        name="content"
                        rows={12}
                        defaultValue={article.content}
                        className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                    >
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form>
        </main>
    );
}
