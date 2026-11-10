'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateArticlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title'),
            slug: formData.get('slug'),
            author: formData.get('author'),
            date: formData.get('date') || new Date().toISOString().split('T')[0],
            image: formData.get('image'),
            description: formData.get('description'),
            content: formData.get('content'),
            tags: (formData.get('tags') as string || '').split(',').map(s => s.trim()).filter(Boolean),
        };

        try {
            const res = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Có lỗi xảy ra');
            }

            alert('Đã thêm bài viết thành công!');
            router.push('/admin/articles');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Auto-generate slug from title
    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;
        const slug = title
            .toLowerCase()
            .normalize('NFD') // Decompose combined graphemes into combination of simple ones
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
            .trim()
            .replace(/\s+/g, '-');

        const slugInput = document.getElementById('slug') as HTMLInputElement;
        if (slugInput) slugInput.value = slug;
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
            <header>
                <Link href="/admin/articles" className="text-sm text-gray-500 hover:underline">
                    &larr; Quay lại danh sách
                </Link>
                <h1 className="text-2xl font-semibold mt-2">Thêm bài viết mới</h1>
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
                        onChange={handleTitleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ví dụ: Cách chăm sóc Cây Kim Tiền"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường dẫn (Slug)</label>
                        <input
                            id="slug"
                            name="slug"
                            required
                            type="text"
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                            placeholder="cach-cham-soc-cay-kim-tien"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Ngày xuất bản</label>
                        <input
                            name="date"
                            type="date"
                            defaultValue={new Date().toISOString().split('T')[0]}
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
                            defaultValue="Admin"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Tags (cách nhau bởi dấu phẩy)</label>
                        <input
                            name="tags"
                            type="text"
                            placeholder="cây cảnh, phong thủy, chăm sóc"
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
                        placeholder="https://example.com/image.jpg"
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
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
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Đoạn mô tả ngắn hiển thị bên ngoài trang chủ..."
                    ></textarea>
                </div>
                
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Nội dung chi tiết (Markdown)</label>
                    <textarea
                        name="content"
                        rows={12}
                        className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                        placeholder="## Tiêu đề phụ&#10;&#10;Viết nội dung bài viết ở đây..."
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                    >
                        {loading ? 'Đang xử lý...' : 'Tạo bài viết'}
                    </button>
                </div>
            </form>
        </main>
    );
}
