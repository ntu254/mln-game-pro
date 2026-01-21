import React, { useState, useEffect } from 'react';
import { useSound } from './SoundContext';

interface LevelThreeGameProps {
    onExit: () => void;
}

// --- ASSETS ---
// Using the generated image for Horse Cart, and reliable external placeholders for others
const IMAGES = {
    HORSE_CART: 'https://img.pikbest.com/ai/illus_our/20230423/5883fbc769cfd0ca5651b47f3a4f392c.jpg!sw800',
    ICE_CAR: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', // Classic Blue Car
    EV_CAR: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'   // Modern EV
};

// --- DATA ---
const GAME_STEPS = {
    INTRO: 'intro',
    THESIS: 'thesis',
    ANTITHESIS: 'antithesis',
    SYNTHESIS: 'synthesis',
    PRE_COMPLETE: 'pre_complete',
    COMPLETE: 'complete'
};

const THESIS_DATA = {
    title: "01. Khẳng định ban đầu",
    prompt: "Hãy chọn phương tiện vận chuyển sơ khai, dựa vào sức kéo tự nhiên.",
    options: [
        {
            id: 'cart',
            text: "Xe Ngựa",
            image: IMAGES.HORSE_CART,
            isCorrect: true,
            feedback: "Chính xác! Xe ngựa là phương tiện phổ biến thời kỳ đầu."
        },
        {
            id: 'push',
            text: "Xe Kéo tay",
            image: "https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_11_09/xe-bao-3403.jpg",
            isCorrect: false,
            feedback: "Chưa chính xác. Xe đẩy tay thô sơ hơn và dùng sức người."
        },
        {
            id: 'train',
            text: "Xe Lửa",
            image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000&auto=format&fit=crop",
            isCorrect: false,
            feedback: "Sai rồi. Xe lửa xuất hiện muộn hơn khi có động cơ hơi nước."
        }
    ],
    stageInfo: {
        id: 1,
        title: "Xe Ngựa",
        image: IMAGES.HORSE_CART,
        color: "amber",
        gradient: "from-amber-700 to-orange-600",
        shadow: "shadow-orange-500/20"
    }
};

const ANTITHESIS_DATA = {
    title: "02. Phủ định lần 1 (Cái đối lập xuất hiện)",
    prompt: "Xe ngựa quá chậm và hạn chế. Cần một bước nhảy vọt để 'phủ định' sức kéo sinh học.",
    options: [
        {
            id: 'horse_plus',
            text: "Nuôi nhiều ngựa hơn",
            image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop",
            isCorrect: false,
            feedback: "Sai. Đây chỉ là thay đổi về Lượng, chưa thay đổi về Chất."
        },
        {
            id: 'ice',
            text: "Động cơ đốt trong",
            image: IMAGES.ICE_CAR,
            isCorrect: true,
            feedback: "Chính xác! Động cơ thay thế sức ngựa là bước nhảy vọt về công nghệ."
        },
        {
            id: 'bike',
            text: "Xe đạp",
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop",
            isCorrect: false,
            feedback: "Sai. Xe đạp vẫn dùng sức người."
        }
    ],
    stageInfo: {
        id: 2,
        title: "Xe Động cơ đốt trong",
        image: IMAGES.ICE_CAR,
        color: "cyan",
        gradient: "from-blue-700 to-cyan-600",
        shadow: "shadow-cyan-500/20"
    }
};

const SYNTHESIS_TRAITS = [
    { id: 1, text: "Cấu trúc bánh xe", type: "inherit", icon: "tire_repair" },
    { id: 2, text: "Khí thải CO2", type: "discard", icon: "air" },
    { id: 3, text: "Tiện nghi Cabin", type: "inherit", icon: "chair" },
    { id: 4, text: "Tiếng ồn động cơ", type: "discard", icon: "volume_up" },
    { id: 5, text: "Tốc độ di chuyển", type: "inherit", icon: "speed" },
    { id: 6, text: "Nhiên liệu hóa thạch", type: "discard", icon: "oil_barrel" }
];

