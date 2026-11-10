'use client';

import { useCart, CartItem } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import { useState } from 'react';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, isOpen, setIsOpen } = useCart();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/45 z-50"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-[var(--surface)] shadow-2xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                    <h2 className="text-xl font-[family:var(--font-serif)] font-semibold text-[var(--text)]">Giỏ hàng</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn-ghost px-3 py-2 text-sm"
                        aria-label="Đóng giỏ hàng"
                    >
                        Đóng
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-[var(--text)] text-lg font-semibold mb-2">Giỏ hàng đang trống</p>
                            <p className="text-[var(--muted)] mb-6">Hãy chọn vài sản phẩm để bắt đầu.</p>
                            <Link
                                href="/cua-hang"
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-semibold link-accent"
                            >
                                Xem sản phẩm
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item: CartItem) => (
                                <div key={item.slug} className="flex gap-4 p-4 border border-[var(--border)] rounded-[var(--radius-lg)] bg-[color:rgba(255,255,255,0.70)]">
                                    <div className="relative w-20 h-20 flex-shrink-0 bg-[var(--surface-2)] rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]">
                                        {item.image && !item.image.includes('drive.google.com') ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name || item.title || 'Sản phẩm'}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs font-medium text-[var(--muted)]">
                                                Ảnh
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-[var(--text)] truncate">{item.name || item.title}</h3>
                                        <p className="text-sm text-[var(--muted)] mb-2">{formatPrice(item.price)}</p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded-full text-sm hover:bg-[color:rgba(45,90,39,0.10)]"
                                                aria-label="Giảm số lượng"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded-full text-sm hover:bg-[color:rgba(45,90,39,0.10)]"
                                                aria-label="Tăng số lượng"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.slug)}
                                                className="ml-auto text-red-600 hover:text-red-700 text-sm"
                                                aria-label="Xóa sản phẩm"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-[var(--border)] p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-[var(--text)]">Tổng cộng:</span>
                            <span className="text-xl font-semibold text-[var(--text)]">
                                {formatPrice(getTotalPrice())}
                            </span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => setIsOpen(false)}
                            className="btn btn-primary w-full"
                        >
                            Thanh Toán
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn btn-secondary w-full"
                        >
                            Tiếp Tục Mua Sắm
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
