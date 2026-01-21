import React, { useState, useEffect, useRef } from 'react';

interface LevelTwoGameProps {
    onExit: () => void;
}

// --- CONSTANTS ---
const IMAGES = {
    PAPER_BOOK: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop', // Library/Book aesthetic
    EBOOK: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',     // Tablet/Ereader aesthetic
    SYNTHESIS: 'https://images.unsplash.com/photo-1507842217343-583bb7260b66?q=80&w=800&auto=format&fit=crop' // Modern library/tech blend
};

// --- QUIZ DATABASE về Thống nhất & Đấu tranh các mặt đối lập ---
const QUIZ_DATABASE = [
    {
        question: "Theo quy luật Thống nhất và Đấu tranh của các mặt đối lập, động lực thúc đẩy sự phát triển là gì?",
        options: [
            "Sự yên tĩnh và ổn định tuyệt đối",
            "Mâu thuẫn và đấu tranh giữa các mặt đối lập",
            "Sự can thiệp từ bên ngoài",
            "Sự tích lũy về lượng"
        ],
        correct: 1,
        explanation: "Mâu thuẫn giữa các mặt đối lập là nguồn gốc, động lực bên trong thúc đẩy sự vận động và phát triển của sự vật."
    },
    {
        question: "Sách giấy và Ebook là hai mặt đối lập nhưng thống nhất với nhau vì?",
        options: [
            "Chúng hoàn toàn giống nhau",
            "Chúng không có bất kỳ mối liên hệ nào",
            "Cả hai đều phục vụ mục đích truyền tải tri thức",
            "Một cái sẽ hoàn toàn thay thế cái kia"
        ],
        correct: 2,
        explanation: "Hai mặt đối lập thống nhất với nhau vì chúng tồn tại trong cùng một sự vật, có liên hệ và phụ thuộc lẫn nhau - ở đây là cùng phục vụ mục đích đọc và tiếp nhận tri thức."
    },
    {
        question: "Trong phép biện chứng, 'sự thống nhất của các mặt đối lập' có nghĩa là gì?",
        options: [
            "Hai mặt đối lập không liên quan đến nhau",
            "Các mặt đối lập nương tựa, ràng buộc, quy định lẫn nhau",
            "Chỉ có một mặt tồn tại",
            "Hai mặt đối lập luôn xung đột mà không có điểm chung"
        ],
        correct: 1,
        explanation: "Sự thống nhất của các mặt đối lập nghĩa là chúng nương tựa vào nhau, ràng buộc nhau, chia sẻ cùng bản chất mâu thuẫn và không thể tồn tại nếu thiếu nhau."
    },
    {
        question: "Khi 'đấu tranh' giữa Sách giấy và Ebook diễn ra, kết quả là gì?",
        options: [
            "Cả hai đều biến mất",
            "Hình thành trải nghiệm đọc mới, kết hợp ưu điểm của cả hai",
            "Không có gì thay đổi",
            "Chỉ một bên thắng cuộc hoàn toàn"
        ],
        correct: 1,
        explanation: "Đấu tranh của các mặt đối lập dẫn đến sự phủ định biện chứng, tạo ra cái mới tiến bộ hơn - ở đây là trải nghiệm đọc hiện đại kết hợp ưu điểm của cả hai."
    },
    {
        question: "Ưu điểm nào của sách giấy mà Ebook khó thay thế được?",
        options: [
            "Khả năng tìm kiếm nhanh",
            "Trải nghiệm xúc giác và cảm giác sở hữu vật lý",
            "Tiện lợi khi mang theo nhiều sách",
            "Khả năng điều chỉnh cỡ chữ"
        ],
        correct: 1,
        explanation: "Sách giấy mang lại trải nghiệm xúc giác, mùi hương, và cảm giác sở hữu thực sự - những giá trị tinh thần khó số hóa."
    },
    {
        question: "Ưu điểm nào của Ebook so với sách giấy truyền thống?",
        options: [
            "Mùi thơm đặc trưng của giấy",
            "Cảm giác lật sách thực",
            "Tiện lợi lưu trữ, tìm kiếm và mang theo hàng ngàn cuốn",
            "Giá trị sưu tầm cao"
        ],
        correct: 2,
        explanation: "Ebook mang lại sự tiện lợi tối đa về lưu trữ, tìm kiếm, và khả năng mang theo cả thư viện trong một thiết bị nhỏ gọn."
    }
];

