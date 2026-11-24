"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GameClient from './GameClient';
import SentenceGame from './SentenceGame';

export default function GameHubClient() {
    const searchParams = useSearchParams();
    const initialMode = searchParams.get('mode') === 'sentence' ? 'sentence' : 'vocab';
    const [gameMode, setGameMode] = useState<'vocab' | 'sentence'>(initialMode);

    return (
        <main className="min-h-screen bg-[var(--bg)] pb-16">
            {/* Thanh chuyển đổi Game Hub ở đầu trang - Tối ưu siêu gọn cho mobile */}
            <header className="sticky top-16 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs py-2 sm:py-3 px-3 sm:px-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-lg sm:text-xl shrink-0">🎮</span>
                        <div className="min-w-0">
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-rose-600 block truncate">
                                Trò Chơi
                            </span>
                            <span className="text-xs sm:text-sm font-extrabold text-slate-800 hidden sm:block truncate">
                                Luyện Phản Xạ Tiếng Trung
                            </span>
                        </div>
                    </div>

                    {/* Bộ chuyển đổi 2 game tinh gọn, không rớt dòng */}
                    <div className="inline-flex rounded-2xl bg-slate-100/90 p-1 border border-slate-200 text-xs font-bold shadow-inner shrink-0">
                        <button
                            type="button"
                            onClick={() => setGameMode('vocab')}
                            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs select-none touch-manipulation active:scale-95 ${
                                gameMode === 'vocab'
                                    ? 'bg-white text-slate-900 shadow-md font-black scale-102'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <span>⚡</span>
                            <span>Từ Vựng</span>
                            <span className="hidden md:inline">Tan Biến</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-800 font-extrabold hidden sm:inline">
                                730+
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setGameMode('sentence')}
                            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs select-none touch-manipulation active:scale-95 ${
                                gameMode === 'sentence'
                                    ? 'bg-rose-600 text-white shadow-md font-black scale-102'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <span>🧩</span>
                            <span>Ghép Câu</span>
                            <span className="hidden md:inline">Bậc Thầy</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold hidden sm:inline ${
                                gameMode === 'sentence' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                            }`}>
                                Mới ✨
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hiển thị Game tương ứng */}
            <div>
                {gameMode === 'vocab' ? (
                    <GameClient />
                ) : (
                    <SentenceGame />
                )}
            </div>
        </main>
    );
}