// --- COMPONENT: Selection Overlay ---
const SelectionOverlay: React.FC<{
    data: any;
    onComplete: () => void;
    playSound: (type: string) => void;
}> = ({ data, onComplete, playSound }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSelect = (option: any) => {
        if (isSuccess) return;
        setSelectedOption(option.id);
        setFeedback(option.feedback);

        if (option.isCorrect) {
            playSound('correct');
            setIsSuccess(true);
            setTimeout(onComplete, 2000);
        } else {
            playSound('wrong');
            setIsSuccess(false);
        }
    };

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="max-w-[90vw] w-full flex flex-col items-center">
                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 uppercase tracking-wider text-center drop-shadow-lg">{data.title}</h3>
                <p className="text-slate-300 text-2xl mb-12 text-center max-w-3xl font-light">{data.prompt}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {data.options.map((opt: any) => (
                        <button
                            key={opt.id}
                            onClick={() => handleSelect(opt)}
                            disabled={isSuccess}
                            className={`group relative h-[300px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden border-2 transition-all duration-500 flex flex-col shadow-2xl
                ${selectedOption === opt.id
                                    ? isSuccess
                                        ? 'border-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.5)] scale-[1.02]'
                                        : 'border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)]'
                                    : 'border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:-translate-y-2'
                                }
              `}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0">
                                <img src={opt.image} alt={opt.text} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 mt-auto p-6 text-left w-full">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{opt.text}</span>
                                    {selectedOption === opt.id && (
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                            <span className="material-symbols-outlined text-white text-lg">
                                                {isSuccess ? 'check' : 'close'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Selection Glow */}
                            {selectedOption === opt.id && isSuccess && (
                                <div className="absolute inset-0 border-4 border-emerald-500 rounded-2xl animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </div>

                {feedback && (
                    <div className={`mt-8 px-6 py-4 rounded-full text-lg font-medium animate-in fade-in slide-in-from-bottom-4 shadow-lg flex items-center gap-3 backdrop-blur-xl ${isSuccess ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
                        <span className="material-symbols-outlined text-2xl">{isSuccess ? 'celebration' : 'error'}</span>
                        {feedback}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COMPONENT: Synthesis Filter ---
const SynthesisFilter: React.FC<{
    onComplete: () => void;
    playSound: (type: string) => void;
}> = ({ onComplete, playSound }) => {
    const [items, setItems] = useState(SYNTHESIS_TRAITS.map(t => ({ ...t, status: 'unassigned' })));
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleAction = (id: number, action: 'keep' | 'discard') => {
        const item = items.find(i => i.id === id);
        if (!item) return;

        const isCorrect = (action === 'keep' && item.type === 'inherit') || (action === 'discard' && item.type === 'discard');

        if (isCorrect) {
            playSound('pop');
            setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i));
            setFeedback(null);
        } else {
            playSound('wrong');
            setFeedback(action === 'keep'
                ? "Không thể mang đặc điểm tiêu cực này sang tương lai!"
                : "Đừng bỏ phí những giá trị cốt lõi cần kế thừa!"
            );
        }
    };

    useEffect(() => {
        if (items.every(i => i.status !== 'unassigned')) {
            playSound('success');
            setTimeout(onComplete, 2000);
        }
    }, [items, onComplete, playSound]);

    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
            <div className="max-w-7xl w-full h-[80vh] flex flex-col">
                <div className="text-center mb-8 shrink-0">
                    <div className="inline-flex items-center gap-2 border border-purple-500/50 bg-purple-500/10 px-6 py-2 rounded-full text-purple-300 text-sm font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <span className="material-symbols-outlined text-base animate-pulse">science</span>
                        Phòng Thí Nghiệm Biện Chứng
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2">03. Phủ định lần 2 (Phủ định của phủ định)</h2>
                    <p className="text-slate-400 text-lg">"Giống cái ban đầu về hình thức nhưng cao hơn về chất"</p>
                </div>

                <div className="flex-1 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 h-full overflow-y-auto md:overflow-hidden p-1">
                    {/* DISCARD ZONE */}
                    <div className="md:col-span-3 bg-rose-950/30 border-2 border-dashed border-rose-500/30 rounded-2xl md:rounded-3xl flex flex-col items-center p-4 md:p-6 relative group overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors"></div>
                        <div className="flex md:flex-col items-center gap-2 md:gap-0 mb-2 md:mb-4">
                            <span className="material-symbols-outlined text-4xl md:text-6xl text-rose-500/50 md:mb-4 group-hover:scale-110 transition-transform">delete_forever</span>
                            <div>
                                <h3 className="text-rose-400 font-bold text-lg md:text-xl uppercase tracking-wider mb-0 md:mb-2">Lọc Bỏ</h3>
                                <p className="text-rose-300/50 text-[10px] md:text-xs text-center hidden md:block">Yếu tố tiêu cực, lạc hậu</p>
                            </div>
                        </div>

                        <div className="w-full space-y-2 md:space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[100px] md:max-h-full">
                            {items.filter(i => i.status === 'discard').map(i => (
                                <div key={i.id} className="bg-rose-500/20 text-rose-200 p-2 md:p-4 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 md:gap-3 animate-scale-in-bounce border border-rose-500/30 shadow-lg">
                                    <span className="material-symbols-outlined text-base md:text-lg">{i.icon}</span>
                                    {i.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOURCE ITEMS */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center relative py-4 md:py-0">
                        <div className="w-full max-w-lg space-y-3 md:space-y-4">
                            {items.filter(i => i.status === 'unassigned').map(item => (
                                <div key={item.id} className="bg-[#2A2A35] border border-white/10 p-3 md:p-4 rounded-2xl flex items-center justify-between gap-4 md:gap-6 shadow-xl transform transition-all hover:scale-105 hover:bg-[#323240] animate-fadeIn">
                                    <button
                                        onClick={() => handleAction(item.id, 'discard')}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 flex items-center justify-center transition-all border border-rose-500/30 group shrink-0"
                                    >
                                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">west</span>
                                    </button>

                                    <div className="flex-1 text-center">
                                        <span className="material-symbols-outlined text-2xl md:text-3xl text-slate-400 mb-1 block">{item.icon}</span>
                                        <span className="font-bold text-white text-sm md:text-lg">{item.text}</span>
                                    </div>

                                    <button
                                        onClick={() => handleAction(item.id, 'keep')}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 flex items-center justify-center transition-all border border-emerald-500/30 group shrink-0"
                                    >
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
                                    </button>
                                </div>
                            ))}

                            {items.every(i => i.status !== 'unassigned') && (
                                <div className="flex flex-col items-center animate-bounce-soft">
                                    <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] mb-4">
                                        <span className="material-symbols-outlined text-3xl md:text-5xl text-white">check</span>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-black text-white">HOÀN TẤT!</div>
                                </div>
                            )}
                        </div>

                        {/* Center Line visual - Hidden on mobile */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -z-10 hidden md:block"></div>
                    </div>

                    {/* KEEP ZONE */}
                    <div className="md:col-span-3 bg-emerald-950/30 border-2 border-dashed border-emerald-500/30 rounded-2xl md:rounded-3xl flex flex-col items-center p-4 md:p-6 relative group overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
                        <div className="flex md:flex-col items-center gap-2 md:gap-0 mb-2 md:mb-4">
                            <span className="material-symbols-outlined text-4xl md:text-6xl text-emerald-500/50 md:mb-4 group-hover:scale-110 transition-transform">upgrade</span>
                            <div>
                                <h3 className="text-emerald-400 font-bold text-lg md:text-xl uppercase tracking-wider mb-0 md:mb-2">Kế Thừa</h3>
                                <p className="text-emerald-300/50 text-[10px] md:text-xs text-center hidden md:block">Yếu tố tích cực, cốt lõi</p>
                            </div>
                        </div>

                        <div className="w-full space-y-2 md:space-y-3 overflow-y-auto pl-2 custom-scrollbar max-h-[100px] md:max-h-full">
                            {items.filter(i => i.status === 'keep').map(i => (
                                <div key={i.id} className="bg-emerald-500/20 text-emerald-200 p-2 md:p-4 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 md:gap-3 animate-scale-in-bounce border border-emerald-500/30 shadow-lg">
                                    <span className="material-symbols-outlined text-base md:text-lg">{i.icon}</span>
                                    {i.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {feedback && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-red-500 rounded-2xl text-white font-bold shadow-[0_0_50px_rgba(239,68,68,0.4)] flex items-center gap-3 animate-shake">
                        <span className="material-symbols-outlined text-2xl">warning</span>
                        {feedback}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- COMPONENT: Spiral Visual ---
const SpiralVisual: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="relative w-full max-w-[600px] h-[700px] mx-auto perspective-1000">
            {/* SVG Spiral Path */}
            <svg className="absolute inset-0 w-full h-full visible pointer-events-none z-0" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 200 580 C 20 580, 20 450, 200 400 C 380 350, 380 250, 200 200 C 20 150, 20 50, 200 20"
                    stroke="url(#spiral-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="8 8"
                    className="opacity-30"
                />
                <path // Progress Path
                    d="M 200 580 C 20 580, 20 450, 200 400 C 380 350, 380 250, 200 200 C 20 150, 20 50, 200 20"
                    stroke="#a855f7" // Purple
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    strokeDashoffset={progress >= 4 ? 0 : progress >= 3 ? 300 : progress >= 2 ? 600 : 1000}
                    className="transition-all duration-[2000ms] ease-out drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                />
                <defs>
                    <linearGradient id="spiral-gradient" x1="200" y1="580" x2="200" y2="20" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#d97706" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Nodes */}
            {/* 1. Thesis - Adjusted to bottom center */}
            {progress >= 2 && (
                <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 animate-scale-in-bounce z-10 w-24 h-24 group">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)] bg-black overflow-hidden hover:scale-110 transition-transform duration-500">
                        <img src={THESIS_DATA.stageInfo.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Thesis" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-40">
                        <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider whitespace-nowrap bg-black/80 px-2 py-0.5 rounded-full">01. Khẳng định</span>
                        <div className="font-bold text-white text-sm mt-1">Xe Ngựa</div>
                    </div>
                </div>
            )}

            {/* 2. Antithesis - Adjusted to Right Bulge area */}
            {progress >= 3 && (
                <div className="absolute top-[35%] right-[5%] animate-scale-in-bounce z-10 w-24 h-24 group">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-black overflow-hidden hover:scale-110 transition-transform duration-500">
                        <img src={ANTITHESIS_DATA.stageInfo.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity hue-rotate-15" alt="Antithesis" />
                    </div>
                    <div className="absolute top-1/2 -right-32 -translate-y-1/2 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-32">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider whitespace-nowrap bg-black/80 px-2 py-0.5 rounded-full">02. Phủ định</span>
                        <div className="font-bold text-white text-sm mt-1">Xe Động cơ</div>
                    </div>
                </div>
            )}

            {/* 3. Synthesis - Adjusted to Top Center */}
            {progress >= 4 && (
                <div className="absolute top-[0%] left-1/2 -translate-x-1/2 animate-scale-in-bounce z-20 w-32 h-32 group">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.6)] bg-black overflow-hidden animate-pulse-slow hover:scale-105 transition-transform duration-500">
                        <img src={IMAGES.EV_CAR} className="w-full h-full object-cover" alt="Synthesis" />
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center w-48">
                        <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider whitespace-nowrap bg-black/80 px-2 py-1 rounded-full">03. Phủ định của phủ định</span>
                        <div className="font-bold text-white text-lg drop-shadow-lg mt-1">Xe Điện Thông Minh</div>
                    </div>
                </div>
            )}
        </div>
    );
};


const LevelThreeGame: React.FC<LevelThreeGameProps> = ({ onExit }) => {
    const { playSound, playBGM, stopBGM } = useSound();

    useEffect(() => {
        playBGM('ambient');
        return () => stopBGM();
    }, [playBGM, stopBGM]);

    const [step, setStep] = useState(GAME_STEPS.INTRO);

    const handleSynthesisComplete = () => {
        setStep(GAME_STEPS.PRE_COMPLETE);
        setTimeout(() => {
            setStep(GAME_STEPS.COMPLETE);
        }, 5000);
    };

    return (
        <div className="absolute inset-0 z-50 bg-[#0B0B10] flex flex-col font-display text-white overflow-hidden selection:bg-purple-500/30 h-[100dvh]">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#0B0B10] to-[#0B0B10] pointer-events-none"></div>
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

            {/* --- HEADER --- */}
            <header className="h-20 glass-panel flex items-center justify-between px-8 z-20 shrink-0 relative border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <span className="material-symbols-outlined text-2xl text-white">cyclone</span>
                    </div>
                    <div>
                        <div className="text-white font-black text-xl tracking-tighter leading-none">Dialectics Spiral</div>
                        <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest leading-tight">Cấp độ 3</div>
                    </div>
                </div>
                <button onClick={onExit} className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 flex items-center justify-center transition-colors border border-white/5 hover:border-red-500/30">
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </header>

            {/* --- CONTENT --- */}
            <div className="flex-1 relative w-full h-full overflow-hidden">
                {/* Visual Layer */}
                <div className={`absolute inset-0 transition-all duration-1000 ${step === GAME_STEPS.INTRO ? 'opacity-30 blur-md scale-90' : 'opacity-100 blur-0 scale-100'}`}>
                    <SpiralVisual progress={
                        step === GAME_STEPS.THESIS ? 1 :
                            step === GAME_STEPS.ANTITHESIS ? 2 :
                                step === GAME_STEPS.SYNTHESIS ? 3 :
                                    (step === GAME_STEPS.PRE_COMPLETE || step === GAME_STEPS.COMPLETE) ? 4 : 1
                    } />
                </div>

                {/* Scrollable Overlay for Content */}
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar flex flex-col items-center justify-center z-10 p-4">

                    {/* --- STEPS --- */}

                    {/* 1. INTRO */}
                    {step === GAME_STEPS.INTRO && (
                        <div className="relative z-20 text-center p-10 max-w-4xl animate-fadeInUp">
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>SPIRAL</span>
                                <br />EVOLUTION
                            </h1>
                            <p className="text-2xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                                Khám phá quy luật <strong className="text-white font-bold">Phủ định của phủ định</strong> thông qua lịch sử tiến hóa của phương tiện giao thông.
                            </p>
                            <button
                                onClick={() => { playSound('click'); setStep(GAME_STEPS.THESIS); }}
                                className="group relative px-10 py-5 bg-white text-black font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    BẮT ĐẦU
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 -translate-x-full group-hover:animate-shimmer"></div>
                            </button>
                        </div>
                    )}

                    {/* 2. THESIS SELECTION */}
                    {step === GAME_STEPS.THESIS && (
                        <SelectionOverlay
                            data={THESIS_DATA}
                            onComplete={() => setStep(GAME_STEPS.ANTITHESIS)}
                            playSound={playSound}
                        />
                    )}

                    {/* 3. ANTITHESIS SELECTION */}
                    {step === GAME_STEPS.ANTITHESIS && (
                        <SelectionOverlay
                            data={ANTITHESIS_DATA}
                            onComplete={() => setStep(GAME_STEPS.SYNTHESIS)}
                            playSound={playSound}
                        />
                    )}

                    {/* 4. SYNTHESIS FILTER GAME */}
                    {step === GAME_STEPS.SYNTHESIS && (
                        <SynthesisFilter
                            onComplete={handleSynthesisComplete}
                            playSound={playSound}
                        />
                    )}

                    {/* 5. PRE_COMPLETE (Just delay, no UI) */}
                    {step === GAME_STEPS.PRE_COMPLETE && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-purple-500/20 border border-purple-500/50 text-purple-200 px-6 py-2 rounded-full animate-pulse font-bold backdrop-blur-md shadow-lg z-30">
                            Hoàn tất thiết kế! Đang tổng hợp kết quả...
                        </div>
                    )}

                    {/* 6. COMPLETE */}
                    {step === GAME_STEPS.COMPLETE && (
                        <div className="relative z-20 text-center p-12 animate-fadeInUp bg-black/60 backdrop-blur-xl rounded-[2rem] border border-purple-500/30 shadow-[0_0_100px_rgba(168,85,247,0.3)] max-w-5xl w-full mx-6">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center border-4 border-[#0B0B10] shadow-lg">
                                <span className="material-symbols-outlined text-4xl text-white">workspace_premium</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 mt-8">EVOLUTION COMPLETE</h2>
                            <p className="text-xl text-purple-200 mb-10 font-light">Bạn đã hoàn thành tiến trình phát triển biện chứng.</p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 w-full">
                                {/* 1. Thesis */}
                                <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl flex md:flex-col items-center gap-4 w-full md:w-48 shadow-lg group hover:scale-105 transition-transform">
                                    <img src={THESIS_DATA.stageInfo.image} className="w-16 h-16 rounded-xl object-cover border border-amber-500/50" alt="Thesis" />
                                    <div className="md:text-center">
                                        <div className="text-xs text-amber-500 font-bold uppercase mb-1 tracking-wider">Xuất phát</div>
                                        <div className="font-bold text-white text-lg leading-tight">Xe Ngựa</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center text-slate-500 rotate-90 md:rotate-0">
                                    <span className="material-symbols-outlined text-3xl animate-pulse">arrow_forward</span>
                                </div>

                                {/* 2. Antithesis - ADDED */}
                                <div className="bg-cyan-950/40 border border-cyan-500/30 p-4 rounded-2xl flex md:flex-col items-center gap-4 w-full md:w-48 shadow-lg group hover:scale-105 transition-transform">
                                    <img src={ANTITHESIS_DATA.stageInfo.image} className="w-16 h-16 rounded-xl object-cover border border-cyan-500/50 grayscale group-hover:grayscale-0 transition-all" alt="Antithesis" />
                                    <div className="md:text-center">
                                        <div className="text-xs text-cyan-500 font-bold uppercase mb-1 tracking-wider">Phủ định</div>
                                        <div className="font-bold text-white text-lg leading-tight">Xe Xăng</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center text-slate-500 rotate-90 md:rotate-0">
                                    <span className="material-symbols-outlined text-3xl animate-pulse">arrow_forward</span>
                                </div>

                                {/* 3. Synthesis */}
                                <div className="bg-purple-950/40 border border-purple-500/50 p-4 rounded-2xl flex md:flex-col items-center gap-4 w-full md:w-56 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group hover:scale-110 transition-transform">
                                    <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors"></div>
                                    <img src={IMAGES.EV_CAR} className="w-16 h-16 rounded-xl object-cover border border-purple-500/50" alt="Synthesis" />
                                    <div className="relative z-10 md:text-center">
                                        <div className="text-xs text-purple-400 font-bold uppercase mb-1 tracking-wider">Phủ định của phủ định</div>
                                        <div className="font-bold text-white text-lg leading-tight">Xe Điện</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 justify-center">
                                <button
                                    onClick={() => { setStep(GAME_STEPS.INTRO); }}
                                    className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold transition-colors text-lg"
                                >
                                    Chơi Lại
                                </button>
                                <button
                                    onClick={onExit}
                                    className="px-12 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 text-white font-bold shadow-xl shadow-purple-900/40 transition-all text-lg"
                                >
                                    Hoàn Tất
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default LevelThreeGame;