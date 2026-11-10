export interface Contact {
    id: number;
    created_at: Date;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    ip?: string;
    user_agent?: string;
}

export interface OrderItem {
    id: string; // or number
    name: string;
    price: number;
    quantity: number;
    slug: string;
    image?: string;
}

export interface Order {
    id: number;
    created_at: Date;
    order_id: string;
    name: string;
    phone: string;
    address: string;
    note?: string;
    payment: string;
    subtotal: number;
    shipping: number;
    total: number;
    items: OrderItem[];
    ip?: string;
}

export interface Lesson {
    id: number;
    created_at: Date;
    slug: string;
    name: string;
    price: number;
    description?: string;
    images?: string;
    category?: string;
    in_stock: boolean;
    sort_order?: number;
    original_price?: number;
    duration?: string;
    hsk_level?: string;
    vocab_count?: number;
    gallery?: string[];
    pinyin?: string;
    hanzi?: string;
    // Backward compatibility fields for any remaining components
    height?: string;
    light?: string;
    water?: string;
    root_diameter?: string;
    pot_specification?: string;
    crown_width?: string;
}

// Backward compatibility alias:
export type Product = Lesson;

export interface CoursePrice {
    id: number;
    created_at: Date;
    name: string;
    duration?: string;
    sessions?: number;
    price: number;
    root_diameter?: string;
    height?: string;
}

export type PlantPrice = CoursePrice;