// Các tình huống gameplay thực tế
const SCENARIOS = [
    {
        title: "Đọc sách khi di chuyển",
        description: "Bạn đang trên chuyến bay dài 12 tiếng và muốn đọc nhiều sách. Giải pháp nào tốt nhất?",
        paperBook: { points: 20, feedback: "Sách giấy nặng và chiếm nhiều không gian hành lý" },
        ebook: { points: 80, feedback: "Ebook nhẹ, có thể mang cả thư viện trên một thiết bị" }
    },
    {
        title: "Tặng quà cho người yêu sách",
        description: "Bạn muốn tặng một cuốn sách đặc biệt cho người bạn yêu thương. Lựa chọn nào ý nghĩa hơn?",
        paperBook: { points: 85, feedback: "Sách giấy có giá trị tinh thần, có thể ký tặng và lưu giữ" },
        ebook: { points: 25, feedback: "Ebook khó tạo được cảm giác 'quà tặng' đặc biệt" }
    },
    {
        title: "Nghiên cứu học thuật",
        description: "Bạn cần tra cứu và tìm kiếm thông tin trong nhiều cuốn sách để viết luận văn. Giải pháp nào hiệu quả?",
        paperBook: { points: 30, feedback: "Khó tìm kiếm nhanh và đối chiếu nhiều nguồn" },
        ebook: { points: 90, feedback: "Tìm kiếm từ khóa tức thì, dễ copy trích dẫn và so sánh" }
    },
    {
        title: "Giáo dục trẻ em",
        description: "Bạn muốn tạo thói quen đọc sách cho con nhỏ. Lựa chọn nào tốt hơn cho sự phát triển?",
        paperBook: { points: 75, feedback: "Trẻ em cần trải nghiệm xúc giác, hạn chế tiếp xúc màn hình" },
        ebook: { points: 35, feedback: "Ánh sáng xanh ảnh hưởng đến mắt và giấc ngủ của trẻ" }
    },
    {
        title: "Sưu tập sách hiếm",
        description: "Bạn đam mê sưu tập các ấn bản đặc biệt và sách cổ. Định dạng nào có giá trị sưu tầm?",
        paperBook: { points: 95, feedback: "Sách giấy cổ có giá trị lịch sử, nghệ thuật và tài chính" },
        ebook: { points: 10, feedback: "Ebook không có giá trị sưu tầm, dễ sao chép" }
    },
    {
        title: "Đọc trong bóng tối",
        description: "Bạn muốn đọc sách vào ban đêm mà không làm phiền người ngủ bên cạnh. Lựa chọn nào phù hợp?",
        paperBook: { points: 15, feedback: "Cần bật đèn, gây ảnh hưởng đến người khác" },
        ebook: { points: 85, feedback: "Màn hình tự phát sáng, có thể đọc trong bóng tối" }
    },
    {
        title: "Bảo vệ môi trường",
        description: "Bạn quan tâm đến vấn đề môi trường và muốn giảm tác động sinh thái. Lựa chọn nào 'xanh' hơn?",
        paperBook: { points: 40, feedback: "Tiêu tốn gỗ, nước, và năng lượng sản xuất, vận chuyển" },
        ebook: { points: 60, feedback: "Tiết kiệm tài nguyên nhưng thiết bị điện tử cũng gây ô nhiễm" }
    },
    {
        title: "Trải nghiệm đọc sâu",
        description: "Bạn muốn tập trung cao độ để đọc một tác phẩm triết học phức tạp. Định dạng nào hỗ trợ tốt hơn?",
        paperBook: { points: 80, feedback: "Ít bị phân tâm bởi thông báo, tạo không gian đọc thuần túy" },
        ebook: { points: 30, feedback: "Dễ bị phân tâm bởi các ứng dụng và thông báo khác" }
    }
];

