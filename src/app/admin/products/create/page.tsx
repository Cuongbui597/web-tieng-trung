'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CATEGORY_ITEMS } from '@/lib/constants';

export default function CreateProductPage() {
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
            name: formData.get('name'),
            slug: formData.get('slug'),
            price: parseInt(formData.get('price') as string),
            category: formData.get('category'),
            images: formData.get('images'), // Store URL string directly for now
            description: formData.get('description'),
            sort_order: parseInt(formData.get('sort_order') as string || '0'),
            original_price: parseInt(formData.get('original_price') as string || '0'),
            height: formData.get('height'),
            light: formData.get('light'),
            water: formData.get('water'),
            root_diameter: formData.get('root_diameter'),
            pot_specification: formData.get('pot_specification'),
            crown_width: formData.get('crown_width'),
            gallery: (formData.get('gallery') as string || '').split('\n').map(s => s.trim()).filter(Boolean),
        };

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Có lỗi xảy ra');
            }

            alert('Đã thêm sản phẩm thành công!');
            router.push('/admin/products');
            router.refresh(); // Refresh server components
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Auto-generate slug from name
    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;
        const slug = name
            .toLowerCase()
            .normalize('NFD') // Decompose combined graphemes into combination of simple ones
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
            .trim()
            .replace(/\s+/g, '-');

        // Only set slug if the user hasn't manually edited it (simplification: just set it)
        const slugInput = document.getElementById('slug') as HTMLInputElement;
        if (slugInput) slugInput.value = slug;
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-10 space-y-6">
            <header>
                <Link href="/admin/products" className="text-sm text-gray-500 hover:underline">
                    &larr; Quay lại danh sách
                </Link>
                <h1 className="text-2xl font-semibold mt-2">Thêm sản phẩm mới</h1>
            </header>

            {error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-white shadow-sm">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Tên sản phẩm</label>
                    <input
                        name="name"
                        required
                        type="text"
                        onChange={handleNameChange}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ví dụ: Cây Bàng Singapore"
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
                            placeholder="cay-bang-singapore"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Giá (VNĐ)</label>
                        <input
                            name="price"
                            required
                            type="number"
                            min="0"
                            step="1000"
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="150000"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Giá gốc / Giá niêm yết (VNĐ)</label>
                        <input
                            name="original_price"
                            type="number"
                            min="0"
                            step="1000"
                            placeholder="Để trống nếu không có KM"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Chiều cao (Ví dụ: 1.2m)</label>
                        <input
                            name="height"
                            type="text"
                            placeholder="Cao 80cm - 1m"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Ánh sáng</label>
                        <input
                            name="light"
                            type="text"
                            placeholder="Ưa sáng / Bóng râm"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Tưới nước</label>
                        <input
                            name="water"
                            type="text"
                            placeholder="2-3 lần/tuần"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường kính gốc (Cây công trình)</label>
                        <input
                            name="root_diameter"
                            type="text"
                            placeholder="VD: 10-12cm"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Quy cách chậu (Cây nội thất)</label>
                        <input
                            name="pot_specification"
                            type="text"
                            placeholder="VD: Chậu sứ trắng H40"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường kính tán (Cây sân vườn)</label>
                        <input
                            name="crown_width"
                            type="text"
                            placeholder="VD: Tán rộng 1.5m"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Danh mục</label>
                    <select
                        name="category"
                        required
                        className="w-full border rounded-lg px-3 py-2 bg-white"
                    >
                        {CATEGORY_ITEMS.map((cat) => (
                            <option key={cat.value} value={cat.label}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Thứ tự ưu tiên (Lớn xếp trước, mặc định 0)</label>
                    <input
                        name="sort_order"
                        type="number"
                        defaultValue="0"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Ảnh sản phẩm (URL)</label>
                    <input
                        name="images"
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        type="url"
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="https://drive.google.com/file/d/..."
                    />
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs text-gray-500 block mb-2">Xem trước ảnh:</span>
                        {imageUrl ? (
                            <div className="relative w-full max-w-xs aspect-square border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full object-contain"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                />
                            </div>
                        ) : (
                            <div className="w-full max-w-xs aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs">Chưa có ảnh</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Thư viện ảnh (Mỗi dòng 1 link ảnh)</label>
                    <textarea
                        name="gallery"
                        rows={5}
                        className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                        placeholder={'https://example.com/img1.jpg\nhttps://example.com/img2.jpg'}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Mô tả chi tiết</label>
                    <textarea
                        name="description"
                        rows={5}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Mô tả về cây, cách chăm sóc..."
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                    >
                        {loading ? 'Đang xử lý...' : 'Tạo sản phẩm'}
                    </button>
                </div>
            </form>
        </main >
    );
}
