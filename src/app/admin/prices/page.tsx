import { getPrices } from '@/lib/prices';
import PriceManagement from './PriceManagement';

export const metadata = {
    title: 'Quản Lý Bảng Giá | Admin',
};

export default async function AdminPricesPage() {
    const prices = await getPrices();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Quản Lý Bảng Giá Cây Cảnh</h1>
            <PriceManagement initialPrices={prices} />
        </div>
    );
}
