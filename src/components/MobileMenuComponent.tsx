"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Category {
    label: string;
    href: string;
}

interface MobileMenuProps {
    categories?: Category[];
    includePolicy?: boolean;
}

export default function MobileMenuComponent({ categories = [], includePolicy = true }: MobileMenuProps) {
    const pathname = usePathname();

    // Avoid setState-in-effect by tying "open" to the pathname it was opened on.
    // When navigation happens, pathname changes and the menu auto-closes (isOpen becomes false).
    const [openRequested, setOpenRequested] = useState(false);
    const [openPathname, setOpenPathname] = useState(pathname);
    const isOpen = openRequested && openPathname === pathname;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        if (isOpen) {
            setOpenRequested(false);
            return;
        }
        setOpenPathname(pathname);
        setOpenRequested(true);
    };

    const handleClose = () => setOpenRequested(false);

    return (
        <div className="lg:hidden">
            <button
                type="button"
                className={`list-none cursor-pointer btn btn-ghost px-3 py-2 ${mounted ? 'inline-flex items-center' : ''}`}
                aria-label="Mở menu"
                aria-expanded={isOpen}
                onClick={handleToggle}
                suppressHydrationWarning
            >
                Menu
            </button>

            {isOpen ? (
                <div className="fixed left-0 right-0 top-16 z-50 border-t border-[var(--border)] bg-[color:rgba(255,255,255,0.85)] backdrop-blur shadow-lg">
                    <div className="max-h-[calc(100vh-4rem)] overflow-auto">
                        <div className="container-app py-4 space-y-2">
                            <form action="/cua-hang" method="get">
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Tìm cây, danh mục..."
                                    className="input shadow-sm"
                                    aria-label="Tìm kiếm sản phẩm"
                                />
                            </form>

                            <div className="grid grid-cols-1 gap-1">
                                <Link
                                    href="/"
                                    className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                    onClick={handleClose}
                                >
                                    Trang chủ
                                </Link>

                                <div className="px-4 pt-2 pb-1 text-xs font-semibold text-[var(--muted)]">Danh mục</div>
                                {categories.map((c) => (
                                    <Link
                                        key={c.href}
                                        href={c.href}
                                        className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                        onClick={handleClose}
                                    >
                                        {c.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/dich-vu"
                                    className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                    onClick={handleClose}
                                >
                                    Dịch vụ
                                </Link>
                                <Link
                                    href="/bai-viet"
                                    className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                    onClick={handleClose}
                                >
                                    Bài viết
                                </Link>
                                {includePolicy ? (
                                    <Link
                                        href="/chinh-sach"
                                        className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                        onClick={handleClose}
                                    >
                                        Chính sách
                                    </Link>
                                ) : null}
                                <Link
                                    href="/gioi-thieu"
                                    className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                    onClick={handleClose}
                                >
                                    Giới thiệu
                                </Link>
                                <Link
                                    href="/bang-gia"
                                    className="block rounded-2xl px-4 py-2 font-semibold text-[var(--accent)] bg-[color:rgba(216,230,213,0.38)] hover:bg-[color:rgba(216,230,213,0.6)] transition"
                                    onClick={handleClose}
                                >
                                    Xem Bảng Giá
                                </Link>
                                <Link
                                    href="/lien-he"
                                    className="block rounded-2xl px-4 py-2 text-[var(--muted)] hover:bg-[color:rgba(216,230,213,0.38)] hover:text-[var(--text)] transition"
                                    onClick={handleClose}
                                >
                                    Liên hệ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
