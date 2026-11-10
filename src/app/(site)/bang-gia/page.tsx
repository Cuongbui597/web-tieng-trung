import { getPrices } from '@/lib/prices';
import PriceListClient from './PriceListClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bảng Giá Cây Cảnh | Cập Nhật Mới Nhất 2026',
    description: 'Tra cứu bảng giá cây cảnh, cây công trình, cây sân vườn chi tiết. Cập nhật liên tục, giá tốt nhất thị trường.',
};

export default async function PriceListPage() {
    const prices = await getPrices();

    return (
        <div className="bg-[var(--bg)] min-h-screen py-8 md:py-12">
            <div className="max-w-4xl mx-auto px-4">
                <header className="mb-8 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-[family:var(--font-serif)] font-bold text-[var(--text)] mb-4">
                        Bảng Giá Cây Cảnh
                    </h1>
                    <p className="text-[var(--muted)] max-w-2xl mx-auto">
                        Bảng giá tham khảo chi tiết cho các loại cây cảnh, cây công trình.
                        Giá có thể thay đổi tùy theo số lượng và chi phí vận chuyển.
                        <br className="hidden md:block" />
                        Vui lòng liên hệ hotline để nhận báo giá chính xác nhất.
                    </p>
                </header>

                <PriceListClient initialPrices={prices} />
            </div>
        </div>
    );
}
