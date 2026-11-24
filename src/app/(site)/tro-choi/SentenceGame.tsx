"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { SENTENCE_DATABASE, SentenceItem } from './sentenceData';

interface ChunkItem {
    id: string;
    text: string;
    originalIndex: number;
}

// Bộ tạo âm thanh chuẩn Web Audio API thuần (Offline, không cần MP3 ngoài)
class SoundEffects {
    ctx: AudioContext | null = null;
    enabled: boolean = true;

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
    }

    playTap() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Chime C5 -> E5 -> G5 -> C6
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.5);
    }

    playWrong() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.setValueAtTime(140, now + 0.12);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playWin() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const chords = [523.25, 659.25, 783.99, 1046.50];
        chords.forEach((freq, idx) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();
            osc.connect(gain);
            gain.connect(this.ctx!.destination);
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);
            gain.gain.setValueAtTime(0.18, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);
            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.6);
        });
    }
}

const sfx = new SoundEffects();

// Quản lý giọng đọc chuẩn tiếng Trung (zh-CN)
let cachedChineseVoice: SpeechSynthesisVoice | null = null;

function getChineseVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    // Ưu tiên giọng phổ thông zh-CN (Microsoft Huihui, Yaoyao, Kangkang, Google 普通话)
    const zhCN = voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN');
    if (zhCN) return zhCN;
    const anyZh = voices.find(v => v.lang.startsWith('zh') || v.lang.includes('cmn'));
    return anyZh || null;
}

const QUESTIONS_PER_ROUND = 10;

