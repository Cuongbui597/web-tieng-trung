import HeaderServer from '@/components/HeaderServer';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import BackToTopButton from '@/components/BackToTopButton';
import CartProviderWrapper from '@/providers/CartProviderWrapper';
import { ReactNode } from 'react';

export default function ShopLayout({ children }: { children: ReactNode }) {
    return (
        <CartProviderWrapper>
            <HeaderServer />
            <Cart />
            <BackToTopButton />
            <FloatingContactButtons />
            <main className="min-h-screen flex-1">{children}</main>
            <Footer />
        </CartProviderWrapper>
    );
}
