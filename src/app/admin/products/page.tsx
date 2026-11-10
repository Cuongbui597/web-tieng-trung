export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import { ensureDbReady, sql } from '@/lib/db';
import { formatPrice } from '@/lib/format';

interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    original_price?: number;
    category: string;
    in_stock: boolean;
    created_at: string;
}

export default async function AdminProductsPage() {
    let products: Product[] = [];
    let dbError = '';

    try {
        await ensureDbReady();
        const result = await sql`
      select id, slug, name, price, original_price, category, in_stock, created_at
      from products
      order by sort_order desc, created_at desc
    `;
        products = (result.rows || []) as Product[];
    } catch (err: any) {
        dbError = err.message || String(err);
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
                    <p className="text-sm opacity-80">Danh sách sản phẩm từ Database</p>
                </div>
                <Link
                    href="/admin/products/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Thêm sản phẩm
                </Link>
            </header>

            {dbError ? (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                    Lỗi: {dbError}
                </div>
            ) : null}

            <div className="rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="py-3 px-4 text-left">Tên sản phẩm</th>
                                <th className="py-3 px-4 text-left">Giá</th>
                                <th className="py-3 px-4 text-left">Danh mục</th>
                                <th className="py-3 px-4 text-left">Trạng thái</th>
                                <th className="py-3 px-4 text-left">Ngày tạo</th>
                                <th className="py-3 px-4 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center opacity-60">
                                        Chưa có sản phẩm nào trong database.<br />
                                        (Các sản phẩm cũ từ file .md không hiển thị ở đây)
                                    </td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50/50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{p.name}</div>
                                            <div className="text-xs text-gray-500">/{p.slug}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium">{formatPrice(p.price)}</div>
                                            {p.original_price && p.original_price > p.price && (
                                                <div className="text-xs text-gray-400 line-through">
                                                    {formatPrice(p.original_price)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${p.in_stock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {p.in_stock ? 'Còn hàng' : 'Hết hàng'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap text-sm">
                                            {new Date(p.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/admin/products/${p.slug}/edit`}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                                            >
                                                Sửa / Chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
