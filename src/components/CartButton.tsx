'use client';

import { useMemo, useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
    const { getTotalItems, setIsOpen } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalItems = useMemo(() => {
        try {
            return getTotalItems();
        } catch {
            return 0;
        }
    }, [getTotalItems]);

    return (
        <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost px-3 py-2 sm:btn-secondary sm:px-4 sm:py-3 inline-flex items-center gap-2"
            aria-label="Mở giỏ hàng"
            type="button"
            suppressHydrationWarning
        >
            Giỏ hàng
            {mounted && totalItems > 0 && (
                <span className="badge-gradient">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
