'use client';

import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Product } from '../lib/db';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);

        // Reset animation after a short delay
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`btn btn-primary w-full ${isAdding ? 'scale-[0.98]' : ''}`}
            aria-label={`Thêm ${product.name || 'sản phẩm'} vào giỏ hàng`} // changed product.title to product.name based on db.ts Product interface, but need to check if ProductCard passes title or name. db.ts says name.
            aria-pressed={isAdding}
        >
            <span aria-hidden="true">{isAdding ? 'Đã thêm' : 'Thêm vào giỏ'}</span>
        </button>
    );
}
