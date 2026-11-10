import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_PHONE, SITE_ADDRESS, SITE_HOURS } from '@/lib/constants';
import RegistrationForm from './RegistrationForm';

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
                        <RegistrationForm />
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
