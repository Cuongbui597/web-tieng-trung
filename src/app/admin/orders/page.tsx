export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import { ensureDbReady, sql } from '@/lib/db';

function formatVnd(n: unknown) {
    return `${Number(n || 0).toLocaleString('vi-VN')} đ`;
}

function normalizeJson<T>(v: unknown, fallback: T): T {
    if (v == null) return fallback;
    if (typeof v === 'string') {
        try {
            return JSON.parse(v);
        } catch {
            return fallback;
        }
    }
    return v as T;
}

interface AdminOrdersPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
    const resolvedParams = await searchParams;
    const q = resolvedParams?.q || '';

    let orders: any[] = [];
    let dbError = '';

    try {
        await ensureDbReady();

        // Search query logic
        if (q) {
            const searchPattern = `%${q}%`;
            const result = await sql`
        select id, created_at, order_id, name, phone, total, payment, address, note, subtotal, shipping, items
        from orders
        where 
          name ilike ${searchPattern} OR 
          phone ilike ${searchPattern} OR 
          order_id ilike ${searchPattern} OR
          email ilike ${searchPattern}
        order by created_at desc
        limit 50
      `;
            orders = result.rows || [];
        } else {
            // Default list (recent 50)
            const result = await sql`
        select id, created_at, order_id, name, phone, total, payment, address, note, subtotal, shipping, items
        from orders
        order by created_at desc
        limit 50
      `;
            orders = result.rows || [];
        }
    } catch (err: any) {
        dbError = err.message || String(err);
    }

    return (
        <main className="mx-auto max-w-[1600px] px-4 py-10 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <Link href="/admin" className="text-sm text-gray-500 hover:underline">
                        &larr; Admin Dashboard
                    </Link>
                    <h1 className="text-2xl font-semibold mt-2">Tra cứu đơn hàng</h1>
                    <p className="text-sm opacity-80">
                        Tìm kiếm theo Mã đơn, Tên, hoặc Số điện thoại.
                    </p>
                </div>
            </header>

            {/* Search Form */}
            <section className="bg-white p-4 rounded-xl border shadow-sm">
                <form method="GET" action="/admin/orders" className="flex gap-2">
                    <input
                        name="q"
                        defaultValue={q}
                        type="text"
                        placeholder="Nhập SĐT, Tên KH, hoặc Mã đơn..."
                        className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition"
                    >
                        Tìm kiếm
                    </button>
                    {q && (
                        <Link
                            href="/admin/orders"
                            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 flex items-center"
                        >
                            Xóa lọc
                        </Link>
                    )}
                </form>
            </section>

            {dbError ? (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                    Lỗi: {dbError}
                </div>
            ) : null}

            <div className="rounded-xl border overflow-hidden bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="py-3 px-4 text-left">Ngày đặt</th>
                                <th className="py-3 px-4 text-left">Mã đơn</th>
                                <th className="py-3 px-4 text-left">Khách hàng</th>
                                <th className="py-3 px-4 text-left">Liên hệ</th>
                                <th className="py-3 px-4 text-left">Tổng tiền</th>
                                <th className="py-3 px-4 text-left">Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center opacity-60">
                                        {q ? `Không tìm thấy đơn hàng nào khớp với "${q}"` : 'Chưa có đơn hàng nào.'}
                                    </td>
                                </tr>
                            ) : (
                                orders.map((o) => {
                                    const items = normalizeJson<any[]>(o.items, []);
                                    return (
                                        <tr key={o.id} className="hover:bg-gray-50/50">
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                {new Date(o.created_at).toLocaleString('vi-VN')}
                                            </td>
                                            <td className="py-3 px-4 font-mono font-medium text-blue-600">
                                                {o.order_id}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{o.name}</div>
                                                <div className="text-xs text-gray-500">{o.address}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium">{o.phone}</div>
                                                <div className="text-xs text-gray-500">{o.payment === 'cod' ? 'COD' : 'CK'}</div>
                                            </td>
                                            <td className="py-3 px-4 font-medium">
                                                {formatVnd(o.total)}
                                            </td>
                                            <td className="py-3 px-4 min-w-[300px]">
                                                <details className="cursor-pointer group">
                                                    <summary className="text-blue-600 hover:underline select-none list-none flex items-center gap-1">
                                                        <span className="group-open:rotate-90 transition-transform">▸</span> Xem {items.length} SP
                                                    </summary>
                                                    <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-100">
                                                        {items.map((it, i) => (
                                                            <div key={i} className="text-xs">
                                                                <span className="font-medium">{it.quantity}x</span> {it.name || it.title || 'Sản phẩm'}
                                                            </div>
                                                        ))}
                                                        {o.note && (
                                                            <div className="text-xs italic text-gray-500 mt-1">
                                                                Note: {o.note}
                                                            </div>
                                                        )}
                                                    </div>
                                                </details>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
