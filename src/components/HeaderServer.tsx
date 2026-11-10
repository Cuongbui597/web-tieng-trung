import Link from 'next/link';
import MobileMenuComponent from './MobileMenuComponent';
import SearchToggle from '@/components/header/SearchToggle';
import { SITE_NAME, SITE_PHONE } from '@/lib/constants';

export default function HeaderServer() {
    const phone = SITE_PHONE;

    const mobileCategories = [
        { label: '🎯 HSK 1 – Sơ Cấp', href: '/khoa-hoc/hsk-1' },
        { label: '📗 HSK 2 – Cơ Bản', href: '/khoa-hoc/hsk-2' },
        { label: '📘 HSK 3 – Trung Cấp', href: '/khoa-hoc/hsk-3' },
        { label: '🏭 Giao tiếp Công xưởng', href: '/khoa-hoc/cong-xuong' },
        { label: '🏢 Giao tiếp Công ty', href: '/khoa-hoc/cong-ty' },
        { label: '🎨 Tiếng Trung Trẻ em', href: '/tre-em' },
        { label: '🎮 Game Từ Vựng', href: '/tro-choi' },
    ];

    return (
        <header className="bg-[color:rgba(255,250,245,0.85)] border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-md">
            {/* Top bar */}
            <div className="hidden md:block bg-[color:rgba(255,255,255,0.65)] border-b border-[var(--border)]">
                <div className="container-app h-10 flex items-center justify-between">
                    <div className="flex items-center gap-6 text-xs text-[var(--muted)]">
                        <a href={`tel:${phone}`} className="hover:text-[var(--text)] transition font-medium" aria-label="Gọi hotline">
                            Hotline: {phone}
                        </a>
                        <span className="hidden lg:inline">Giờ học: 08:00 – 21:00</span>
                        <span className="hidden lg:inline">Đào tạo HSK 1→3, Giao tiếp thực chiến & Trẻ em</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <Link href="/chinh-sach" className="text-[var(--muted)] hover:text-[var(--text)] transition">
                            Chính sách
                        </Link>
                        <Link href="/lien-he" className="text-[var(--muted)] hover:text-[var(--text)] transition">
                            Liên hệ
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container-app">
                <div className="flex justify-between items-center h-16 gap-4">
                    <Link
                        href="/"
                        className="font-[family:var(--font-serif)] font-bold text-lg sm:text-xl tracking-tight hover:opacity-90 transition flex items-center gap-2"
                    >
                        <span className="w-8 h-8 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center text-base font-bold shadow-sm">
                            汉
                        </span>
                        <span className="text-gradient-accent">HSK Việt</span>
                        <span className="hidden sm:inline-flex badge-gradient text-xs">Đà Nẵng</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-2">
                        <Link href="/" prefetch={true} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-all px-3 py-2 rounded-md hover:bg-white/60">
                            Trang chủ
                        </Link>

                        {/* Dropdown Khóa học */}
                        <div className="relative group">
                            <Link href="/khoa-hoc" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-all px-3 py-2 rounded-md hover:bg-white/60 inline-flex items-center gap-1">
                                Khóa học
                                <svg className="w-3.5 h-3.5 text-[var(--muted)] group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>

                            <div className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] px-3 py-1">Luyện thi chứng chỉ</div>
                                <Link href="/khoa-hoc/hsk-1" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--earth-100)] transition">
                                    <span>🎯</span>
                                    <div>
                                        <div className="font-medium">HSK 1 – Sơ Cấp</div>
                                        <div className="text-xs text-[var(--muted)]">150 từ vựng & pinyin</div>
                                    </div>
                                </Link>
                                <Link href="/khoa-hoc/hsk-2" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--earth-100)] transition">
                                    <span>📗</span>
                                    <div>
                                        <div className="font-medium">HSK 2 – Cơ Bản</div>
                                        <div className="text-xs text-[var(--muted)]">300 từ & ngữ pháp đơn</div>
                                    </div>
                                </Link>
                                <Link href="/khoa-hoc/hsk-3" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--earth-100)] transition">
                                    <span>📘</span>
                                    <div>
                                        <div className="font-medium">HSK 3 – Trung Cấp</div>
                                        <div className="text-xs text-[var(--muted)]">600 từ & đọc viết trôi chảy</div>
                                    </div>
                                </Link>

                                <div className="border-t border-[var(--border)] my-1.5"></div>
                                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] px-3 py-1">Giao tiếp & Trẻ em</div>

                                <Link href="/khoa-hoc/cong-xuong" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--earth-100)] transition">
                                    <span>🏭</span>
                                    <div>
                                        <div className="font-medium">Giao tiếp Công xưởng</div>
                                        <div className="text-xs text-[var(--muted)]">Nhà máy, sản xuất, máy móc</div>
                                    </div>
                                </Link>
                                <Link href="/khoa-hoc/cong-ty" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--earth-100)] transition">
                                    <span>🏢</span>
                                    <div>
                                        <div className="font-medium">Giao tiếp Công ty</div>
                                        <div className="text-xs text-[var(--muted)]">Văn phòng, họp, email, báo cáo</div>
                                    </div>
                                </Link>
                                <Link href="/tre-em" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[var(--text)] hover:bg-[var(--earth-100)] transition">
                                    <span>🎨</span>
                                    <div>
                                        <div className="font-medium">Tiếng Trung Trẻ em</div>
                                        <div className="text-xs text-[var(--muted)]">Vui học qua bài hát, hình ảnh</div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <Link href="/hoc-phi" prefetch={true} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-all px-3 py-2 rounded-md hover:bg-white/60">
                            Học phí
                        </Link>
                        <Link href="/bai-viet" prefetch={true} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-all px-3 py-2 rounded-md hover:bg-white/60">
                            Kinh nghiệm học
                        </Link>
                        <Link href="/gioi-thieu" prefetch={true} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-all px-3 py-2 rounded-md hover:bg-white/60">
                            Giới thiệu
                        </Link>
                        <Link href="/tro-choi" prefetch={true} className="text-sm font-bold text-[var(--accent)] hover:opacity-80 transition-all px-3 py-2 rounded-md hover:bg-white/60 flex items-center gap-1.5 border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                            <span>🎮</span> Game Từ Vựng
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link href="/dang-ky" className="hidden sm:inline-flex btn btn-primary font-semibold shadow-sm hover:shadow transition-transform hover:-translate-y-0.5">
                            Đăng Ký Học Thử
                        </Link>

                        <div className="hidden lg:block">
                            <SearchToggle />
                        </div>

                        <MobileMenuComponent categories={mobileCategories} includePolicy />
                    </div>
                </div>
            </div>
        </header>
    );
}