// Component cánh tay cân bằng
const BalanceScale: React.FC<{
    paperScore: number;
    ebookScore: number;
    isAnimating: boolean;
}> = ({ paperScore, ebookScore, isAnimating }) => {
    const total = paperScore + ebookScore || 1;
    const paperRatio = (paperScore / total) * 100;
    const ebookRatio = (ebookScore / total) * 100;

    // Tính góc nghiêng (-30 đến 30 độ)
    const tiltAngle = ((ebookScore - paperScore) / Math.max(total, 100)) * 25;

    return (
        <div className="relative w-full h-56 md:h-72 flex items-center justify-center mt-4 md:mt-8 scale-90 md:scale-100 origin-center">
            {/* Trụ cân - 3D Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-40 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-t-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-slate-700/50 backdrop-blur-sm"></div>
                {/* Base */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-800 rounded-full shadow-lg border-t border-slate-600"></div>
            </div>

            {/* Pivot Point */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 shadow-lg z-20 border-2 border-amber-300"></div>


            {/* Thanh cân - Animatable */}
            <div
                className={`absolute top-24 w-[340px] h-4 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-xl transition-transform duration-700 ease-out z-10 ${isAnimating ? 'scale-[1.02]' : ''}`}
                style={{ transform: `rotate(${tiltAngle}deg)` }}
            >
                {/* Center Decor */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-8 h-6 bg-slate-400 rounded-lg"></div>

                {/* Đĩa cân bên trái - Sách giấy */}
                <div className="absolute -left-2 top-2 flex flex-col items-center origin-top" style={{ transform: `rotate(${-tiltAngle}deg)` }}>
                    {/* Chain */}
                    <div className="w-[2px] h-24 bg-gradient-to-b from-slate-400 to-slate-600/20"></div>

                    {/* Pan */}
                    <div
                        className={`w-32 h-10 border-b-4 border-l-2 border-r-2 border-slate-400 rounded-b-full bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-lg relative -mt-1
                        ${isAnimating && paperScore > ebookScore ? 'shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-pulse' : ''}`}
                    >
                        {/* Weight/Item */}
                        <div className="absolute bottom-4 flex flex-col items-center transition-all duration-500" style={{ transform: `scale(${0.8 + paperRatio / 200})` }}>
                            <div className="w-16 h-20 bg-amber-700 rounded-l-md shadow-lg border-l-4 border-amber-600 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=100')] bg-cover opacity-60"></div>
                                <span className="absolute inset-0 flex items-center justify-center text-white/90 font-bold text-xs drop-shadow-md">BOOK</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-xl font-black text-amber-500 mt-2 drop-shadow-lg">{Math.round(paperRatio)}%</span>
                </div>

                {/* Đĩa cân bên phải - Ebook */}
                <div className="absolute -right-2 top-2 flex flex-col items-center origin-top" style={{ transform: `rotate(${-tiltAngle}deg)` }}>
                    {/* Chain */}
                    <div className="w-[2px] h-24 bg-gradient-to-b from-slate-400 to-slate-600/20"></div>

                    {/* Pan */}
                    <div
                        className={`w-32 h-10 border-b-4 border-l-2 border-r-2 border-slate-400 rounded-b-full bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-lg relative -mt-1
                        ${isAnimating && ebookScore > paperScore ? 'shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-pulse' : ''}`}
                    >
                        {/* Weight/Item */}
                        <div className="absolute bottom-4 flex flex-col items-center transition-all duration-500" style={{ transform: `scale(${0.8 + ebookRatio / 200})` }}>
                            <div className="w-14 h-20 bg-slate-900 rounded-md shadow-lg border-2 border-cyan-500 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cyan-900/40"></div>
                                <div className="absolute top-1 left-1 right-1 h-3/4 bg-black/60 rounded-sm"></div>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500/50"></div>
                            </div>
                        </div>
                    </div>
                    <span className="text-xl font-black text-cyan-400 mt-2 drop-shadow-lg">{Math.round(ebookRatio)}%</span>
                </div>
            </div>
        </div>
    );
};

const LevelTwoGame: React.FC<LevelTwoGameProps> = ({ onExit }) => {
    // Game States
    const [gamePhase, setGamePhase] = useState<'intro' | 'scenario' | 'quiz' | 'synthesis' | 'complete'>('intro');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [paperScore, setPaperScore] = useState(0);
    const [ebookScore, setEbookScore] = useState(0);
    const [scenariosCompleted, setScenariosCompleted] = useState(0);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [quizzesCorrect, setQuizzesCorrect] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [feedback, setFeedback] = useState<{ text: string; type: 'paper' | 'ebook' | 'synthesis' } | null>(null);
    const [synthesisProgress, setSynthesisProgress] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    // Shuffle scenarios on mount
    const [shuffledScenarios] = useState(() =>
        [...SCENARIOS].sort(() => Math.random() - 0.5).slice(0, 5)
    );
    const [shuffledQuizzes] = useState(() =>
        [...QUIZ_DATABASE].sort(() => Math.random() - 0.5).slice(0, 4)
    );

    // Handle scenario choice
    const handleScenarioChoice = (choice: 'paper' | 'ebook') => {
        const scenario = shuffledScenarios[currentScenarioIndex];
        const choiceData = choice === 'paper' ? scenario.paperBook : scenario.ebook;

        setIsAnimating(true);

        if (choice === 'paper') {
            setPaperScore(prev => prev + choiceData.points);
        } else {
            setEbookScore(prev => prev + choiceData.points);
        }

        setFeedback({ text: choiceData.feedback, type: choice });

        setTimeout(() => {
            setIsAnimating(false);
            setScenariosCompleted(prev => prev + 1);

            setTimeout(() => {
                setFeedback(null);
                if (currentScenarioIndex < shuffledScenarios.length - 1) {
                    setCurrentScenarioIndex(prev => prev + 1);
                } else {
                    // Move to quiz phase
                    setGamePhase('quiz');
                }
            }, 1500);
        }, 1000);
    };

    // Handle quiz answer
    const handleQuizAnswer = (optionIndex: number) => {
        const quiz = shuffledQuizzes[currentQuizIndex];
        const isCorrect = optionIndex === quiz.correct;

        if (isCorrect) {
            setQuizzesCorrect(prev => prev + 1);
            setFeedback({ text: quiz.explanation, type: 'synthesis' });
        } else {
            setMistakes(prev => prev + 1);
            setFeedback({ text: `Sai rồi! ${quiz.explanation}`, type: 'paper' });
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentQuizIndex < shuffledQuizzes.length - 1) {
                setCurrentQuizIndex(prev => prev + 1);
            } else {
                // Move to synthesis phase
                setGamePhase('synthesis');
            }
        }, 2500);
    };

    // Synthesis animation
    useEffect(() => {
        if (gamePhase === 'synthesis') {
            const interval = setInterval(() => {
                setSynthesisProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
                            setGamePhase('complete');
                        }, 1000);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [gamePhase, startTime]);

    // Calculate final rank
    const getRank = () => {
        const totalScore = quizzesCorrect * 25 + Math.min(100, (paperScore + ebookScore) / 10);
        const adjustedScore = Math.max(0, totalScore - mistakes * 10);

        if (adjustedScore >= 90) return { rank: "S", title: "Bậc Thầy Biện Chứng", color: "text-accent" };
        if (adjustedScore >= 70) return { rank: "A", title: "Nhà Tư Tưởng Xuất Sắc", color: "text-primary" };
        if (adjustedScore >= 50) return { rank: "B", title: "Học Viên Triết Học", color: "text-cyan-400" };
        return { rank: "C", title: "Người Mới Bắt Đầu", color: "text-slate-400" };
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0B0B10] flex flex-col font-display text-white overflow-hidden selection:bg-primary/30">

            {/* --- HEADER với Glassmorphism --- */}
            <header className="h-16 glass-panel flex items-center justify-between px-6 z-20 shrink-0 relative">
                {/* Gradient line phía trên */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>

                <div className="flex items-center gap-4">
                    <div className="text-primary font-black text-lg md:text-xl tracking-tighter flex items-center gap-2 hover:text-accent transition-colors cursor-pointer group">
                        <span className="material-symbols-outlined text-xl md:text-2xl group-hover:animate-rotate-slow">all_inclusive</span>
                        <span className="hidden sm:inline">Dialectics Lab</span>
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <span className="text-[8px] md:text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="hidden sm:inline">CẤP ĐỘ 2</span>
                            <span className="sm:hidden">LV.2</span>
                        </span>
                        <span className="text-xs md:text-sm font-bold text-white">Thống nhất & Đấu tranh</span>
                    </div>
                </div>

                {/* Progress indicator với Enhanced Design */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5 items-center">
                        {['intro', 'scenario', 'quiz', 'synthesis', 'complete'].map((phase, idx) => (
                            <div
                                key={phase}
                                className={`h-2 rounded-full transition-all duration-500 ${gamePhase === phase
                                    ? 'bg-gradient-to-r from-accent to-lime-400 w-8 shadow-[0_0_10px_rgba(179,235,38,0.5)]'
                                    : ['intro', 'scenario', 'quiz', 'synthesis', 'complete'].indexOf(gamePhase) > idx
                                        ? 'bg-primary w-2'
                                        : 'bg-white/20 w-2'
                                    }`}
                            ></div>
                        ))}
                    </div>
                    <button onClick={onExit} className="w-10 h-10 rounded-xl glass-card hover:bg-red-500/20 text-white/70 hover:text-red-400 flex items-center justify-center transition-all hover:scale-105 group">
                        <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform duration-300">close</span>
                    </button>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 overflow-auto">

                {/* INTRO PHASE với Enhanced Design */}
                {gamePhase === 'intro' && (
                    <div className="h-full flex flex-col items-center justify-center p-4 md:p-8 text-center relative overflow-y-auto">
                        {/* Background effects */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(245,158,11,0.1),_transparent_40%)] pointer-events-none"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(6,182,212,0.1),_transparent_40%)] pointer-events-none"></div>

                        <div className="relative z-10 max-w-5xl w-full py-8">
                            {/* Badge với glow effect */}
                            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 animate-fadeInUp animate-glow-pulse-accent mx-auto">
                                <span className="material-symbols-outlined text-xs md:text-sm">balance</span>
                                Nguyên lý về Sự Phát Triển
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-amber-500 via-white to-cyan-400 bg-clip-text text-transparent animate-fadeInUp animate-gradient-shift drop-shadow-2xl px-2 leading-tight" style={{ animationDelay: '0.1s', backgroundSize: '200% auto' }}>
                                Thống nhất & Đấu tranh
                            </h1>

                            <p className="text-sm md:text-xl text-slate-300 mb-8 md:mb-12 leading-relaxed animate-fadeInUp max-w-2xl mx-auto px-4" style={{ animationDelay: '0.2s' }}>
                                Khám phá động lực phát triển thông qua cuộc đối đầu biện chứng giữa <span className="text-amber-400 font-bold">Sách giấy</span> và <span className="text-cyan-400 font-bold">Ebook</span>.
                            </p>

                            {/* Cards Comparison */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 px-4">
                                {/* Paper Book Card */}
                                <div className="group relative h-[200px] md:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-amber-500/30 hover:border-amber-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                                    <div className="absolute inset-0">
                                        <img src={IMAGES.PAPER_BOOK} alt="Sách giấy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-left">
                                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined font-bold text-sm md:text-base">menu_book</span>
                                            </div>
                                            <h3 className="text-lg md:text-2xl font-bold text-white">Sách Giấy</h3>
                                        </div>
                                        <p className="text-amber-200/80 text-xs md:text-sm font-medium">Giá trị truyền thống & Cảm xúc</p>
                                    </div>
                                </div>

                                {/* Ebook Card */}
                                <div className="group relative h-[200px] md:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-cyan-500/30 hover:border-cyan-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                                    <div className="absolute inset-0">
                                        <img src={IMAGES.EBOOK} alt="Ebook" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-left">
                                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined font-bold text-sm md:text-base">tablet_mac</span>
                                            </div>
                                            <h3 className="text-lg md:text-2xl font-bold text-white">Ebook</h3>
                                        </div>
                                        <p className="text-cyan-200/80 text-xs md:text-sm font-medium">Tiện ích công nghệ & Tốc độ</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="px-4 pb-8">
                                <button
                                    onClick={() => setGamePhase('scenario')}
                                    className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-black rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden animate-fadeInUp mx-auto block"
                                    style={{ animationDelay: '0.6s' }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        BẮT ĐẦU TRẢI NGHIỆM
                                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 -translate-x-full group-hover:animate-shimmer"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* SCENARIO PHASE với Enhanced Design */}
                {gamePhase === 'scenario' && (
                    <div className="h-full flex flex-col p-4 md:p-8 relative overflow-y-auto">
                        {/* Background glow */}
                        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Balance Scale */}
                        <div className="mb-4 md:mb-8 animate-fadeInUp shrink-0">
                            <BalanceScale
                                paperScore={paperScore}
                                ebookScore={ebookScore}
                                isAnimating={isAnimating}
                            />
                        </div>

                        {/* Progress với enhanced design */}
                        <div className="text-center mb-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                            <div className="inline-flex items-center gap-3 glass-card px-4 py-2 rounded-full">
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Tình huống</span>
                                <div className="flex gap-1.5">
                                    {shuffledScenarios.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all ${idx < currentScenarioIndex ? 'bg-primary' :
                                                idx === currentScenarioIndex ? 'bg-accent w-4 shadow-[0_0_10px_rgba(179,235,38,0.5)]' :
                                                    'bg-white/20'
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-white">{currentScenarioIndex + 1}/{shuffledScenarios.length}</span>
                            </div>
                        </div>

                        {/* Scenario Card với premium design */}
                        <div className="max-w-2xl mx-auto w-full animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <div className="card-premium rounded-2xl p-8 mb-6 relative overflow-hidden">
                                {/* Decorative gradient */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-white/20 to-cyan-500"></div>

                                <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">help_outline</span>
                                    {shuffledScenarios[currentScenarioIndex].title}
                                </h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    {shuffledScenarios[currentScenarioIndex].description}
                                </p>
                            </div>

                            {/* Feedback display với enhanced animation */}
                            {feedback && (
                                <div className={`mb-6 p-5 rounded-xl border animate-scale-in-bounce shadow-lg ${feedback.type === 'paper' ? 'bg-amber-900/30 border-amber-500/50 text-amber-200 shadow-amber-500/10' :
                                    feedback.type === 'ebook' ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-200 shadow-cyan-500/10' :
                                        'bg-accent/20 border-accent/50 text-accent shadow-accent/10'
                                    }`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${feedback.type === 'paper' ? 'bg-amber-500/20' :
                                            feedback.type === 'ebook' ? 'bg-cyan-500/20' :
                                                'bg-accent/20'
                                            }`}>
                                            <span className="material-symbols-outlined text-xl">
                                                {feedback.type === 'paper' ? 'menu_book' : feedback.type === 'ebook' ? 'tablet' : 'lightbulb'}
                                            </span>
                                        </div>
                                        <p className="text-sm leading-relaxed">{feedback.text}</p>
                                    </div>
                                </div>
                            )}

                            {/* Choice Buttons with Images */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <button
                                    onClick={() => handleScenarioChoice('paper')}
                                    disabled={!!feedback}
                                    className={`group relative h-[280px] rounded-3xl overflow-hidden border-2 transition-all duration-500 flex flex-col items-center justify-end p-6 shadow-2xl
                                        ${feedback ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:-translate-y-2'}
                                        ${feedback?.type === 'paper' ? 'border-amber-500 ring-4 ring-amber-500/20' : 'border-white/10 hover:border-amber-500/50 hover:shadow-amber-500/20'}
                                    `}
                                >
                                    {/* Image BG */}
                                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                        <img src={IMAGES.PAPER_BOOK} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Paper Book" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    </div>

                                    <div className="relative z-10 text-center w-full">
                                        <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                                            <span className="material-symbols-outlined text-2xl">menu_book</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">Chọn Sách Giấy</div>
                                        <div className="text-xs font-medium text-amber-200 uppercase tracking-widest bg-black/50 py-1 px-3 rounded-full inline-block backdrop-blur-sm border border-amber-500/30">Giá trị cốt lõi</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleScenarioChoice('ebook')}
                                    disabled={!!feedback}
                                    className={`group relative h-[280px] rounded-3xl overflow-hidden border-2 transition-all duration-500 flex flex-col items-center justify-end p-6 shadow-2xl
                                        ${feedback ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:-translate-y-2'}
                                        ${feedback?.type === 'ebook' ? 'border-cyan-500 ring-4 ring-cyan-500/20' : 'border-white/10 hover:border-cyan-500/50 hover:shadow-cyan-500/20'}
                                    `}
                                >
                                    {/* Image BG */}
                                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                        <img src={IMAGES.EBOOK} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Ebook" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    </div>

                                    <div className="relative z-10 text-center w-full">
                                        <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                                            <span className="material-symbols-outlined text-2xl">tablet_mac</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">Chọn Ebook</div>
                                        <div className="text-xs font-medium text-cyan-200 uppercase tracking-widest bg-black/50 py-1 px-3 rounded-full inline-block backdrop-blur-sm border border-cyan-500/30">Xu hướng mới</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* QUIZ PHASE */}
                {gamePhase === 'quiz' && (
                    <div className="h-full flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500 relative overflow-y-auto">
                        {/* Quiz BG decorations */}
                        <div className="absolute -left-20 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="max-w-3xl w-full relative z-10 py-8">
                            <div className="text-center mb-6 md:mb-10">
                                <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-4">
                                    <span className="material-symbols-outlined text-sm">quiz</span>
                                    Kiểm tra Kiến thức
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Câu hỏi {currentQuizIndex + 1} / {shuffledQuizzes.length}</h2>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentQuizIndex + 1) / shuffledQuizzes.length) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="glass-panel p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-2xl relative overflow-hidden border border-white/10">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

                                <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed text-center">
                                    {shuffledQuizzes[currentQuizIndex].question}
                                </h3>

                                <div className="grid gap-4">
                                    {shuffledQuizzes[currentQuizIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuizAnswer(idx)}
                                            disabled={!!feedback}
                                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-5 group relative overflow-hidden
                                                ${feedback
                                                    ? 'opacity-60 cursor-not-allowed border-white/5 bg-white/5'
                                                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1'
                                                }
                                            `}
                                        >
                                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all
                                                ${feedback ? 'border-white/20 text-white/50' : 'border-white/30 text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary'}
                                            `}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className="text-lg text-slate-200 group-hover:text-white transition-colors font-medium">{option}</span>

                                            {/* Hover Gradient */}
                                            {!feedback && <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>}
                                        </button>
                                    ))}
                                </div>

                                {/* Feedback */}
                                {feedback && (
                                    <div className={`mt-8 p-6 rounded-2xl border-l-4 animate-in slide-in-from-bottom duration-300 shadow-xl backdrop-blur-md ${feedback.type === 'synthesis' ? 'bg-accent/10 border-accent text-white' : 'bg-red-500/10 border-red-500 text-white'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2 rounded-full ${feedback.type === 'synthesis' ? 'bg-accent/20 text-accent' : 'bg-red-500/20 text-red-500'}`}>
                                                <span className="material-symbols-outlined text-2xl">
                                                    {feedback.type === 'synthesis' ? 'check_circle' : 'error'}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-lg mb-1 ${feedback.type === 'synthesis' ? 'text-accent' : 'text-red-400'}`}>
                                                    {feedback.type === 'synthesis' ? 'Chính xác!' : 'Chưa đúng!'}
                                                </h4>
                                                <p className="text-slate-300 leading-relaxed">{feedback.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* SYNTHESIS PHASE */}
                {gamePhase === 'synthesis' && (
                    <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
                        <div className="max-w-2xl w-full text-center">
                            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-4 py-2 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-8">
                                <span className="material-symbols-outlined text-sm animate-spin">autorenew</span>
                                Quá trình Tổng hợp Biện chứng
                            </div>

                            <h2 className="text-3xl font-bold mb-8">Từ Đấu tranh đến Thống nhất</h2>

                            {/* Synthesis Animation with Images */}
                            <div className="relative h-64 w-full flex items-center justify-center mb-10 overflow-hidden">
                                <div
                                    className="absolute left-1/4 w-32 h-32 rounded-full border-4 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)] overflow-hidden z-10"
                                    style={{
                                        transform: `translateX(${synthesisProgress}px) scale(${1 - synthesisProgress / 200}) rotate(${synthesisProgress * 2}deg)`,
                                        opacity: 1 - synthesisProgress / 150
                                    }}
                                >
                                    <img src={IMAGES.PAPER_BOOK} className="w-full h-full object-cover" alt="Thesis" />
                                </div>

                                <div
                                    className="absolute right-1/4 w-32 h-32 rounded-full border-4 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden z-10"
                                    style={{
                                        transform: `translateX(${-synthesisProgress}px) scale(${1 - synthesisProgress / 200}) rotate(${-synthesisProgress * 2}deg)`,
                                        opacity: 1 - synthesisProgress / 150
                                    }}
                                >
                                    <img src={IMAGES.EBOOK} className="w-full h-full object-cover" alt="Antithesis" />
                                </div>

                                {/* Result */}
                                <div
                                    className="absolute w-48 h-48 rounded-full border-4 border-white/50 flex items-center justify-center shadow-[0_0_100px_rgba(179,235,38,0.6)] transition-all duration-500 z-20 overflow-hidden"
                                    style={{
                                        opacity: synthesisProgress / 100,
                                        transform: `scale(${0.5 + synthesisProgress / 200})`
                                    }}
                                >
                                    <img src={IMAGES.SYNTHESIS} className="w-full h-full object-cover" alt="Synthesis" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent flex items-end justify-center pb-4">
                                        <span className="text-white font-black text-xl uppercase tracking-widest drop-shadow-md">Thống Nhất</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-6">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 via-accent to-cyan-500 transition-all duration-100"
                                    style={{ width: `${synthesisProgress}%` }}
                                ></div>
                            </div>

                            <p className="text-slate-400">
                                {synthesisProgress < 50 && "Hai mặt đối lập đang xung đột..."}
                                {synthesisProgress >= 50 && synthesisProgress < 80 && "Quá trình phủ định biện chứng đang diễn ra..."}
                                {synthesisProgress >= 80 && synthesisProgress < 100 && "Sự thống nhất mới đang hình thành..."}
                                {synthesisProgress >= 100 && "Trải nghiệm đọc hiện đại đã ra đời!"}
                            </p>
                        </div>
                    </div>
                )}

                {/* COMPLETE PHASE */}
                {gamePhase === 'complete' && (
                    <div className="h-full flex items-center justify-center p-8 relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

                        <div className="glass-panel max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl animate-scale-in-bounce flex flex-col md:flex-row relative z-10 border border-white/10">

                            {/* Left Side: Result Visual */}
                            <div className="relative md:w-5/12 bg-gradient-to-br from-slate-900/90 to-black/90 p-10 flex flex-col items-center justify-center text-center overflow-hidden border-r border-white/10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>

                                <div className="relative w-40 h-40 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-accent animate-spin-slow opacity-50"></div>
                                    <div className="absolute inset-4 rounded-full border-4 border-dashed border-primary animate-reverse-spin opacity-50"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-8xl text-accent drop-shadow-[0_0_30px_rgba(179,235,38,0.6)]">workspace_premium</span>
                                    </div>
                                </div>

                                <div className={`text-6xl font-black ${getRank().color} mb-2 tracking-tighter drop-shadow-xl`}>{getRank().rank}</div>
                                <div className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-2">Đánh giá năng lực</div>
                                <div className={`text-xl font-bold ${getRank().color}`}>{getRank().title}</div>
                            </div>

                            {/* Right Side: Stats & Summary */}
                            <div className="flex-1 p-8 md:p-10 bg-slate-900/60 backdrop-blur-md flex flex-col">
                                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-accent text-4xl">check_circle</span>
                                    Thí Nghiệm Hoàn Tất
                                </h2>
                                <p className="text-slate-400 mb-8 text-lg">
                                    Bạn đã nắm vững quy luật <span className="text-white font-bold">Thống nhất và Đấu tranh</span>.
                                </p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 mx-auto w-full">
                                        <div className="text-slate-400 text-xs font-bold uppercase mb-1">Quiz</div>
                                        <div className="text-2xl font-black text-accent">{quizzesCorrect}/{shuffledQuizzes.length}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 mx-auto w-full">
                                        <div className="text-slate-400 text-xs font-bold uppercase mb-1">Thời gian</div>
                                        <div className="text-2xl font-black text-white">{Math.floor(elapsedTime / 60)}:{elapsedTime % 60 < 10 ? '0' : ''}{elapsedTime % 60}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5 mx-auto w-full">
                                        <div className="text-slate-400 text-xs font-bold uppercase mb-1">Sai sót</div>
                                        <div className={`text-2xl font-black ${mistakes === 0 ? 'text-accent' : 'text-red-400'}`}>{mistakes}</div>
                                    </div>
                                </div>

                                {/* Lesson Card */}
                                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20 mb-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <span className="material-symbols-outlined text-6xl text-white">school</span>
                                    </div>
                                    <h4 className="font-bold text-accent mb-2 uppercase text-xs tracking-widest">Bài học rút ra</h4>
                                    <p className="text-slate-200 text-sm leading-relaxed">
                                        Sách giấy và Ebook không loại trừ nhau mà bổ sung cho nhau. Sự đấu tranh giữa chúng tạo ra quá trình phát triển, dẫn đến những hình thức trải nghiệm tri thức mới ưu việt hơn.
                                    </p>
                                </div>

                                <div className="mt-auto flex gap-4">
                                    <button
                                        onClick={onExit}
                                        className="flex-1 py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold transition-all"
                                    >
                                        Về Menu
                                    </button>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="flex-1 py-4 rounded-xl bg-accent text-black font-bold hover:shadow-[0_0_30px_rgba(179,235,38,0.4)] transition-all hover:-translate-y-1"
                                    >
                                        Chơi lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LevelTwoGame;