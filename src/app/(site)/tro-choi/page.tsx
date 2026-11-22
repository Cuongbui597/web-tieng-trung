import { Suspense } from 'react';
import { Metadata } from 'next';
import GameHubClient from './GameHubClient';

export const metadata: Metadata = {
    title: 'Đấu Trường Trò Chơi Tiếng Trung | Từ Vựng & Bậc Thầy Ghép Câu | HSK Việt',
    description: 'Trung tâm game học tiếng Trung tương tác: Từ vựng tan biến 60s và Bậc thầy ghép câu thực chiến (Buổi 1 & Buổi 2). Luyện phản xạ từ vựng, câu chữ 把, lượng từ và bổ ngữ.',
    keywords: ['game tiếng trung', 'ghép câu tiếng trung', 'bậc thầy ghép câu', 'luyện phản xạ từ vựng', 'game hsk', 'học tiếng trung qua trò chơi'],
    openGraph: {
        title: 'Đấu Trường Trò Chơi Tiếng Trung - HSK Việt',
        description: 'Luyện phản xạ từ vựng và câu giao tiếp thực chiến qua trò chơi tương tác sinh động.',
        url: 'https://tiengtrunghsk.vn/tro-choi',
        type: 'website',
    },
};

export default function TroChoiPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin text-3xl">🎮</div>
            </div>
        }>
            <GameHubClient />
        </Suspense>
    );
}