export default function SentenceGame() {
    const [selectedLesson, setSelectedLesson] = useState<'all' | 'buoi-1' | 'buoi-2'>('all');
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [roundSentences, setRoundSentences] = useState<SentenceItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Trạng thái các khối từ
    const [availableChunks, setAvailableChunks] = useState<ChunkItem[]>([]);
    const [selectedChunks, setSelectedChunks] = useState<ChunkItem[]>([]);

    // Tùy chọn học tập & Âm thanh
    const [showPinyin, setShowPinyin] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const [voiceSpeed, setVoiceSpeed] = useState<number>(0.75); // Tốc độ vừa phải, chậm rãi
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Phản hồi đáp án
    const [isChecking, setIsChecking] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [shake, setShake] = useState(false);

    // Điểm số & Combo
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // Lịch sử lượt chơi
    const [history, setHistory] = useState<Array<{
        sentence: SentenceItem;
        correct: boolean;
        userAnswer: string;
    }>>([]);

    // Hiệu ứng pháo hoa confetti
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

    const currentSentence = roundSentences[currentIndex] || null;

    // Load High score & Khởi tạo giọng đọc chuẩn
    useEffect(() => {
        const saved = localStorage.getItem('sentence_builder_highscore');
        if (saved) setBestScore(parseInt(saved, 10));

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            cachedChineseVoice = getChineseVoice();
            window.speechSynthesis.onvoiceschanged = () => {
                cachedChineseVoice = getChineseVoice();
            };
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Dừng phát âm an toàn
    const stopSpeech = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    // Phát âm câu tiếng Trung với kiểm soát tốc độ và sự kiện kết thúc
    const speakSentence = useCallback((text: string, rate: number = voiceSpeed, onComplete?: () => void) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            onComplete?.();
            return;
        }
        try {
            window.speechSynthesis.cancel();
            setIsSpeaking(true);

            // Làm sạch ký tự dấu câu khi phát âm
            const clean = text.replace(/[。？！，、]/g, ' ');
            const utterance = new SpeechSynthesisUtterance(clean);
            utterance.lang = 'zh-CN';
            utterance.rate = rate;
            utterance.pitch = 1.0;

            const voice = cachedChineseVoice || getChineseVoice();
            if (voice) {
                utterance.voice = voice;
            }

            utterance.onend = () => {
                setIsSpeaking(false);
                onComplete?.();
            };

            utterance.onerror = (e) => {
                setIsSpeaking(false);
                if (e.error !== 'canceled' && e.error !== 'interrupted') {
                    onComplete?.();
                }
            };

            // Trì hoãn 40ms trên Chrome/Edge Windows để tránh lỗi kẹt sau khi cancel()
            setTimeout(() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                    if (window.speechSynthesis.paused) {
                        window.speechSynthesis.resume();
                    }
                    window.speechSynthesis.speak(utterance);
                }
            }, 40);
        } catch {
            setIsSpeaking(false);
            onComplete?.();
        }
    }, [voiceSpeed]);

    // Xáo trộn mảng
    const shuffleArray = <T,>(arr: T[]): T[] => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    // Khởi tạo câu hỏi hiện tại
    const loadSentenceChunks = useCallback((sentence: SentenceItem) => {
        const items: ChunkItem[] = sentence.chunks.map((txt, idx) => ({
            id: `chunk_${idx}_${txt}`,
            text: txt,
            originalIndex: idx,
        }));
        setAvailableChunks(shuffleArray(items));
        setSelectedChunks([]);
        setIsCorrect(null);
        setShowHint(false);
        setShake(false);
    }, []);

    // Bắt đầu ván chơi mới
    const startGame = (lessonFilter: 'all' | 'buoi-1' | 'buoi-2' = selectedLesson) => {
        stopSpeech();
        sfx.init();
        setSelectedLesson(lessonFilter);

        let pool = SENTENCE_DATABASE;
        if (lessonFilter !== 'all') {
            pool = pool.filter(s => s.lesson === lessonFilter);
        }

        const shuffled = shuffleArray(pool).slice(0, QUESTIONS_PER_ROUND);
        setRoundSentences(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setHistory([]);
        setGameState('playing');

        if (shuffled[0]) {
            loadSentenceChunks(shuffled[0]);
            // Không tự động đọc to đáp án khi vừa bước vào câu mới
        }
    };

    // Chọn một khối từ từ kho xáo trộn đưa lên khung ghép câu
    const handlePickChunk = (chunk: ChunkItem) => {
        if (isChecking || isCorrect) return;
        sfx.playTap();
        setAvailableChunks(prev => prev.filter(c => c.id !== chunk.id));
        setSelectedChunks(prev => [...prev, chunk]);
    };

    // Trả một khối từ từ khung ghép câu về lại kho xáo trộn
    const handleRemoveChunk = (chunk: ChunkItem) => {
        if (isChecking || isCorrect) return;
        sfx.playTap();
        setSelectedChunks(prev => prev.filter(c => c.id !== chunk.id));
        setAvailableChunks(prev => [...prev, chunk]);
        setIsCorrect(null);
    };

    // Hiệu ứng pháo hoa khi đúng
    const triggerConfetti = () => {
        const newParticles = [];
        const colors = ['#e11d48', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        for (let i = 0; i < 32; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 80 + Math.random() * 140;
            newParticles.push({
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 6 + Math.random() * 10,
            });
        }
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 700);
    };

    // Kiểm tra câu ghép
    const checkAnswer = () => {
        if (!currentSentence || selectedChunks.length === 0 || isChecking) return;
        setIsChecking(true);

        const currentAnswerHanzi = selectedChunks.map(c => c.text).join('').replace(/[。？！，、]/g, '');
        const targetCleanHanzi = currentSentence.fullHanzi.replace(/[。？！，、]/g, '');

        const correct = currentAnswerHanzi === targetCleanHanzi;

        if (correct) {
            // Đúng!
            setIsCorrect(true);
            sfx.playCorrect();
            triggerConfetti();

            const multiplier = streak >= 3 ? 2 : 1;
            const points = 20 * multiplier;
            setScore(prev => prev + points);
            setStreak(prev => prev + 1);

            // Ghi lịch sử
            setHistory(prev => [
                ...prev,
                {
                    sentence: currentSentence,
                    correct: true,
                    userAnswer: selectedChunks.map(c => c.text).join(' '),
                },
            ]);

            // Phát âm câu đúng chậm rãi, rõ ràng và ĐỢI ĐỌC XONG MỚI CHUYỂN CÂU
            speakSentence(currentSentence.fullHanzi, voiceSpeed, () => {
                setTimeout(() => {
                    moveToNextSentence();
                }, 600);
            });
        } else {
            // Sai!
            setIsCorrect(false);
            sfx.playWrong();
            setShake(true);
            setStreak(0);
            setTimeout(() => setShake(false), 500);

            // Ghi lịch sử sai
            setHistory(prev => [
                ...prev,
                {
                    sentence: currentSentence,
                    correct: false,
                    userAnswer: selectedChunks.map(c => c.text).join(' '),
                },
            ]);

            setIsChecking(false);
        }
    };

    // Chuyển sang câu tiếp theo hoặc kết thúc
    const moveToNextSentence = () => {
        stopSpeech();
        setIsChecking(false);
        setIsCorrect(null);

        const nextIdx = currentIndex + 1;
        if (nextIdx >= roundSentences.length) {
            // Kết thúc lượt chơi
            sfx.playWin();
            setGameState('gameover');
            setScore(currentScore => {
                setBestScore(prevBest => {
                    if (currentScore > prevBest) {
                        localStorage.setItem('sentence_builder_highscore', currentScore.toString());
                        return currentScore;
                    }
                    return prevBest;
                });
                return currentScore;
            });
        } else {
            setCurrentIndex(nextIdx);
            const nextSentence = roundSentences[nextIdx];
            loadSentenceChunks(nextSentence);
            // Để người học tự tư duy với câu hỏi mới, không tự động đọc to trước
        }
    };

    // Bỏ qua câu này để xem đáp án
    const handleSkip = () => {
        if (!currentSentence || isChecking) return;
        setIsChecking(true);
        setIsCorrect(false);
        sfx.playWrong();
        setStreak(0);

        // Tự động sắp xếp đúng vào ô
        const correctOrder = currentSentence.chunks.map((txt, idx) => ({
            id: `correct_${idx}`,
            text: txt,
            originalIndex: idx,
        }));
        setSelectedChunks(correctOrder);
        setAvailableChunks([]);

        setHistory(prev => [
            ...prev,
            {
                sentence: currentSentence,
                correct: false,
                userAnswer: 'Đã bỏ qua (Xem đáp án)',
            },
        ]);

        // Đọc câu đáp án mẫu chậm rãi, sau khi đọc xong mới chuyển sang câu tiếp
        speakSentence(currentSentence.fullHanzi, voiceSpeed, () => {
            setTimeout(() => {
                moveToNextSentence();
            }, 800);
        });
    };

    // Bật/tắt âm thanh
    const toggleSound = () => {
        setSoundOn(prev => {
            sfx.enabled = !prev;
            return !prev;
        });
    };

    const grammarTagLabels: Record<string, { label: string; color: string }> = {
        'cau-chu-ba': { label: 'Câu Chữ 把', color: 'bg-rose-100 text-rose-800 border-rose-300' },
        'luong-tu': { label: 'Lượng Từ Chuẩn', color: 'bg-amber-100 text-amber-800 border-amber-300' },
        'vi-tri': { label: 'Cấu Trúc Vị Trí', color: 'bg-blue-100 text-blue-800 border-blue-300' },
        'bo-ngu': { label: 'Bổ Ngữ Kết Quả', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
        'giao-tiep': { label: 'Giao Tiếp Thực Tế', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    };

    return (
        <div className="min-h-screen py-10 px-4 relative overflow-hidden">
            <div className="container-app max-w-3xl mx-auto relative z-10">

                {/* ==================== MÀN HÌNH CHỌN BÀI (IDLE) ==================== */}
                {gameState === 'idle' && (
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/50 backdrop-blur-xl border border-white/40 shadow-2xl text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700 shadow-2xs">
                            <span>🧩</span> Trò Chơi Mới: Bậc Thầy Ghép Câu
                        </div>

                        <div className="text-6xl animate-bounce">
                            🏗️
                        </div>

                        <div>
                            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                                Bậc Thầy <span className="text-gradient-accent">Ghép Câu</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 font-medium">
                                Sắp xếp các khối từ vựng thành câu giao tiếp hoàn chỉnh. Làm chủ câu chữ 把, lượng từ và bổ ngữ thực tế của <strong>Buổi 1 & Buổi 2</strong>!
                            </p>
                        </div>

                        {/* Danh sách chủ đề */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                            <button
                                type="button"
                                onClick={() => startGame('buoi-1')}
                                className="p-4 sm:p-5 rounded-2xl border-2 border-indigo-200 bg-white/90 hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-3xl">🪑</span>
                                    <div className="font-black text-slate-900 text-base mt-2 group-hover:text-indigo-600 transition">
                                        Buổi 1: Phòng Ở & Bàn Làm Việc
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                        16 đồ vật phòng ở, lau dọn bàn ghế, chìa khóa, câu chữ 把, vị trí xưởng may...
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-indigo-700">
                                    <span>48 câu mẫu</span>
                                    <span>Bắt đầu →</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => startGame('buoi-2')}
                                className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-200 bg-white/90 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-3xl">🛏️</span>
                                    <div className="font-black text-slate-900 text-base mt-2 group-hover:text-emerald-600 transition">
                                        Buổi 2: Ký Túc Xá & Vệ Sinh
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                        Giường chiếu, máy giặt, máy sấy, kem đánh răng, rút sạc, kéo bấm chỉ...
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-700">
                                    <span>48 câu mẫu</span>
                                    <span>Bắt đầu →</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => startGame('all')}
                                className="p-4 sm:p-5 rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-orange-50 hover:border-rose-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-3xl">🌟</span>
                                    <div className="font-black text-slate-900 text-base mt-2 group-hover:text-rose-600 transition">
                                        Thử Thách Tổng Hợp
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                        Trộn ngẫu nhiên 96 câu của cả Buổi 1 và Buổi 2 để kiểm tra phản xạ cao nhất!
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs font-bold text-rose-700">
                                    <span>96 câu thực chiến</span>
                                    <span>Bắt đầu →</span>
                                </div>
                            </button>
                        </div>

                        {bestScore > 0 && (
                            <div className="pt-2 text-xs font-bold text-slate-500">
                                🏆 Điểm kỷ lục của bạn: <span className="text-rose-600 font-black">{bestScore} điểm</span>
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== MÀN HÌNH CHƠI (PLAYING) ==================== */}
                {gameState === 'playing' && currentSentence && (
                    <div className="space-y-4">
                        {/* Thanh Topbar: Tiến trình, Combo, Âm thanh */}
                        <div className="flex items-center justify-between p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-xs">
                            <button
                                type="button"
                                onClick={() => {
                                    stopSpeech();
                                    setGameState('idle');
                                }}
                                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1 cursor-pointer"
                            >
                                ✕ Thoát
                            </button>

                            <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-slate-700">
                                    Câu {currentIndex + 1} / {roundSentences.length}
                                </span>
                                <div className="w-24 sm:w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
                                        style={{ width: `${((currentIndex + 1) / roundSentences.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {streak >= 2 && (
                                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 animate-pulse">
                                        🔥 Combo x{streak}
                                    </span>
                                )}
                                <span className="text-xs font-black text-rose-600">
                                    {score} đ
                                </span>
                                <button
                                    type="button"
                                    onClick={toggleSound}
                                    className="p-1 rounded-lg text-slate-500 hover:text-slate-800 text-xs"
                                    title="Bật/Tắt âm thanh"
                                >
                                    {soundOn ? '🔊' : '🔇'}
                                </button>
                            </div>
                        </div>

                        {/* Thẻ câu hỏi trung tâm */}
                        <div className={`card p-6 sm:p-8 rounded-[2rem] bg-white/85 backdrop-blur-xl border border-white/60 shadow-xl relative transition-all ${
                            shake ? 'animate-shake border-rose-300' : ''
                        } ${isCorrect === true ? 'border-emerald-400 bg-emerald-50/40' : ''}`}>

                            {/* Badge ngữ pháp & Nút nghe */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 rounded-md border ${
                                        grammarTagLabels[currentSentence.grammarTag]?.color || 'bg-slate-100 text-slate-700'
                                    }`}>
                                        {grammarTagLabels[currentSentence.grammarTag]?.label || 'Ngữ Pháp'}
                                    </span>
                                    <span className="text-xs font-bold text-slate-500">
                                        Từ khóa: <strong className="text-slate-900">{currentSentence.targetWord}</strong>
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Nút chọn tốc độ phát âm */}
                                    <div className="inline-flex items-center bg-slate-100/90 rounded-xl p-0.5 border border-slate-200 text-[11px] font-bold">
                                        <button
                                            type="button"
                                            onClick={() => setVoiceSpeed(0.70)}
                                            className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                                                voiceSpeed === 0.70
                                                    ? 'bg-white text-rose-600 shadow-2xs font-extrabold'
                                                    : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                            title="Tốc độ chậm (0.7x) - Rõ nét từng thanh điệu"
                                        >
                                            🐢 0.7x
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setVoiceSpeed(0.78)}
                                            className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                                                voiceSpeed === 0.78
                                                    ? 'bg-white text-rose-600 shadow-2xs font-extrabold'
                                                    : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                            title="Tốc độ vừa phải (0.8x) - Khuyến nghị"
                                        >
                                            🔉 0.8x
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setVoiceSpeed(0.95)}
                                            className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                                                voiceSpeed === 0.95
                                                    ? 'bg-white text-rose-600 shadow-2xs font-extrabold'
                                                    : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                            title="Tốc độ tự nhiên (1.0x)"
                                        >
                                            ⚡ 1.0x
                                        </button>
                                    </div>

                                    {/* Nút bật/tắt Pinyin */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPinyin(prev => !prev)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                                            showPinyin
                                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}
                                    >
                                        Pinyin {showPinyin ? '✓' : '✗'}
                                    </button>

                                    {/* Nút phát âm có hiệu ứng sóng âm khi đang nói */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (isSpeaking) {
                                                stopSpeech();
                                            } else {
                                                speakSentence(currentSentence.fullHanzi, voiceSpeed);
                                            }
                                        }}
                                        className={`px-2.5 py-1 rounded-xl transition cursor-pointer text-xs font-bold flex items-center gap-1.5 shadow-2xs ${
                                            isSpeaking
                                                ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                        }`}
                                        title={isSpeaking ? 'Đang đọc... Bấm để dừng' : 'Bấm để nghe phát âm cả câu'}
                                    >
                                        <span>{isSpeaking ? '⏹' : '🔊'}</span>
                                        <span className="hidden sm:inline">{isSpeaking ? 'Đang đọc...' : 'Nghe câu'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Câu tiếng Việt yêu cầu dịch */}
                            <div className="text-center py-2 sm:py-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                                    Nghĩa tiếng Việt cần ghép:
                                </p>
                                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                                    &ldquo;{currentSentence.vietnamese}&rdquo;
                                </h2>
                                {showPinyin && (
                                    <p className="text-xs sm:text-sm font-mono text-rose-600/90 mt-1.5 font-bold">
                                        {currentSentence.fullPinyin}
                                    </p>
                                )}
                            </div>

                            {/* VÙNG GHÉP CÂU (DROP ZONE / SELECTED CHUNKS) */}
                            <div className="mt-4 p-4 min-h-[90px] sm:min-h-[110px] rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 flex flex-wrap items-center justify-center gap-2.5">
                                {selectedChunks.length === 0 ? (
                                    <span className="text-xs sm:text-sm font-semibold text-indigo-400 select-none">
                                        👇 Chạm vào các khối từ bên dưới để ghép vào đây theo thứ tự chuẩn
                                    </span>
                                ) : (
                                    selectedChunks.map(chunk => (
                                        <button
                                            key={chunk.id}
                                            type="button"
                                            onClick={() => handleRemoveChunk(chunk)}
                                            className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-base sm:text-lg shadow-md hover:bg-indigo-700 hover:scale-105 active:scale-95 transition cursor-pointer"
                                            title="Bấm để gỡ khối từ này"
                                        >
                                            {chunk.text}
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* VÙNG KHO TỪ ĐANG XÁO TRỘN (WORD BANK) */}
                            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2.5 min-h-[80px]">
                                {availableChunks.map(chunk => (
                                    <button
                                        key={chunk.id}
                                        type="button"
                                        onClick={() => handlePickChunk(chunk)}
                                        className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-500 text-slate-800 font-extrabold text-base sm:text-lg shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                                    >
                                        {chunk.text}
                                    </button>
                                ))}
                            </div>

                            {/* Giải thích ngữ pháp khi trả lời */}
                            {showHint && (
                                <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 font-medium">
                                    💡 <strong>Mẹo ngữ pháp:</strong> {currentSentence.grammarNote}
                                </div>
                            )}

                            {isCorrect === true && (
                                <div className="mt-4 p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between animate-fade-in">
                                    <span>🎉 Chính xác! Bạn ghép câu rất chuẩn xác!</span>
                                    <span className="text-base font-black">+{streak >= 3 ? 40 : 20} điểm</span>
                                </div>
                            )}

                            {isCorrect === false && (
                                <div className="mt-4 p-3.5 bg-rose-50 border border-rose-300 text-rose-900 rounded-2xl text-xs sm:text-sm font-medium animate-shake">
                                    <div className="font-bold">⚠️ Thứ tự câu chưa chính xác. Hãy thử lại hoặc xem mẹo!</div>
                                    <div className="text-xs text-rose-700 mt-1 font-mono">
                                        💡 {currentSentence.grammarNote}
                                    </div>
                                </div>
                            )}

                            {/* Nút thao tác dưới cùng */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowHint(prev => !prev)}
                                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition cursor-pointer"
                                    >
                                        💡 {showHint ? 'Ẩn mẹo' : 'Xem mẹo'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSkip}
                                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
                                    >
                                        Bỏ qua câu này
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    disabled={selectedChunks.length === 0 || isChecking}
                                    onClick={checkAnswer}
                                    className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                                        selectedChunks.length > 0 && !isChecking
                                            ? 'bg-rose-600 hover:bg-rose-700 text-white hover:scale-102 active:scale-98'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                    }`}
                                >
                                    Kiểm tra đáp án →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== MÀN HÌNH TỔNG KẾT (GAMEOVER) ==================== */}
                {gameState === 'gameover' && (
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl text-center space-y-6 animate-fade-in">
                        <div className="text-6xl animate-bounce">
                            🏆
                        </div>

                        <div>
                            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                                Hoàn Thành Vòng Ghép Câu!
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Bạn vừa hoàn thành {roundSentences.length} câu giao tiếp thực tế của {selectedLesson === 'buoi-1' ? 'Buổi 1' : selectedLesson === 'buoi-2' ? 'Buổi 2' : 'Tổng Hợp'}.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                                <span className="text-xs font-bold uppercase text-rose-600">Tổng điểm</span>
                                <div className="text-2xl sm:text-3xl font-black text-rose-700 mt-0.5">{score}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                                <span className="text-xs font-bold uppercase text-emerald-600">Trả lời đúng</span>
                                <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5">
                                    {history.filter(h => h.correct).length} / {history.length}
                                </div>
                            </div>
                            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                                <span className="text-xs font-bold uppercase text-indigo-600">Tỷ lệ chính xác</span>
                                <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-0.5">
                                    {Math.round((history.filter(h => h.correct).length / (history.length || 1)) * 100)}%
                                </div>
                            </div>
                        </div>

                        {/* Xem lại các câu đã làm */}
                        <div className="text-left max-h-60 overflow-y-auto space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                            <div className="font-bold text-slate-700 mb-1 uppercase tracking-wider">
                                Danh sách câu trong lượt chơi:
                            </div>
                            {history.map((h, i) => (
                                <div key={i} className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-200/60 last:border-none">
                                    <div className="flex items-start gap-2">
                                        <span className="shrink-0">{h.correct ? '✅' : '❌'}</span>
                                        <div className="flex-1">
                                            <div className="font-bold text-slate-900">{h.sentence.fullHanzi}</div>
                                            <div className="text-[11px] text-slate-500">{h.sentence.vietnamese}</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => speakSentence(h.sentence.fullHanzi, voiceSpeed)}
                                        className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer text-xs shrink-0"
                                        title="Nghe phát âm câu này"
                                    >
                                        🔊
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => startGame(selectedLesson)}
                                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                            >
                                🔄 Chơi lại bài này
                            </button>
                            <button
                                type="button"
                                onClick={() => setGameState('idle')}
                                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-extrabold text-sm shadow-2xs transition cursor-pointer"
                            >
                                📋 Chọn bài học khác
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Pháo hoa Confetti */}
            {particles.length > 0 && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                    {particles.map(p => (
                        <div
                            key={p.id}
                            className="absolute rounded-full animate-ping"
                            style={{
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                backgroundColor: p.color,
                                transform: `translate(${p.x}px, ${p.y}px)`,
                                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
