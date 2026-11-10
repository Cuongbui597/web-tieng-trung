"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface WordItem {
    id: string;
    hanzi: string;
    pinyin: string;
    meanings: string[]; // Các nghĩa tiếng Việt chấp nhận được
    category: 'hsk-1' | 'hsk-2' | 'hsk-3' | 'cong-xuong' | 'tre-em';
    categoryLabel: string;
}

const VOCAB_DATABASE: WordItem[] = [
    // HSK 1
    { id: 'h1_1', hanzi: '你好', pinyin: 'nǐ hǎo', meanings: ['xin chào', 'chào', 'chào bạn'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_2', hanzi: '谢谢', pinyin: 'xièxie', meanings: ['cảm ơn', 'cám ơn', 'cảm ơn bạn'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_3', hanzi: '再见', pinyin: 'zàijiàn', meanings: ['tạm biệt', 'hẹn gặp lại'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_4', hanzi: '对不起', pinyin: 'duìbuqǐ', meanings: ['xin lỗi', 'xin loi'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_5', hanzi: '水', pinyin: 'shuǐ', meanings: ['nước', 'nuoc'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_6', hanzi: '茶', pinyin: 'chá', meanings: ['trà', 'chè', 'tra'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_7', hanzi: '吃', pinyin: 'chī', meanings: ['ăn', 'an'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_8', hanzi: '喝', pinyin: 'hē', meanings: ['uống', 'uong'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_9', hanzi: '猫', pinyin: 'māo', meanings: ['mèo', 'con mèo', 'meo'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_10', hanzi: '狗', pinyin: 'gǒu', meanings: ['chó', 'con chó', 'cho'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_11', hanzi: '苹果', pinyin: 'píngguǒ', meanings: ['táo', 'quả táo', 'trai tao'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_12', hanzi: '钱', pinyin: 'qián', meanings: ['tiền', 'tien'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_13', hanzi: '书', pinyin: 'shū', meanings: ['sách', 'cuốn sách', 'sach'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_14', hanzi: '老师', pinyin: 'lǎoshī', meanings: ['thầy giáo', 'cô giáo', 'giáo viên', 'thầy', 'cô'], category: 'hsk-1', categoryLabel: 'HSK 1' },
    { id: 'h1_15', hanzi: '学生', pinyin: 'xuésheng', meanings: ['học sinh', 'sinh viên', 'hoc sinh'], category: 'hsk-1', categoryLabel: 'HSK 1' },

    // HSK 2
    { id: 'h2_1', hanzi: '早上', pinyin: 'zǎoshang', meanings: ['buổi sáng', 'sáng', 'buoi sang'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_2', hanzi: '晚上', pinyin: 'wǎnshang', meanings: ['buổi tối', 'tối', 'buoi toi'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_3', hanzi: '帮助', pinyin: 'bāngzhù', meanings: ['giúp đỡ', 'giúp', 'trợ giúp', 'giup do'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_4', hanzi: '便宜', pinyin: 'piányi', meanings: ['rẻ', 're'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_5', hanzi: '贵', pinyin: 'guì', meanings: ['đắt', 'quý', 'dat'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_6', hanzi: '准备', pinyin: 'zhǔnbèi', meanings: ['chuẩn bị', 'chuan bi'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_7', hanzi: '欢迎', pinyin: 'huānyíng', meanings: ['hoan nghênh', 'chào đón', 'chao don'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_8', hanzi: '旅游', pinyin: 'lǚyóu', meanings: ['du lịch', 'du lich', 'đi du lịch'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_9', hanzi: '运动', pinyin: 'yùndòng', meanings: ['vận động', 'thể thao', 'van dong'], category: 'hsk-2', categoryLabel: 'HSK 2' },
    { id: 'h2_10', hanzi: '时间', pinyin: 'shíjiān', meanings: ['thời gian', 'thoi gian'], category: 'hsk-2', categoryLabel: 'HSK 2' },

    // HSK 3
    { id: 'h3_1', hanzi: '打算', pinyin: 'dǎsuàn', meanings: ['dự định', 'kế hoạch', 'du dinh'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_2', hanzi: '容易', pinyin: 'róngyì', meanings: ['dễ', 'dễ dàng', 'de dang'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_3', hanzi: '满意', pinyin: 'mǎnyì', meanings: ['hài lòng', 'thỏa mãn', 'hai long'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_4', hanzi: '经理', pinyin: 'jīnglǐ', meanings: ['giám đốc', 'quản lý', 'kinh lý'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_5', hanzi: '解决', pinyin: 'jiějué', meanings: ['giải quyết', 'giai quyet'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_6', hanzi: '努力', pinyin: 'nǔlì', meanings: ['nỗ lực', 'cố gắng', 'cham chi', 'chăm chỉ'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_7', hanzi: '相信', pinyin: 'xiāngxìn', meanings: ['tin tưởng', 'tin', 'tin tuong'], category: 'hsk-3', categoryLabel: 'HSK 3' },
    { id: 'h3_8', hanzi: '习惯', pinyin: 'xíguàn', meanings: ['thói quen', 'tập quán', 'thoi quen'], category: 'hsk-3', categoryLabel: 'HSK 3' },

    // Công xưởng
    { id: 'cx_1', hanzi: '工厂', pinyin: 'gōngchǎng', meanings: ['nhà máy', 'nhà xưởng', 'xưởng', 'nha may'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_2', hanzi: '车间', pinyin: 'chējiān', meanings: ['phân xưởng', 'xưởng', 'phan xuong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_3', hanzi: '主管', pinyin: 'zhǔguǎn', meanings: ['quản lý', 'chủ quản', 'quan ly'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_4', hanzi: '组长', pinyin: 'zǔzhǎng', meanings: ['tổ trưởng', 'to truong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_5', hanzi: '安全', pinyin: 'ānquán', meanings: ['an toàn', 'an toan'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_6', hanzi: '质量', pinyin: 'zhìliàng', meanings: ['chất lượng', 'chat luong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_7', hanzi: '产量', pinyin: 'chǎnliàng', meanings: ['sản lượng', 'san luong'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_8', hanzi: '机器', pinyin: 'jīqì', meanings: ['máy móc', 'máy', 'may moc'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_9', hanzi: '零件', pinyin: 'língjiàn', meanings: ['linh kiện', 'phụ tùng', 'linh kien'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },
    { id: 'cx_10', hanzi: '仓库', pinyin: 'cāngkù', meanings: ['kho', 'nhà kho', 'cang cu'], category: 'cong-xuong', categoryLabel: 'Công xưởng' },

    // Trẻ em
    { id: 'te_1', hanzi: '红色', pinyin: 'hóngsè', meanings: ['màu đỏ', 'đỏ', 'mau do'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_2', hanzi: '黄色', pinyin: 'huángsè', meanings: ['màu vàng', 'vàng', 'mau vang'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_3', hanzi: '蓝色', pinyin: 'lánsè', meanings: ['màu xanh dương', 'xanh lam', 'màu xanh', 'xanh da trời'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_4', hanzi: '大熊猫', pinyin: 'dàxióngmāo', meanings: ['gấu trúc', 'gau truc', 'gấu trúc khổng lồ'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_5', hanzi: '兔子', pinyin: 'tùzi', meanings: ['thỏ', 'con thỏ', 'tho'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_6', hanzi: '太阳', pinyin: 'tàiyáng', meanings: ['mặt trời', 'ông mặt trời', 'mat troi'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_7', hanzi: '月亮', pinyin: 'yuèliang', meanings: ['mặt trăng', 'ông trăng', 'mat trang'], category: 'tre-em', categoryLabel: 'Trẻ em' },
    { id: 'te_8', hanzi: '朋友', pinyin: 'péngyou', meanings: ['bạn bè', 'bạn', 'ban be'], category: 'tre-em', categoryLabel: 'Trẻ em' },
];

function removeVietnameseAccents(str: string): string {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

function cleanInput(str: string): string {
    return str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
        .trim();
}

// Web Audio API Synthesizer (No external MP3 files needed)
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

    playCorrect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Chime: C5 -> E5 -> G5
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.start(now);
        osc.stop(now + 0.45);
    }

    playDissolve() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Sweep frequency up
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.start(now);
        osc.stop(now + 0.35);
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
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(140, now + 0.15);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.start(now);
        osc.stop(now + 0.35);
    }
}

const sfx = new SoundEffects();

export default function GameClient() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
    const [inputVal, setInputVal] = useState('');
    const [timeLeft, setTimeLeft] = useState(10);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [showPinyin, setShowPinyin] = useState(true);
    const [soundOn, setSoundOn] = useState(true);
    const [isDissolving, setIsDissolving] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);
    const [wrongShake, setWrongShake] = useState(false);
    const [history, setHistory] = useState<Array<{ hanzi: string; pinyin: string; correct: boolean; meaning: string }>>([]);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const wordPoolRef = useRef<WordItem[]>([]);

    // Load High score from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('hsk_game_highscore');
        if (saved) setBestScore(parseInt(saved, 10));
    }, []);

    // Filter words by category
    const getFilteredWords = useCallback(() => {
        if (selectedCategory === 'all') return VOCAB_DATABASE;
        return VOCAB_DATABASE.filter(w => w.category === selectedCategory);
    }, [selectedCategory]);

    // Spawn a random new word
    const nextWord = useCallback(() => {
        setIsDissolving(false);
        setParticles([]);
        setInputVal('');

        let pool = wordPoolRef.current;
        if (pool.length === 0) {
            pool = [...getFilteredWords()].sort(() => Math.random() - 0.5);
            wordPoolRef.current = pool;
        }

        const picked = pool.pop();
        if (picked) {
            setCurrentWord(picked);
            setTimeLeft(10);
        } else {
            setGameState('gameover');
        }
    }, [getFilteredWords]);

    // Start game
    const startGame = () => {
        sfx.init();
        setGameState('playing');
        setScore(0);
        setStreak(0);
        setLives(3);
        setHistory([]);
        wordPoolRef.current = [...getFilteredWords()].sort(() => Math.random() - 0.5);
        nextWord();
    };

    // Trigger Particle Dissolve Burst
    const triggerDissolve = () => {
        setIsDissolving(true);
        sfx.playDissolve();
        sfx.playCorrect();

        // Generate 24 floating spark particles
        const newParticles = [];
        const colors = ['#c0392b', '#f39c12', '#e74c3c', '#f1c40f', '#ffffff', '#2ecc71'];
        for (let i = 0; i < 28; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 120;
            newParticles.push({
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 6 + Math.random() * 10,
            });
        }
        setParticles(newParticles);

        setTimeout(() => {
            nextWord();
        }, 550);
    };

    // Handle check answer
    const checkAnswer = (text: string) => {
        if (!currentWord || isDissolving) return;

        const cleanTyped = cleanInput(text);
        const unaccentedTyped = removeVietnameseAccents(cleanTyped);

        const isMatch = currentWord.meanings.some(m => {
            const cleanMeaning = cleanInput(m);
            const unaccentedMeaning = removeVietnameseAccents(cleanMeaning);
            return cleanTyped === cleanMeaning || unaccentedTyped === unaccentedMeaning;
        });

        if (isMatch) {
            // Correct!
            const bonus = Math.max(1, Math.floor(timeLeft / 2));
            const multiplier = streak >= 5 ? 3 : streak >= 2 ? 2 : 1;
            const pointsEarned = (10 + bonus) * multiplier;

            setScore(prev => {
                const newScore = prev + pointsEarned;
                if (newScore > bestScore) {
                    setBestScore(newScore);
                    localStorage.setItem('hsk_game_highscore', newScore.toString());
                }
                return newScore;
            });

            setStreak(prev => prev + 1);
            setHistory(prev => [{ hanzi: currentWord.hanzi, pinyin: currentWord.pinyin, correct: true, meaning: currentWord.meanings[0] }, ...prev]);
            triggerDissolve();
        }
    };

    // Handle Time Out
    const handleTimeOut = useCallback(() => {
        if (!currentWord) return;
        sfx.playWrong();
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);

        setStreak(0);
        setHistory(prev => [{ hanzi: currentWord.hanzi, pinyin: currentWord.pinyin, correct: false, meaning: currentWord.meanings[0] }, ...prev]);

        setLives(prev => {
            const nextLives = prev - 1;
            if (nextLives <= 0) {
                setGameState('gameover');
            } else {
                nextWord();
            }
            return nextLives;
        });
    }, [currentWord, nextWord]);

    // Timer Tick
    useEffect(() => {
        if (gameState !== 'playing' || isDissolving) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    handleTimeOut();
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameState, isDissolving, handleTimeOut]);

    // Keep focus in input box
    useEffect(() => {
        if (gameState === 'playing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameState, currentWord, isDissolving]);

    // Toggle sound
    const toggleSound = () => {
        setSoundOn(prev => {
            sfx.enabled = !prev;
            return !prev;
        });
    };

    return (
        <div className="min-h-screen py-12 px-4 relative overflow-hidden">
            {/* Background floating decor */}
            <div className="absolute top-10 left-10 text-9xl font-[family:var(--font-serif)] text-[var(--accent)]/5 select-none pointer-events-none">
                字
            </div>
            <div className="absolute bottom-10 right-10 text-9xl font-[family:var(--font-serif)] text-[var(--accent)]/5 select-none pointer-events-none">
                语
            </div>

            <div className="container-app max-w-3xl mx-auto relative z-10">
                {/* Header title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 badge-gradient mb-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        <span>🎮</span> Game Luyện Phản Xạ Hán Tự
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight mb-2">
                        Từ Vựng <span className="text-gradient-accent">Tan Biến</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--muted)] max-w-lg mx-auto">
                        Chữ Hán xuất hiện kèm đồng hồ đếm ngược. Gõ nhanh nghĩa tiếng Việt chuẩn để làm tan biến từ vựng và ghi điểm combo!
                    </p>
                </div>

                {/* START SCREEN */}
                {gameState === 'idle' && (
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-center">
                        <div className="text-6xl mb-4 animate-bounce">
                            🏮
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3">
                            Chọn Chủ Đề Từ Vựng
                        </h2>
                        <p className="text-sm text-[var(--muted)] mb-8 max-w-md mx-auto">
                            Lựa chọn cấp độ phù hợp để thử thách tốc độ phản xạ não bộ của bạn:
                        </p>

                        {/* Category selection */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                            {[
                                { id: 'all', label: 'Tất cả chủ đề', icon: '🌟' },
                                { id: 'hsk-1', label: 'HSK 1 (Sơ cấp)', icon: '🎯' },
                                { id: 'hsk-2', label: 'HSK 2 (Cơ bản)', icon: '📗' },
                                { id: 'hsk-3', label: 'HSK 3 (Trung cấp)', icon: '📘' },
                                { id: 'cong-xuong', label: 'Công xưởng', icon: '🏭' },
                                { id: 'tre-em', label: 'Trẻ em', icon: '🎨' },
                            ].map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`p-4 rounded-2xl border text-sm font-semibold transition-all flex flex-col items-center gap-1.5 ${
                                        selectedCategory === cat.id
                                            ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md scale-105'
                                            : 'bg-white/60 text-[var(--text)] border-[var(--border)] hover:bg-white'
                                    }`}
                                >
                                    <span className="text-2xl">{cat.icon}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                type="button"
                                onClick={startGame}
                                className="btn btn-primary px-10 py-4 text-lg font-bold shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
                            >
                                Bắt Đầu Chơi Ngay 🔥
                            </button>
                        </div>

                        {bestScore > 0 && (
                            <div className="mt-8 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)] flex items-center justify-center gap-2">
                                <span>🏆 Kỷ lục cao nhất của bạn:</span>
                                <strong className="text-base text-[var(--accent)]">{bestScore} điểm</strong>
                            </div>
                        )}
                    </div>
                )}

                {/* PLAYING SCREEN */}
                {gameState === 'playing' && currentWord && (
                    <div className="space-y-6">
                        {/* Top Bar Stats */}
                        <div className="card p-4 sm:p-5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 shadow-md flex items-center justify-between gap-4">
                            {/* Lives */}
                            <div className="flex items-center gap-1 text-xl sm:text-2xl">
                                {[...Array(3)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`transition-transform duration-300 ${
                                            i < lives ? 'scale-100 opacity-100' : 'scale-75 opacity-25 grayscale'
                                        }`}
                                    >
                                        ❤️
                                    </span>
                                ))}
                            </div>

                            {/* Score & Streak */}
                            <div className="text-center">
                                <div className="text-xs uppercase font-semibold text-[var(--muted)] tracking-wider">
                                    Điểm Số
                                </div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">
                                    {score}
                                </div>
                                {streak >= 2 && (
                                    <div className="text-[11px] font-bold text-amber-600 animate-pulse">
                                        🔥 {streak} COMBO ({streak >= 5 ? 'x3' : 'x2'})
                                    </div>
                                )}
                            </div>

                            {/* Sound & Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={toggleSound}
                                    title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
                                    className="w-10 h-10 rounded-xl bg-white/70 border border-[var(--border)] flex items-center justify-center text-base hover:bg-white transition"
                                >
                                    {soundOn ? '🔊' : '🔇'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPinyin(prev => !prev)}
                                    title="Bật/Tắt gợi ý Pinyin"
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                                        showPinyin
                                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                                            : 'bg-white/70 text-[var(--muted)] border-[var(--border)]'
                                    }`}
                                >
                                    Pinyin: {showPinyin ? 'BẬT' : 'TẮT'}
                                </button>
                            </div>
                        </div>

                        {/* Countdown Timer Bar */}
                        <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden shadow-inner p-0.5 border border-white/60">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 linear ${
                                    timeLeft > 5
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                                        : timeLeft > 2
                                        ? 'bg-gradient-to-r from-yellow-500 to-amber-400'
                                        : 'bg-gradient-to-r from-red-600 to-rose-500 animate-pulse'
                                }`}
                                style={{ width: `${(timeLeft / 10) * 100}%` }}
                            />
                        </div>

                        {/* Central Word Display Box with Dissolve Effect */}
                        <div
                            className={`card relative min-h-[260px] sm:min-h-[300px] rounded-[3rem] p-8 flex flex-col items-center justify-center bg-white/45 backdrop-blur-2xl border border-white/50 shadow-2xl transition-all duration-300 ${
                                wrongShake ? 'animate-[shake_0.5s_ease-in-out]' : ''
                            }`}
                        >
                            {/* Category pill */}
                            <div className="absolute top-5 left-6">
                                <span className="badge-gradient text-xs px-3 py-1 rounded-full font-bold">
                                    {currentWord.categoryLabel}
                                </span>
                            </div>

                            {/* Timer circle badge */}
                            <div
                                className={`absolute top-5 right-6 w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shadow-sm border ${
                                    timeLeft <= 3
                                        ? 'bg-red-50 text-red-600 border-red-300 animate-ping'
                                        : 'bg-white/80 text-[var(--muted)] border-white/80'
                                }`}
                            >
                                {timeLeft}s
                            </div>

                            {/* Particles when dissolving */}
                            {particles.map(p => (
                                <span
                                    key={p.id}
                                    className="absolute rounded-full pointer-events-none transition-all duration-500 ease-out z-20"
                                    style={{
                                        width: `${p.size}px`,
                                        height: `${p.size}px`,
                                        backgroundColor: p.color,
                                        transform: `translate(${p.x}px, ${p.y}px) scale(0)`,
                                        opacity: isDissolving ? 0.9 : 0,
                                        boxShadow: `0 0 10px ${p.color}`,
                                    }}
                                />
                            ))}

                            {/* Chinese Character */}
                            <div
                                className={`transition-all duration-500 select-none text-center ${
                                    isDissolving
                                        ? 'scale-150 blur-lg opacity-0 rotate-6 filter'
                                        : 'scale-100 blur-0 opacity-100'
                                }`}
                            >
                                <div className="text-6xl sm:text-8xl font-[family:var(--font-serif)] font-extrabold text-[var(--accent)] tracking-wider drop-shadow-sm mb-2">
                                    {currentWord.hanzi}
                                </div>

                                {showPinyin && (
                                    <div className="text-lg sm:text-2xl font-medium text-[var(--muted)] tracking-wide">
                                        [{currentWord.pinyin}]
                                    </div>
                                )}
                            </div>

                            {isDissolving && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                                    <span className="text-2xl sm:text-4xl font-extrabold text-emerald-600 bg-white/90 px-6 py-2 rounded-2xl shadow-xl animate-bounce">
                                        ✨ CHÍNH XÁC!
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Input Form */}
                        <div className="card p-4 sm:p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    checkAnswer(inputVal);
                                }}
                                className="space-y-3"
                            >
                                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center">
                                    Gõ nghĩa tiếng Việt vào đây (nhấn Enter để kiểm tra):
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        disabled={isDissolving}
                                        value={inputVal}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setInputVal(val);
                                            checkAnswer(val); // Instant trigger if matches!
                                        }}
                                        placeholder="Ví dụ: xin chào, cảm ơn, trà..."
                                        className="w-full px-5 py-4 text-center rounded-2xl border-2 border-[var(--border)] focus:border-[var(--accent)] bg-white/80 text-lg sm:text-xl font-bold text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/20 transition-all shadow-inner"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        spellCheck="false"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isDissolving || !inputVal.trim()}
                                        className="btn btn-primary px-6 rounded-2xl font-bold shrink-0 text-base shadow-md disabled:opacity-50"
                                    >
                                        Gửi →
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Skip button & helper */}
                        <div className="flex justify-between items-center text-xs text-[var(--muted)] px-2">
                            <span>Gợi ý: Gõ có dấu hoặc không dấu đều được tính điểm!</span>
                            <button
                                type="button"
                                onClick={handleTimeOut}
                                className="hover:text-[var(--accent)] font-semibold underline"
                            >
                                Bỏ qua từ này (Mất 1 tim) →
                            </button>
                        </div>
                    </div>
                )}

                {/* GAME OVER SCREEN */}
                {gameState === 'gameover' && (
                    <div className="card rounded-[2.5rem] p-8 sm:p-12 bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl text-center space-y-6">
                        <div className="text-6xl animate-pulse">
                            🏁
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
                            Kết Thúc Lượt Chơi!
                        </h2>

                        {/* Scores summary */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)]">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Điểm của bạn</div>
                                <div className="text-3xl font-extrabold text-[var(--accent)] mt-1">{score}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)]">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Kỷ lục cao nhất</div>
                                <div className="text-3xl font-extrabold text-amber-600 mt-1">{bestScore}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/60 border border-[var(--border)] col-span-2 sm:col-span-1">
                                <div className="text-xs text-[var(--muted)] font-semibold uppercase">Số từ trả lời</div>
                                <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                                    {history.filter(h => h.correct).length}/{history.length}
                                </div>
                            </div>
                        </div>

                        {/* History Review */}
                        {history.length > 0 && (
                            <div className="text-left mt-6">
                                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-3">
                                    Từ vựng vừa ôn tập:
                                </h3>
                                <div className="max-h-56 overflow-y-auto space-y-2 pr-2">
                                    {history.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                                                item.correct
                                                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                                                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-base font-[family:var(--font-serif)]">{item.hanzi}</span>
                                                <span className="text-xs opacity-75">[{item.pinyin}]</span>
                                                <span>👉 {item.meaning}</span>
                                            </div>
                                            <span className="font-bold">{item.correct ? '✓ Đúng' : '✗ Hết giờ'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                type="button"
                                onClick={startGame}
                                className="btn btn-primary px-8 py-3.5 font-bold text-base shadow-lg hover:scale-105 transition-all"
                            >
                                🔄 Chơi Lại Lượt Mới
                            </button>
                            <button
                                type="button"
                                onClick={() => setGameState('idle')}
                                className="btn btn-secondary px-8 py-3.5 font-bold text-base"
                            >
                                📋 Chọn Cấp Độ Khác
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
