"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import GameClient from './GameClient';
import SentenceGame from './SentenceGame';

export default function GameHubClient() {
    const searchParams = useSearchParams();
    const initialMode = searchParams.get('mode') === 'sentence' ? 'sentence' : 'vocab';
    const [gameMode, setGameMode] = useState<'vocab' | 'sentence'>(initialMode);

    return (
        <main className="min-h-dvh flex flex-col bg-slate-50 overscroll-none touch-manipulation">
            {/* App Top Bar - Native App Style */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-2xs py-2 px-2.5 sm:px-4 pt-safe">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
                    {/* Nút thoát về trang chủ */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-95 transition cursor-pointer select-none shrink-0"
                        title="Quay lại trang chủ website"
                    >
                        <span>←</span>
                        <span className="hidden sm:inline">Trang chủ</span>
                    </Link>

                    {/* Bộ chuyển đổi 2 game dạng Segmented Switcher chuẩn App */}
                    <div className="inline-flex rounded-2xl bg-slate-100/90 p-1 border border-slate-200 text-xs font-bold shadow-inner">
                        <button
                            type="button"
                            onClick={() => setGameMode('vocab')}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs select-none touch-manipulation active:scale-95 ${
                                gameMode === 'vocab'
                                    ? 'bg-white text-slate-900 shadow-md font-black scale-102'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <span>⚡</span>
                            <span className="font-extrabold">Từ Vựng Tan Biến</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-800 font-extrabold hidden md:inline">
                                730+
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setGameMode('sentence')}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs select-none touch-manipulation active:scale-95 ${
                                gameMode === 'sentence'
                                    ? 'bg-rose-600 text-white shadow-md font-black scale-102'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <span>🧩</span>
                            <span className="font-extrabold">Bậc Thầy Ghép Câu</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold hidden md:inline ${
                                gameMode === 'sentence' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                            }`}>
                                Mới ✨
                            </span>
                        </button>
                    </div>

                    {/* Huy hiệu ứng dụng */}
                    <div className="hidden sm:flex items-center gap-1 text-[11px] font-extrabold text-slate-500 bg-slate-100/80 px-2 py-1 rounded-lg shrink-0">
                        <span>🎮</span>
                        <span>Game Hub</span>
                    </div>
                </div>
            </header>

            {/* Vùng hiển thị Game tương ứng */}
            <div className="flex-1 flex flex-col">
                {gameMode === 'vocab' ? (
                    <GameClient />
                ) : (
                    <SentenceGame />
                )}
            </div>
        </main>
    );
}
