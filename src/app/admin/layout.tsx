import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Sản phẩm', href: '/admin/products' },
        { name: 'Bảng giá', href: '/admin/prices' },
        { name: 'Đơn hàng', href: '/admin/orders' },
        { name: 'Bài viết', href: '/admin/articles' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/admin" className="text-xl font-bold text-blue-600">
                                    Admin Panel
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Mobile menu button could go here */}
                            <Link
                                href="/"
                                target="_blank"
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Về Website ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}
