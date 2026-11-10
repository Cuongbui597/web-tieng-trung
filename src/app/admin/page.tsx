export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { ensureDbReady, sql } from '@/lib/server';

function toInt(v: unknown, fallback: number): number {
    const n = Number.parseInt(String(v ?? ''), 10);
    return Number.isFinite(n) ? n : fallback;
}

function formatVnd(n: unknown): string {
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

function formatError(err: unknown): string {
    if (!err) return '';
    if (err instanceof Error) {
        const anyErr = err as any;
        const code = anyErr.code;
        return code ? `${err.name} (${code}): ${err.message}` : err.message;
    }
    if (typeof err === 'object') {
        const anyErr = err as any;
        const code = typeof anyErr.code === 'string' ? anyErr.code : '';
        const message = typeof anyErr.message === 'string' ? anyErr.message : '';
        if (code || message) return code ? `${code}: ${message}` : message;
        try {
            return JSON.stringify(err);
        } catch {
            return String(err);
        }
    }
    return String(err);
}

interface AdminPageProps {
    searchParams: Promise<{ limit?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
    let dbError = '';
    let contacts: any[] = [];
    let orders: any[] = [];
    let stats = { contacts24h: 0, orders24h: 0 };

    const resolvedParams = await searchParams;
    const limit = Math.max(1, Math.min(200, toInt(resolvedParams?.limit, 20)));

    try {
        await ensureDbReady();
        const [ordersRes, statsRes] = await Promise.all([
            sql`
        select id, created_at, order_id, name, phone, total, payment, address, note, subtotal, shipping, items
        from orders
        order by created_at desc
        limit ${limit};
      `,
            sql`
        select
          (select count(*)::int from orders where created_at >= now() - interval '24 hours') as orders_24h;
      `,
        ]);

        orders = ordersRes.rows || [];
        stats = {
            ...stats,
            orders24h: statsRes.rows?.[0]?.orders_24h ?? 0,
        };
    } catch (err) {
        dbError = formatError(err);
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold">Admin</h1>
                <p className="text-sm opacity-80">
                    Quản lý dữ liệu đơn hàng.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                    <a
                        href="/admin/products"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                        📦 Quản lý sản phẩm
                    </a>
                    <a
                        href="/admin/products/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                    >
                        ➕ Thêm sản phẩm mới
                    </a>
                    <a
                        href="/admin/prices"
                        className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
                    >
                        💲 Quản lý báo giá
                    </a>
                    <a
                        href="/admin/orders"
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
                    >
                        🔍 Tra cứu đơn hàng
                    </a>
                    <a
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 transition"
                    >
                        🌐 Xem trang web
                    </a>
                </div>
            </header>

            {!dbError ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border p-4 bg-gray-50">
                        <div className="text-sm opacity-70">Chào mừng trở lại!</div>
                        <div className="text-sm font-medium">Hệ thống hoạt động bình thường.</div>
                    </div>
                    <div className="rounded-xl border p-4">
                        <div className="text-sm opacity-70">Đơn hàng (24h)</div>
                        <div className="text-2xl font-semibold">{stats.orders24h}</div>
                    </div>
                </section>
            ) : null}

            {dbError ? (
                <section className="rounded-xl border p-5 space-y-2">
                    <h2 className="text-lg font-semibold">Lỗi kết nối DB</h2>
                    <p className="text-sm text-red-600 break-words">{dbError}</p>
                    <p className="text-sm opacity-80">
                        Bạn cần cấu hình biến môi trường Postgres (trên Vercel: Storage → Postgres).
                    </p>
                </section>
            ) : null}

            <section className="rounded-xl border p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold">Đơn hàng gần đây</h2>
                    <div className="text-xs opacity-70">Hiển thị {Math.min(limit, 200)} bản ghi</div>
                </div>
                {orders.length === 0 ? (
                    <p className="text-sm opacity-80">Chưa có đơn hàng nào.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left opacity-80">
                                <tr>
                                    <th className="py-2 pr-3">Thời gian</th>
                                    <th className="py-2 pr-3">Mã đơn</th>
                                    <th className="py-2 pr-3">Tên</th>
                                    <th className="py-2 pr-3">SĐT</th>
                                    <th className="py-2 pr-3">Thanh toán</th>
                                    <th className="py-2 pr-3">Tổng</th>
                                    <th className="py-2 pr-3">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o, idx) => {
                                    const items = normalizeJson<any[]>(o.items, []);
                                    const itemsCount = Array.isArray(items)
                                        ? items.reduce((sum, it) => sum + (Number(it?.quantity) || 0), 0)
                                        : 0;

                                    return (
                                        <tr key={idx} className="border-t">
                                            <td className="py-2 pr-3 whitespace-nowrap">{new Date(o.created_at).toLocaleString('vi-VN')}</td>
                                            <td className="py-2 pr-3 whitespace-nowrap">{o.order_id}</td>
                                            <td className="py-2 pr-3 whitespace-nowrap">{o.name}</td>
                                            <td className="py-2 pr-3 whitespace-nowrap">{o.phone}</td>
                                            <td className="py-2 pr-3 whitespace-nowrap">
                                                {o.payment === 'transfer' ? 'Chuyển khoản' : 'COD'}
                                            </td>
                                            <td className="py-2 pr-3 whitespace-nowrap">{formatVnd(o.total)}</td>
                                            <td className="py-2 pr-3 min-w-[320px]">
                                                <details className="cursor-pointer">
                                                    <summary className="text-blue-700 hover:underline">Xem ({itemsCount} SP)</summary>
                                                    <div className="mt-2 space-y-3">
                                                        <div>
                                                            <div className="text-xs opacity-70">Địa chỉ</div>
                                                            <pre className="whitespace-pre-wrap text-sm">{o.address}</pre>
                                                        </div>
                                                        {o.note ? (
                                                            <div>
                                                                <div className="text-xs opacity-70">Ghi chú</div>
                                                                <pre className="whitespace-pre-wrap text-sm">{o.note}</pre>
                                                            </div>
                                                        ) : null}
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                            <div className="rounded-lg border p-2">
                                                                <div className="text-xs opacity-70">Tạm tính</div>
                                                                <div className="font-medium">{formatVnd(o.subtotal)}</div>
                                                            </div>
                                                            <div className="rounded-lg border p-2">
                                                                <div className="text-xs opacity-70">Ship</div>
                                                                <div className="font-medium">{formatVnd(o.shipping)}</div>
                                                            </div>
                                                            <div className="rounded-lg border p-2">
                                                                <div className="text-xs opacity-70">Tổng</div>
                                                                <div className="font-medium">{formatVnd(o.total)}</div>
                                                            </div>
                                                        </div>
                                                        {Array.isArray(items) && items.length ? (
                                                            <div>
                                                                <div className="text-xs opacity-70 mb-1">Sản phẩm</div>
                                                                <div className="space-y-1">
                                                                    {items.map((it, i) => (
                                                                        <div key={i} className="flex items-start justify-between gap-3 rounded-lg border p-2">
                                                                            <div className="min-w-0">
                                                                                <div className="font-medium break-words">{it?.name || it?.title || 'Sản phẩm'}</div>
                                                                                <div className="text-xs opacity-70">
                                                                                    SL: {Number(it?.quantity) || 0} • Đơn giá: {formatVnd(it?.price)}
                                                                                </div>
                                                                            </div>
                                                                            {/* lineTotal is not standard in items, calculate it if needed or use price * qty */}
                                                                            <div className="whitespace-nowrap font-medium">{formatVnd((Number(it?.price) || 0) * (Number(it?.quantity) || 0))}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </details>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
