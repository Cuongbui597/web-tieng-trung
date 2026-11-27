import { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
    title: 'Đấu Trường Trò Chơi Tiếng Trung | HSK & May Mặc | HSK Việt',
    description: 'Ứng dụng học tiếng Trung tương tác: Từ vựng tan biến và Bậc thầy ghép câu. Luyện phản xạ từ vựng, câu chữ 把, lượng từ và giao tiếp công xưởng.',
};

export default function GameLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-dvh flex flex-col bg-slate-50 text-slate-900 overscroll-none touch-manipulation antialiased selection:bg-rose-500 selection:text-white">
            {children}
        </div>
    );
}
