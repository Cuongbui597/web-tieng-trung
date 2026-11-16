import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { name: '📝 Danh sách bài viết', href: '/admin/articles' },
        { name: '➕ Viết bài mới', href: '/admin/articles/create' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-6">
                            <Link href="/admin/articles" className="flex items-center gap-2 group">
                                <span className="text-2xl">🏮</span>
                                <div>
                                    <div className="text-base font-extrabold text-rose-700 leading-tight group-hover:text-rose-800 transition">
                                        HSK Việt Admin
                                    </div>
                                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                                        Hệ Thống Quản Trị Bài Viết
                                    </div>
                                </div>
                            </Link>

                            <div className="hidden sm:flex sm:space-x-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-slate-700 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/articles/create"
                                className="hidden md:inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition hover:scale-102 active:scale-98"
                            >
                                <span>➕</span> Viết Bài Mới
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                            >
                                <span>🌐</span> Về Website ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
