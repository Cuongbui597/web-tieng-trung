import HeaderServer from '@/components/HeaderServer';
import Footer from '@/components/Footer';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import BackToTopButton from '@/components/BackToTopButton';
import LetterPopup from '@/components/LetterPopup';
import { ReactNode } from 'react';

interface SiteLayoutProps {
    children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
    return (
        <>
            <LetterPopup />
            <HeaderServer />
            <BackToTopButton />
            <FloatingContactButtons />
            <main className="min-h-screen flex-1">{children}</main>
            <Footer />
        </>
    );
}
