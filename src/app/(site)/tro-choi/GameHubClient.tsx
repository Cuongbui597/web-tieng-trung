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
            {/* Thanh chuyển đổi Game Hub ở đầu trang */}
            <header className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs py-3 px-4">
                <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🎮</span>
                        <div>
                            <span className="text-xs font-black uppercase tracking-wider text-rose-600 block">
                                Đấu Trường Trò Chơi
                            </span>
                            <span className="text-sm font-extrabold text-slate-800">
                                Trung Tâm Luyện Phản Xạ Tiếng Trung
                            </span>
                        </div>
                    </div>

                    {/* Bộ chuyển đổi 2 game */}
                    <div className="inline-flex rounded-2xl bg-slate-100/90 p-1 border border-slate-200 text-xs font-bold shadow-inner">
                        <button
                            type="button"
                            onClick={() => setGameMode('vocab')}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                                gameMode === 'vocab'
                                    ? 'bg-white text-slate-900 shadow-md font-black scale-102'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <span>⚡</span>
                            <span>Từ Vựng Tan Biến</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-800 font-extrabold">
                                730+ từ
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setGameMode('sentence')}
                            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                                gameMode === 'sentence'
                                    ? 'bg-rose-600 text-white shadow-md font-black scale-102'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <span>🧩</span>
                            <span>Bậc Thầy Ghép Câu</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
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
