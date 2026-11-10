'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/format';
import { PlantPrice } from '@/lib/db';

interface PriceListClientProps {
    initialPrices: PlantPrice[];
}

export default function PriceListClient({ initialPrices }: PriceListClientProps) {
    // Component for searching and displaying prices
    const [searchTerm, setSearchTerm] = useState('');

    // Filter prices based on search term. 
    // If no search term, return just 5 samples
    // If no search term, return all initial prices
    const filteredPrices = searchTerm ? initialPrices.filter((item) => {
        const term = searchTerm.toLowerCase();
        return (
            item.name.toLowerCase().includes(term) ||
            (item.root_diameter && item.root_diameter.toLowerCase().includes(term)) ||
            (item.height && item.height.toLowerCase().includes(term))
        );
    }) : initialPrices.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto md:mx-0">
                <input
                    type="text"
                    placeholder="Nhập tên cây để tra giá..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[var(--accent)] text-white">
                            <tr>
                                <th className="py-4 px-4 font-semibold whitespace-nowrap">Tên Cây</th>
                                <th className="py-4 px-4 font-semibold whitespace-nowrap">Đường kính gốc</th>
                                <th className="py-4 px-4 font-semibold whitespace-nowrap">Chiều cao</th>
                                <th className="py-4 px-4 font-semibold whitespace-nowrap text-right">Đơn giá</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPrices.length > 0 ? (
                                filteredPrices.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                    >
                                        <td className="py-3 px-4 font-medium text-[var(--accent-dark)]">{item.name}</td>
                                        <td className="py-3 px-4 text-gray-600">{item.root_diameter || '-'}</td>
                                        <td className="py-3 px-4 text-gray-600">{item.height || '-'}</td>
                                        <td className="py-3 px-4 text-right font-bold text-red-600 text-base">
                                            {formatPrice(item.price)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-[var(--muted)]">
                                        {searchTerm ? 'Không tìm thấy cây nào phù hợp.' : 'Vui lòng nhập tên cây để xem giá.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View Hint */}
                <div className="p-3 text-xs text-center text-[var(--muted)] md:hidden bg-gray-50 border-t">
                    Kéo sang trái để xem chi tiết giá
                </div>
            </div>
        </div>
    );
}
