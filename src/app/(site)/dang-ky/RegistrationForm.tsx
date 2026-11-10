"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SITE_PHONE } from '@/lib/constants';

export default function RegistrationForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('HSK 1 - Sơ Cấp');
    const [studyMode, setStudyMode] = useState('offline');
    const [timeSlot, setTimeSlot] = useState('toi_246');
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if (!name.trim()) {
            setErrorMsg('Vui lòng nhập họ và tên của bạn.');
            return;
        }

        const cleanPhone = phone.replace(/[\s.-]/g, '');
        if (!cleanPhone || cleanPhone.length < 9) {
            setErrorMsg('Vui lòng nhập số điện thoại hoặc Zalo hợp lệ (từ 9 đến 11 chữ số).');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: cleanPhone,
                    email: email.trim(),
                    course,
                    study_mode: studyMode,
                    time_slot: timeSlot,
                    message: message.trim(),
                    subject: `Đăng ký khóa học: ${course}`,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.ok) {
                setErrorMsg(data.error || 'Có lỗi xảy ra khi gửi thông tin. Vui lòng liên hệ Hotline.');
            } else {
                setSubmitted(true);
            }
        } catch {
            setErrorMsg('Không thể kết nối đến máy chủ. Vui lòng thử lại hoặc gọi Hotline hỗ trợ.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/50 backdrop-blur-xl border border-white/60 shadow-2xl text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                    ✓
                </div>
                <div>
                    <span className="badge-gradient text-xs px-3 py-1 rounded-full font-bold mb-3 inline-block">
                        Tiếp Nhận Thành Công
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mt-2">
                        Đăng Ký Khóa Học Thành Công!
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--muted)] mt-3 max-w-md mx-auto leading-relaxed">
                        Cảm ơn bạn <strong className="text-[var(--text)]">{name}</strong> đã đăng ký khóa học{' '}
                        <strong className="text-[var(--accent)]">{course}</strong>.
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--muted)] mt-2">
                        Chuyên viên tuyển sinh của Trung Tâm Tiếng Trung HSK Việt sẽ liên hệ qua SĐT/Zalo{' '}
                        <strong className="text-[var(--text)]">{phone}</strong> trong vòng 24h để hoàn tất xếp lớp và gửi tài liệu học thử miễn phí.
                    </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            setSubmitted(false);
                            setName('');
                            setPhone('');
                            setEmail('');
                            setMessage('');
                        }}
                        className="btn btn-outline py-3 px-6 text-sm font-semibold rounded-2xl"
                    >
                        Đăng ký thêm khóa khác
                    </button>
                    <Link
                        href="/tro-choi"
                        className="btn btn-primary py-3 px-6 text-sm font-bold rounded-2xl shadow-md"
                    >
                        🎮 Chơi Thử Game Từ Vựng
                    </Link>
                </div>

                <div className="text-xs text-[var(--muted)] border-t border-[var(--border)] pt-4">
                    Cần hỗ trợ gấp? Gọi ngay Hotline Tuyển Sinh:{' '}
                    <a href={`tel:${SITE_PHONE}`} className="font-bold text-[var(--accent)] underline">
                        {SITE_PHONE}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="card rounded-[2.5rem] p-8 sm:p-10 bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
                        <span className="text-lg">⚠️</span>
                        <div>
                            <div className="font-bold">Chưa thể gửi thông tin</div>
                            <div className="text-xs mt-0.5">{errorMsg}</div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                            Họ và tên của bạn <span className="text-rose-600">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ví dụ: Nguyễn Văn An"
                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm font-medium shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                            Số điện thoại / Zalo <span className="text-rose-600">*</span>
                        </label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Ví dụ: 0912 345 678"
                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm font-medium shadow-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                            Email (tùy chọn)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tenban@gmail.com"
                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text)] mb-2">
                            Khóa học quan tâm <span className="text-rose-600">*</span>
                        </label>
                        <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm font-medium shadow-sm"
                        >
                            <option value="HSK 1 - Sơ Cấp">🎯 HSK 1 – Sơ Cấp (150 từ vựng cơ bản)</option>
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
                            value={studyMode}
                            onChange={(e) => setStudyMode(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm shadow-sm"
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
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm shadow-sm"
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
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ví dụ: Tôi muốn học để làm việc với đồng nghiệp Trung Quốc trong xưởng, chưa từng học tiếng Trung trước đây..."
                        className="w-full px-4 py-3.5 rounded-2xl border border-[var(--border)] bg-white/80 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition text-sm shadow-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-4 text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                    {loading ? (
                        <>
                            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Đang gửi thông tin đăng ký...</span>
                        </>
                    ) : (
                        <>
                            <span>Gửi Thông Tin Đăng Ký →</span>
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-[var(--muted)] leading-relaxed">
                    🔒 Chúng tôi cam kết bảo mật 100% thông tin cá nhân của bạn. Không gọi làm phiền ngoài giờ hành chính.
                </p>
            </form>
        </div>
    );
}
