import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_PHONE, SITE_ADDRESS, SITE_HOURS } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Đăng Ký Học Tiếng Trung',
    description: 'Đăng ký khóa học tiếng Trung HSK 1-3, giao tiếp công xưởng, công ty hoặc tiếng Trung trẻ em tại Đà Nẵng. Nhận 1 buổi học thử miễn phí.',
};

export default function DangKyPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="container-app max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <div className="inline-flex badge-gradient mb-3">Đăng Ký Nhanh · Tư Vấn Miễn Phí</div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] mb-4 tracking-tight">
                        Đăng Ký Khóa Học Tiếng Trung
                    </h1>
                    <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                        Điền thông tin bên dưới để đăng ký khóa học hoặc nhận 1 buổi học thử miễn phí. Chuyên viên tư vấn sẽ liên hệ lại với bạn trong vòng 24 giờ.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form column */}
                    <div className="lg:col-span-2">
                        <div className="card rounded-[2.5rem] p-8 sm:p-10 bg-white/35 backdrop-blur-xl border border-white/40 shadow-xl">
                            <form action="/api/contact" method="POST" className="space-y-6">
                                <input type="hidden" name="subject" value="Đăng ký khóa học tiếng Trung mới" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                            Họ và tên của bạn *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Ví dụ: Nguyễn Văn An"
                                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                            Số điện thoại / Zalo *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="Ví dụ: 0912 345 678"
                                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                            Email liên hệ
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="tenban@gmail.com"
                                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                            Khóa học quan tâm *
                                        </label>
                                        <select
                                            name="course"
                                            required
                                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm font-medium"
                                        >
                                            <option value="">-- Chọn khóa học --</option>
                                            <option value="HSK 1 - Sơ Cấp">🎯 HSK 1 – Sơ Cấp (150 từ vựng)</option>
                                            <option value="HSK 2 - Cơ Bản">📗 HSK 2 – Cơ Bản (300 từ vựng)</option>
                                            <option value="HSK 3 - Trung Cấp">📘 HSK 3 – Trung Cấp (600 từ vựng)</option>
                                            <option value="Tiếng Trung Công Xưởng">🏭 Giao Tiếp Công Xưởng / Nhà Máy</option>
                                            <option value="Tiếng Trung Công Ty">🏢 Giao Tiếp Văn Phòng / Doanh Nghiệp</option>
                                            <option value="Tiếng Trung Trẻ Em">🎨 Tiếng Trung Trẻ Em (5 - 12 tuổi)</option>
                                            <option value="Chưa rõ, cần kiểm tra trình độ">❓ Chưa rõ, cần tư vấn thêm</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                            Hình thức học mong muốn
                                        </label>
                                        <select
                                            name="study_mode"
                                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm"
                                        >
                                            <option value="offline">📍 Học Trực Tiếp tại Đà Nẵng</option>
                                            <option value="online">💻 Học Trực Tuyến qua Zoom</option>
                                            <option value="flexible">Linh hoạt cả 2 hình thức</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                            Khung giờ học thuận tiện
                                        </label>
                                        <select
                                            name="time_slot"
                                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm"
                                        >
                                            <option value="toi_246">Tối Thứ 2 - 4 - 6 (18:30 - 20:00)</option>
                                            <option value="toi_357">Tối Thứ 3 - 5 - 7 (18:30 - 20:00)</option>
                                            <option value="cuoi_tuan">Thứ Bảy & Chủ Nhật</option>
                                            <option value="sang_chieu">Ban ngày (Sáng hoặc Chiều)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                                        Mục tiêu học tập hoặc ghi chú thêm
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        placeholder="Ví dụ: Tôi muốn học để làm việc với sếp người Trung trong nhà máy, chưa từng học tiếng Trung trước đây..."
                                        className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/70 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full py-4 text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
                                >
                                    Gửi Thông Tin Đăng Ký →
                                </button>

                                <p className="text-xs text-center text-[var(--muted)] leading-relaxed">
                                    🔒 Chúng tôi cam kết bảo mật 100% thông tin cá nhân của bạn theo tiêu chuẩn quốc tế.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar info */}
                    <div className="space-y-6">
                        <div className="card rounded-[2.5rem] p-6 sm:p-8 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg">
                            <h3 className="text-lg font-bold text-[var(--text)] mb-4">
                                Lợi Ích Khi Đăng Ký
                            </h3>
                            <ul className="space-y-3.5 text-xs sm:text-sm text-[var(--text)]">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base">✓</span>
                                    <span>Miễn phí 1 buổi học thử trải nghiệm thực tế.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base">✓</span>
                                    <span>Kiểm tra trình độ đầu vào chuẩn HSK.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base">✓</span>
                                    <span>Tặng trọn bộ tài liệu audio luyện nghe Pinyin.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-600 font-bold text-base">✓</span>
                                    <span>Giảm 10% học phí khi đăng ký theo nhóm 2 người.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="card rounded-[2.5rem] p-6 sm:p-8 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg">
                            <h3 className="text-lg font-bold text-[var(--text)] mb-4">
                                Thông Tin Trung Tâm
                            </h3>
                            <div className="space-y-3 text-xs sm:text-sm text-[var(--muted)]">
                                <p>
                                    <strong className="text-[var(--text)]">Cơ sở:</strong> {SITE_ADDRESS}
                                </p>
                                <p>
                                    <strong className="text-[var(--text)]">Hotline / Zalo:</strong>{' '}
                                    <a href={`tel:${SITE_PHONE}`} className="link-accent font-semibold">
                                        {SITE_PHONE}
                                    </a>
                                </p>
                                <p>
                                    <strong className="text-[var(--text)]">Giờ tư vấn:</strong> {SITE_HOURS} (tất cả các ngày trong tuần)
                                </p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-[var(--border)]">
                                <Link
                                    href="/hoc-phi"
                                    className="text-xs font-semibold link-accent block text-center"
                                >
                                    Xem bảng học phí chi tiết →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
