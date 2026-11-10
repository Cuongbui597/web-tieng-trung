'use client';

import { useMemo, useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/db';

function formatVnd(value: number) {
    try {
        return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
    } catch {
        return `${value}đ`;
    }
}

interface CheckoutForm {
    name: string;
    phone: string;
    address: string;
    note: string;
    payment: string;
}

export default function CheckoutPage() {
    const { cart, getTotalPrice, clearCart } = useCart();

    const [form, setForm] = useState<CheckoutForm>({
        name: '',
        phone: '',
        address: '',
        note: '',
        payment: 'cod',
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [orderId, setOrderId] = useState('');

    const total = useMemo(() => {
        try {
            return getTotalPrice();
        } catch {
            return 0;
        }
    }, [getTotalPrice]);

    const itemCount = useMemo(() => cart.reduce((sum, i) => sum + (i.quantity || 0), 0), [cart]);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const canSubmit = form.name.trim() && form.phone.trim() && form.address.trim() && cart.length > 0;

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: form,
                    items: cart,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.error || 'Không thể tạo đơn hàng');
            }

            const data = await response.json().catch(() => ({}));
            setOrderId(String(data?.orderId || ''));
            clearCart();
            setSubmitted(true);
        } catch (error: any) {
            setSubmitError(error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--bg)]">
            <div className="container-app py-10 md:py-14">
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text)] tracking-tight">Thanh toán</h1>
                        <p className="text-[var(--muted)] mt-2">Xác nhận thông tin giao hàng và hoàn tất đơn.</p>
                    </div>
                    <Link href="/cua-hang" className="btn btn-secondary">Tiếp tục mua sắm</Link>
                </div>

                {submitted ? (
                    <div className="card p-8">
                        <div className="flex items-start gap-3">
                            <span className="text-[color:rgba(20,102,68,1)] text-2xl">✓</span>
                            <div>
                                <p className="text-lg font-semibold text-[var(--text)]">Đã ghi nhận đơn hàng</p>
                                <p className="text-[var(--muted)] mt-1">Bên mình sẽ liên hệ xác nhận trong ít phút.</p>
                                {orderId ? (
                                    <p className="text-sm text-[var(--muted)] mt-2">Mã đơn: <span className="font-semibold text-[var(--text)]">{orderId}</span></p>
                                ) : null}
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link href="/" className="btn btn-primary">Về trang chủ</Link>
                                    <Link href="/lien-he" className="btn btn-secondary">Liên hệ hỗ trợ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form */}
                        <section className="lg:col-span-2 card p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-[var(--text)]">Thông tin giao hàng</h2>
                            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--text)] mb-2" htmlFor="name">Họ tên</label>
                                        <input id="name" name="name" className="input" value={form.name} onChange={onChange} placeholder="Nguyễn Văn A" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--text)] mb-2" htmlFor="phone">Số điện thoại</label>
                                        <input id="phone" name="phone" className="input" value={form.phone} onChange={onChange} placeholder="0xxxxxxxxx" inputMode="tel" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--text)] mb-2" htmlFor="address">Địa chỉ</label>
                                    <input id="address" name="address" className="input" value={form.address} onChange={onChange} placeholder="Số nhà, đường, phường/xã, quận/huyện" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--text)] mb-2" htmlFor="note">Ghi chú</label>
                                    <textarea
                                        id="note"
                                        name="note"
                                        value={form.note}
                                        onChange={onChange}
                                        rows={4}
                                        className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-white/90 px-4 py-3 text-sm text-[var(--text)]"
                                        placeholder="Ví dụ: giao giờ hành chính, gọi trước 10 phút..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--text)] mb-2">Thanh toán</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <label className="card-hover border border-[var(--border)] rounded-[var(--radius-md)] p-4 bg-white/70 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={form.payment === 'cod'}
                                                onChange={onChange}
                                                className="mr-2"
                                            />
                                            <span className="text-sm font-semibold text-[var(--text)]">COD</span>
                                            <p className="text-sm text-[var(--muted)] mt-1">Thanh toán khi nhận hàng</p>
                                        </label>
                                        <label className="card-hover border border-[var(--border)] rounded-[var(--radius-md)] p-4 bg-white/70 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="transfer"
                                                checked={form.payment === 'transfer'}
                                                onChange={onChange}
                                                className="mr-2"
                                            />
                                            <span className="text-sm font-semibold text-[var(--text)]">Chuyển khoản</span>
                                            <p className="text-sm text-[var(--muted)] mt-1">Nhận thông tin sau khi xác nhận</p>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-2 flex flex-wrap gap-3">
                                    <button
                                        type="submit"
                                        className={`btn btn-primary ${!canSubmit || isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        disabled={!canSubmit || isSubmitting}
                                        aria-busy={isSubmitting}
                                    >
                                        {isSubmitting ? 'Đang đặt hàng...' : 'Đặt hàng'}
                                    </button>
                                    <Link href="/cua-hang" className="btn btn-secondary">Quay lại cửa hàng</Link>
                                </div>

                                {submitError ? (
                                    <p className="text-sm text-red-700">{submitError}</p>
                                ) : null}

                                {!canSubmit && (
                                    <p className="text-sm text-[var(--muted)]">
                                        Vui lòng nhập đầy đủ họ tên, số điện thoại, địa chỉ và chọn ít nhất 1 sản phẩm.
                                    </p>
                                )}
                            </form>
                        </section>

                        {/* Summary */}
                        <aside className="card p-6 md:p-8 lg:sticky lg:top-24 h-fit">
                            <h2 className="text-xl font-semibold text-[var(--text)]">Đơn hàng</h2>
                            <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="text-[var(--muted)]">Sản phẩm</span>
                                <span className="font-semibold text-[var(--text)]">{itemCount}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-[var(--muted)]">Tạm tính</span>
                                <span className="font-semibold text-[var(--text)]">{formatVnd(total)}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-[var(--muted)]">Phí vận chuyển</span>
                                <span className="font-semibold text-[var(--text)]">{cart.length ? 'Miễn phí' : '—'}</span>
                            </div>
                            <div className="h-px bg-[var(--border)] my-5" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-[var(--text)]">Tổng cộng</span>
                                <span className="text-lg font-semibold text-[var(--text)]">{formatVnd(total)}</span>
                            </div>

                            <div className="mt-6">
                                {cart.length === 0 ? (
                                    <p className="text-sm text-[var(--muted)]">Giỏ hàng đang trống. Thêm sản phẩm để thanh toán.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {cart.slice(0, 4).map((item) => (
                                            <li key={item.slug} className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-[var(--text)] truncate">{item.name || item.title}</p>
                                                    <p className="text-xs text-[var(--muted)]">SL: {item.quantity}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-[var(--text)] whitespace-nowrap">{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {cart.length > 4 ? (
                                    <p className="mt-3 text-xs text-[var(--muted)]">+ {cart.length - 4} sản phẩm khác</p>
                                ) : null}
                            </div>

                            <div className="mt-8">
                                <Link href="/chinh-sach" className="text-sm font-semibold link-accent">
                                    Xem chính sách mua hàng
                                </Link>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}
