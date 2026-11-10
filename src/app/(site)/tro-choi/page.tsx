import { Metadata } from 'next';
import GameClient from './GameClient';

export const metadata: Metadata = {
    title: 'Game Luyện Phản Xạ Từ Vựng Tiếng Trung | HSK Việt',
    description: 'Mini game luyện phản xạ từ vựng tiếng Trung HSK 1-3, công xưởng và trẻ em. Gõ nghĩa tiếng Việt để làm tan biến từ vựng và ghi điểm combo.',
    keywords: ['game tiếng trung', 'luyện phản xạ từ vựng', 'game hsk', 'học tiếng trung qua trò chơi'],
    openGraph: {
        title: 'Game Luyện Phản Xạ Từ Vựng Tiếng Trung - HSK Việt',
        description: 'Chữ Hán xuất hiện, gõ nghĩa tiếng Việt để làm tan biến từ vựng trước khi hết giờ!',
        url: 'https://tiengtrunghsk.vn/tro-choi',
        type: 'website',
    },
};

export default function TroChoiPage() {
    return <GameClient />;
}
