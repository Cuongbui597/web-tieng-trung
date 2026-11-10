import { ReactNode } from 'react';
import HeaderServer from '@/components/HeaderServer';
import Footer from '@/components/Footer';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import BackToTopButton from '@/components/BackToTopButton';

export default function CoursesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <HeaderServer />
            <main>{children}</main>
            <Footer />
            <FloatingContactButtons />
            <BackToTopButton />
        </>
    );
}
