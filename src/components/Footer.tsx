import Link from 'next/link';
import { SITE_NAME, SITE_PHONE, SITE_EMAIL, SITE_ADDRESS, SITE_HOURS } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="relative z-10 bg-white/20 backdrop-blur-lg text-[var(--text)] pt-16 pb-10 border-t border-white/20 mt-16">
            <div className="container-app">
                {/* Main footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company info */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-7 h-7 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center text-sm font-bold">
                                汉
                            </span>
                            <p className="font-[family:var(--font-serif)] font-bold text-lg text-[var(--text)] tracking-tight">
                                Tiếng Trung HSK Việt
                            </p>
                        </div>
                        <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                            Trung tâm đào tạo tiếng Trung thực chiến tại Đà Nẵng. Luyện thi HSK 1→3, tiếng Trung công xưởng - doanh nghiệp và lớp tiếng Trung thiếu nhi.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge">HSK 1-3 Chuẩn Quốc Tế</span>
                            <span className="badge">Lớp Nhỏ Tương Tác</span>
                            <span className="badge">Giáo Viên Nhiệt Huyết</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-[family:var(--font-serif)] text-[var(--text)] font-semibold mb-3 text-sm tracking-tight">Điều hướng</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-[var(--muted)] hover:text-[var(--text)] transition text-sm">Trang chủ</Link></li>
                            <li><Link href="/khoa-hoc" className="text-[var(--muted)] hover:text-[var(--text)] transition text-sm">Các khóa học</Link></li>
                            <li><Link href="/hoc-phi" className="text-[var(--muted)] hover:text-[var(--text)] transition text-sm">Bảng học phí</Link></li>
                            <li><Link href="/dang-ky" className="text-[var(--muted)] hover:text-[var(--text)] transition text-sm">Đăng ký học thử</Link></li>
                            <li><Link href="/bai-viet" className="text-[var(--muted)] hover:text-[var(--text)] transition text-sm">Góc học tập & Blog</Link></li>
                            <li><Link href="/gioi-thieu" className="text-[var(--muted)] hover:text-[var(--text)] transition text-sm">Về trung tâm</Link></li>
                        </ul>
                    </div>

                    {/* Khóa học tiêu biểu */}
                    <div>
                        <h4 className="font-[family:var(--font-serif)] text-[var(--text)] font-semibold mb-3 text-sm tracking-tight">Chương trình học</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/khoa-hoc/hsk-1" className="text-[var(--muted)] hover:text-[var(--text)] transition">Khóa học HSK 1 (Sơ cấp)</Link></li>
                            <li><Link href="/khoa-hoc/hsk-2" className="text-[var(--muted)] hover:text-[var(--text)] transition">Khóa học HSK 2 (Cơ bản)</Link></li>
                            <li><Link href="/khoa-hoc/hsk-3" className="text-[var(--muted)] hover:text-[var(--text)] transition">Khóa học HSK 3 (Trung cấp)</Link></li>
                            <li><Link href="/khoa-hoc/cong-xuong" className="text-[var(--muted)] hover:text-[var(--text)] transition">Tiếng Trung Công xưởng / Nhà máy</Link></li>
                            <li><Link href="/khoa-hoc/cong-ty" className="text-[var(--muted)] hover:text-[var(--text)] transition">Tiếng Trung Văn phòng / Doanh nghiệp</Link></li>
                            <li><Link href="/tre-em" className="text-[var(--muted)] hover:text-[var(--text)] transition">Tiếng Trung Trẻ em (5 - 12 tuổi)</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-[family:var(--font-serif)] text-[var(--text)] font-semibold mb-3 text-sm tracking-tight">Liên hệ</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="text-[var(--muted)]">📍 {SITE_ADDRESS}</li>
                            <li className="text-[var(--muted)]">📞 <a href={`tel:${SITE_PHONE}`} className="hover:text-[var(--text)]">{SITE_PHONE}</a></li>
                            <li className="text-[var(--muted)]">✉️ <a href={`mailto:${SITE_EMAIL}`} className="hover:text-[var(--text)]">{SITE_EMAIL}</a></li>
                            <li className="text-[var(--muted)]">⏰ Giờ làm việc: {SITE_HOURS}</li>
                        </ul>
                    </div>
                </div>

                {/* Social Section */}
                <div className="border-t border-[var(--border)] py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex gap-5 text-sm">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--muted)] hover:text-[var(--text)] transition"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--muted)] hover:text-[var(--text)] transition"
                            >
                                YouTube
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--muted)] hover:text-[var(--text)] transition"
                            >
                                TikTok Học Tiếng Trung
                            </a>
                        </div>
                        <Link href="/dang-ky" className="text-sm font-semibold link-accent">
                            Đăng ký nhận lộ trình học miễn phí →
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--border)] pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[var(--muted)] text-xs">
                            © 2026 {SITE_NAME}. Bảo lưu mọi quyền.
                        </p>
                        <div className="flex gap-6 text-xs">
                            <Link href="/chinh-sach" className="text-[var(--muted)] hover:text-[var(--text)] transition">Chính sách đào tạo</Link>
                            <Link href="/hoc-phi" className="text-[var(--muted)] hover:text-[var(--text)] transition">Học phí & Ưu đãi</Link>
                            <Link href="/lien-he" className="text-[var(--muted)] hover:text-[var(--text)] transition">Tư vấn tuyển sinh</Link>
                            <Link href="/sitemap.xml" className="text-[var(--muted)] hover:text-[var(--text)] transition">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
