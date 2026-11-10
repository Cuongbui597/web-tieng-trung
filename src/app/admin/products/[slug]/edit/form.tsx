'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CATEGORY_ITEMS } from '@/lib/constants';

interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    category: string;
    images?: string;
    description?: string;
    in_stock: boolean;
    created_at: string;
    // New fields
    sort_order?: number;
    original_price?: number;
    height?: string;
    light?: string;
    water?: string;
    root_diameter?: string;
    pot_specification?: string;
    crown_width?: string;
    gallery?: string[]; // stored as JSON string in DB, but as array here if parsed
}

interface EditProductFormProps {
    product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Initial state for controlled inputs or UI toggles
    const [inStock, setInStock] = useState(product.in_stock);
    const [imageUrl, setImageUrl] = useState(product.images || '');
    // Gallery is complex, for now we can just use a textarea for comma separate URLs or JSON
    const [galleryStr, setGalleryStr] = useState(Array.isArray(product.gallery) ? product.gallery.join('\n') : '');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const rawPrice = formData.get('price');
        const price = parseInt(rawPrice as string);

        if (isNaN(price) || price < 0) {
            setError('Giá sản phẩm không hợp lệ');
            setLoading(false);
            return;
        }

        // Parse gallery
        const galleryList = galleryStr.split('\n').map(s => s.trim()).filter(Boolean);

        const data = {
            name: formData.get('name'),
            price: price,
            category: formData.get('category'),
            images: imageUrl,
            description: formData.get('description'),
            in_stock: inStock,
            sort_order: parseInt(formData.get('sort_order') as string || '0'),
            original_price: parseInt(formData.get('original_price') as string || '0'),
            height: formData.get('height'),
            light: formData.get('light'),
            water: formData.get('water'),
            root_diameter: formData.get('root_diameter'),
            pot_specification: formData.get('pot_specification'),
            crown_width: formData.get('crown_width'),
            gallery: galleryList,
        };

        try {
            const res = await fetch(`/api/products/${product.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Có lỗi xảy ra');
            }

            // Show success modal and redirect after delay
            setShowSuccess(true);
            setTimeout(() => {
                router.push('/admin/products');
                router.refresh();
            }, 2000);
        } catch (err: any) {
            setError(err.message);
            setLoading(false); // Only set loading to false on error
        }
        // Note: We don't set loading(false) on success to prevent UI flicker before redirect
    }

    async function handleDelete() {
        if (!confirm('Bạn có chắc chắn muốn XÓA sản phẩm này? Hành động này không thể hoàn tác!')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/products/${product.slug}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Xóa thất bại');

            router.push('/admin/products');
            router.refresh();
        } catch (err: any) {
            alert(err.message);
            setLoading(false);
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    return (
        <main className="mx-auto max-w-2xl px-4 py-10 space-y-6 relative">
            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Thành công!</h3>
                        <p className="text-gray-500">Đã cập nhật sản phẩm.</p>
                        <p className="text-xs text-gray-400 mt-4">Đang chuyển trang...</p>
                    </div>
                </div>
            )}

            <header className="flex items-center justify-between">
                <div>
                    <Link href="/admin/products" className="text-sm text-gray-500 hover:underline">
                        &larr; Quay lại danh sách
                    </Link>
                    <h1 className="text-2xl font-semibold mt-2">Sửa sản phẩm: {product.name}</h1>
                </div>
                <button
                    onClick={handleDelete}
                    type="button"
                    className="text-red-600 hover:bg-red-50 px-3 py-1 rounded border border-red-200 text-sm"
                >
                    Xóa sản phẩm
                </button>
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
                        defaultValue={product.name}
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường dẫn (Slug)</label>
                        <input
                            disabled
                            value={product.slug}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400">Không thể sửa đường dẫn</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Giá bán (VNĐ)</label>
                        <input
                            name="price"
                            required
                            defaultValue={product.price}
                            type="number"
                            min="0"
                            step="1000"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Giá gốc / Giá niêm yết (VNĐ)</label>
                        <input
                            name="original_price"
                            defaultValue={product.original_price || ''}
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
                            defaultValue={product.height || ''}
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
                            defaultValue={product.light || ''}
                            type="text"
                            placeholder="Ưa sáng / Bóng râm"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Tưới nước</label>
                        <input
                            name="water"
                            defaultValue={product.water || ''}
                            type="text"
                            placeholder="2-3 lần/tuần"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường kính gốc (Cây công trình)</label>
                        <input
                            name="root_diameter"
                            defaultValue={product.root_diameter || ''}
                            type="text"
                            placeholder="VD: 10-12cm"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Quy cách chậu (Cây nội thất)</label>
                        <input
                            name="pot_specification"
                            defaultValue={product.pot_specification || ''}
                            type="text"
                            placeholder="VD: Chậu sứ trắng H40"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Đường kính tán (Cây sân vườn)</label>
                        <input
                            name="crown_width"
                            defaultValue={product.crown_width || ''}
                            type="text"
                            placeholder="VD: Tán rộng 1.5m"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                </div>




                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Danh mục</label>
                        <select
                            name="category"
                            required
                            defaultValue={product.category}
                            className="w-full border rounded-lg px-3 py-2 bg-white"
                        >
                            {CATEGORY_ITEMS.map(cat => (
                                <option key={cat.value} value={cat.label}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Trạng thái</label>
                        <div className="flex items-center gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="instock_opt"
                                    checked={inStock}
                                    onChange={() => setInStock(true)}
                                />
                                <span className="text-sm">Còn hàng</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="instock_opt"
                                    checked={!inStock}
                                    onChange={() => setInStock(false)}
                                />
                                <span className="text-sm">Hết hàng</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Thứ tự ưu tiên (Lớn xếp trước)</label>
                    <input
                        name="sort_order"
                        type="number"
                        defaultValue={(product as any).sort_order || 0}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">Ảnh sản phẩm (URL)</label>
                    </div>
                    <input
                        name="images"
                        required
                        value={imageUrl}
                        onChange={handleImageChange}
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
                        value={galleryStr}
                        onChange={(e) => setGalleryStr(e.target.value)}
                        rows={5}
                        className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                        placeholder={'https://example.com/img1.jpg\nhttps://example.com/img2.jpg'}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">Mô tả chi tiết (Markdown)</label>
                    <textarea
                        name="description"
                        rows={10}
                        defaultValue={product.description}
                        className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                    ></textarea>
                    <p className="text-xs text-gray-500">
                        Hỗ trợ viết theo định dạng Markdown.
                    </p>
                </div>

                <div className="pt-4 flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                    >
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <Link
                        href="/admin/products"
                        className="px-6 py-2.5 rounded-lg border hover:bg-gray-50 text-gray-700 font-medium"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </main>
    );
}
