'use client';

import { useState, FormEvent } from 'react';
import { createBulkPrices, deletePrice, updatePrice } from '@/lib/prices';
import { PlantPrice } from '@/lib/types';
import { formatPrice } from '@/lib/format';

interface PriceManagementProps {
    initialPrices: PlantPrice[];
}

interface Variant {
    root_diameter: string;
    height: string;
    price: string;
    key: number;
}

export default function PriceManagement({ initialPrices }: PriceManagementProps) {
    // Force recompile to pick up new server action
    const [prices, setPrices] = useState<PlantPrice[]>(initialPrices);
    const [loading, setLoading] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<PlantPrice>>({});

    // Form states
    const [name, setName] = useState('');
    // Variants: array of { root_diameter, height, price, key }
    const [variants, setVariants] = useState<Variant[]>([{ root_diameter: '', height: '', price: '', key: Date.now() }]);

    function handleAddVariant() {
        setVariants([...variants, { root_diameter: '', height: '', price: '', key: Date.now() + Math.random() }]);
    }

    function handleRemoveVariant(index: number) {
        if (variants.length === 1) return;
        setVariants(variants.filter((_, i) => i !== index));
    }

    function updateVariant(index: number, field: keyof Variant, value: string) {
        const newVariants = [...variants];
        (newVariants[index] as any)[field] = value;
        setVariants(newVariants);
    }

    async function handleAdd(e: FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await createBulkPrices(name, variants.map(v => ({
            root_diameter: v.root_diameter,
            height: v.height,
            price: Number(v.price)
        })));

        if (res?.success) {
            window.location.reload();
        } else {
            alert('Có lỗi xảy ra khi thêm giá');
        }
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('Bạn có chắc muốn xóa dòng này?')) return;

        const res = await deletePrice(id);
        if (res?.success) {
            // Optimistic update
            setPrices(prev => prev.filter(p => p.id !== id));
        } else {
            alert('Xóa thất bại');
        }
    }

    function startEdit(item: PlantPrice) {
        setEditingId(item.id);
        setEditForm({ ...item });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm({});
    }

    async function handleSaveEdit() {
        if (!editForm.name || !editForm.price) {
            alert('Vui lòng nhập tên và giá');
            return;
        }

        const res = await updatePrice(editingId!, {
            name: editForm.name || '', // Should be guaranteed by check above
            price: Number(editForm.price),
            height: editForm.height || '',
            root_diameter: editForm.root_diameter || ''
        });

        if (res?.success) {
            // Update local state
            setPrices(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as PlantPrice : p));
            setEditingId(null);
        } else {
            alert('Cập nhật thất bại');
        }
    }

    return (
        <div>
            {/* Add New Form - Bulk Entry */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Thêm Báo Giá Mới (Nhập nhiều kích thước)</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-sm font-medium text-gray-600">Tên Cây (Chung cho các kích thước bên dưới)</label>
                        <input
                            type="text"
                            required
                            className="input input-bordered w-full"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Ví dụ: Cây Bàng"
                        />
                    </div>

                    <div className="border-t pt-4">
                        <div className="text-sm font-medium text-gray-600 mb-2">Danh sách kích thước & giá</div>
                        {variants.map((variant, index) => (
                            <div key={variant.key} className="flex flex-wrap md:flex-nowrap gap-2 items-end mb-3">
                                <div className="w-full md:w-1/4">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full input-sm"
                                        value={variant.root_diameter}
                                        onChange={e => updateVariant(index, 'root_diameter', e.target.value)}
                                        placeholder="ĐK gốc (VD: 10cm)"
                                    />
                                </div>
                                <div className="w-full md:w-1/4">
                                    <input
                                        type="text"
                                        className="input input-bordered w-full input-sm"
                                        value={variant.height}
                                        onChange={e => updateVariant(index, 'height', e.target.value)}
                                        placeholder="Chiều cao (VD: 1.5m)"
                                    />
                                </div>
                                <div className="w-full md:w-1/4">
                                    <input
                                        type="number"
                                        required
                                        className="input input-bordered w-full input-sm"
                                        value={variant.price}
                                        onChange={e => updateVariant(index, 'price', e.target.value)}
                                        placeholder="Đơn giá (VNĐ)"
                                    />
                                </div>
                                <div className="w-auto">
                                    {variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveVariant(index)}
                                            className="btn btn-ghost btn-xs text-red-500"
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={handleAddVariant}
                            className="btn btn-outline btn-sm"
                        >
                            + Thêm kích thước
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-sm text-white"
                        >
                            {loading ? 'Đang lưu...' : 'Lưu tất cả'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4 font-semibold text-gray-700">Tên Cây</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Đường kính gốc</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Chiều cao</th>
                            <th className="py-3 px-4 font-semibold text-gray-700">Đơn giá</th>
                            <th className="py-3 px-4 font-semibold text-gray-700 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {prices.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    Chưa có dữ liệu báo giá nào.
                                </td>
                            </tr>
                        ) : (
                            prices.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    {editingId === item.id ? (
                                        <>
                                            <td className="py-3 px-4">
                                                <input
                                                    className="input input-bordered input-sm w-full"
                                                    value={editForm.name}
                                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <input
                                                    className="input input-bordered input-sm w-full"
                                                    value={editForm.root_diameter || ''}
                                                    onChange={e => setEditForm({ ...editForm, root_diameter: e.target.value })}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <input
                                                    className="input input-bordered input-sm w-full"
                                                    value={editForm.height || ''}
                                                    onChange={e => setEditForm({ ...editForm, height: e.target.value })}
                                                />
                                            </td>
                                            <td className="py-3 px-4">
                                                <input
                                                    type="number"
                                                    className="input input-bordered input-sm w-full"
                                                    value={editForm.price}
                                                    onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="py-3 px-4 font-medium">{item.name}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.root_diameter || '-'}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.height || '-'}</td>
                                            <td className="py-3 px-4 text-red-600 font-bold">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => startEdit(item)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
