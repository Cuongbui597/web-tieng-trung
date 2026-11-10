'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
    title?: string; // key for backward compatibility
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (slug: string) => void;
    updateQuantity: (slug: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const normalizeQuantity = (value: any): number => {
        const numeric = Number(value);
        if (!Number.isFinite(numeric)) return 1;
        return Math.max(1, Math.floor(numeric));
    };

    const normalizeCartItem = (raw: any): CartItem | null => {
        if (!raw || typeof raw !== 'object') return null;
        const slug = raw.slug != null ? String(raw.slug) : '';
        if (!slug) return null;

        const name = raw.name != null ? String(raw.name) : (raw.title != null ? String(raw.title) : '');

        return {
            slug,
            name,
            title: name,
            price: Number(raw.price) || 0,
            image: raw.image != null ? String(raw.image) : '',
            category: raw.category != null ? String(raw.category) : '',
            quantity: normalizeQuantity(raw.quantity),
        };
    };

    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const savedCart = window.localStorage.getItem('cart');
            if (!savedCart) return [];
            const parsed = JSON.parse(savedCart);
            if (!Array.isArray(parsed)) return [];
            return parsed.map(normalizeCartItem).filter((item): item is CartItem => item !== null);
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);

    const parsePriceToNumber = (price: any): number => {
        if (price == null) return 0;
        if (typeof price === 'number' && Number.isFinite(price)) return price;
        const asString = String(price);
        const digits = asString.replace(/[^0-9]/g, '');
        return Number(digits || 0);
    };

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            if (typeof window === 'undefined') return;
            window.localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    const addToCart = (product: any) => {
        const normalized = normalizeCartItem({ ...product, quantity: 1 });
        if (!normalized) return;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.slug === normalized.slug);

            if (existingItem) {
                return prevCart.map(item =>
                    item.slug === normalized.slug
                        ? { ...item, quantity: normalizeQuantity(item.quantity) + 1 }
                        : item
                );
            }

            return [...prevCart, normalized];
        });
        setIsOpen(true);
    };

    const removeFromCart = (slug: string) => {
        setCart(prevCart => prevCart.filter(item => item.slug !== slug));
    };

    const updateQuantity = (slug: string, quantity: number) => {
        const nextQuantity = Number(quantity);
        if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
            removeFromCart(slug);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.slug === slug ? { ...item, quantity: normalizeQuantity(nextQuantity) } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            const price = parsePriceToNumber(item.price);
            const quantity = item.quantity || 0;
            return total + (price * quantity);
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
                isOpen,
                setIsOpen
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
