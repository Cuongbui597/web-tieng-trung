"use client";

import { useState, useEffect } from 'react';

export default function LetterPopup() {
    const [isOpen, setIsOpen] = useState(true);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    // Nhấn ESC để đóng
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isRendered) return null;

    return (
        <>
            {/* Nút nhỏ góc dưới bên trái để mở lại tâm thư nếu đã đóng */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-900 text-amber-200 border border-amber-500/40 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs font-semibold group animate-bounce"
                    title="Bấm để đọc lại tâm thư"
                >
                    <span className="text-base group-hover:scale-110 transition-transform">💌</span>
                    <span>Tâm Thư Gửi Em</span>
                </button>
            )}

            {/* POPUP TOÀN MÀN HÌNH */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in transition-all overflow-y-auto"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Hiệu ứng hạt ánh sáng / sương mờ trong không gian */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/15 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>

                    {/* Hộp Tâm Thư (Letter Card) */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-stone-900/95 via-neutral-900/95 to-stone-950/98 p-8 sm:p-12 text-stone-200 border border-amber-500/30 shadow-[0_0_60px_rgba(217,119,6,0.15)] transition-all animate-scale-up"
                    >
                        {/* Nút đóng ở góc trên bên phải */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-stone-400 hover:text-white flex items-center justify-center transition cursor-pointer text-lg font-bold"
                            title="Đóng tâm thư"
                        >
                            ✕
                        </button>

                        {/* Huy hiệu phong bì / Wax seal */}
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-500 p-0.5 shadow-xl mb-3 flex items-center justify-center animate-pulse">
                                <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-3xl">
                                    ✉️
                                </div>
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400/90">
                                Bức Thư Cuối
                            </span>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mt-2" />
                        </div>

                        {/* Nội dung tâm thư nguyên văn của người dùng */}
                        <div className="space-y-5 text-center sm:text-left font-[family:var(--font-serif)]">
                            <p className="text-lg sm:text-2xl text-amber-100/95 font-medium leading-relaxed italic">
                                &ldquo;Khi em đọc được những từ này chắc có lẽ anh với em đã chia tay nhau, anh biết em không yêu anh, em chỉ gặp anh lúc cô đơn, anh muốn tặng em một lời, anh nhớ về kỹ niệm 2 đứa.
                            </p>
                            <p className="text-xl sm:text-3xl text-rose-300 font-bold leading-relaxed tracking-wide italic text-center sm:text-right pt-2">
                                Tạm biệt, anh đã từng yêu em.&rdquo;
                            </p>
                        </div>

                        {/* Chữ ký & Footer của tâm thư */}
                        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs text-stone-400 italic">
                                — Nhớ về những kỷ niệm đã qua —
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-semibold tracking-wider transition-all cursor-pointer border border-white/10 shadow-sm hover:scale-105 active:scale-95"
                            >
                                Gấp Lại Tâm Thư ✉️
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
