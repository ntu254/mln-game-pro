import React, { useState, useEffect, useRef } from 'react';
import { useSound } from './SoundContext';

interface LevelOneGameProps {
  onExit: () => void;
  onNextLevel: () => void;
  onComplete: (score: number) => void;
}

// --- CONFIGURATION ---
const MAX_QUANTITY = 1000;
const NODAL_POINTS = [180, 360, 540, 720, 900];
const CHARGE_RATE = 0.8;
const HEAT_GENERATION = 0.6;
const COOLING_RATE = 0.4;
const PASSIVE_DECAY = 0.05;

// --- QUIZ DATA ---
const QUIZ_DATABASE = [
  {
    id: 1,
    question: "Tại 'Điểm nút' (ví dụ 100°C của nước), điều gì xảy ra?",
    options: [
      "Lượng tiếp tục tăng, Chất không đổi",
      "Sự tích lũy về Lượng đạt giới hạn, gây ra bước nhảy về Chất",
      "Sự vật bị phá hủy hoàn toàn",
      "Không có gì xảy ra"
    ],
    correct: 1,
    explanation: "Tại điểm nút, mâu thuẫn giữa Lượng và Chất đạt đỉnh điểm, đòi hỏi một bước nhảy để giải quyết, chuyển sang Chất mới."
  },
  {
    id: 2,
    question: "Khoảng giới hạn 'Độ' là gì?",
    options: [
      "Khoảng thời gian sự vật tồn tại",
      "Giới hạn mà Lượng đổi nhưng Chất chưa đổi",
      "Nhiệt độ của sự vật",
      "Điểm kết thúc của sự phát triển"
    ],
    correct: 1,
    explanation: "Độ là khoảng giới hạn mà trong đó sự thay đổi về lượng chưa làm thay đổi căn bản về chất của sự vật."
  },
  {
    id: 3,
    question: "Quy luật Lượng - Chất chỉ ra điều gì của sự phát triển?",
    options: [
      "Nguồn gốc của sự phát triển",
      "Cách thức của sự phát triển",
      "Khuynh hướng của sự phát triển",
      "Động lực của sự phát triển"
    ],
    correct: 1,
    explanation: "Quy luật Lượng - Chất chỉ ra CÁCH THỨC: Từ sự thay đổi dần dần về lượng dẫn đến sự thay đổi nhảy vọt về chất."
  },
  {
    id: 4,
    question: "Bước nhảy là gì?",
    options: [
      "Sự thay đổi về vị trí địa lý",
      "Sự tăng lên đơn thuần về số lượng",
      "Giai đoạn chuyển hóa cơ bản về chất",
      "Sự lặp lại quy trình cũ"
    ],
    correct: 2,
    explanation: "Bước nhảy là giai đoạn chuyển hóa cơ bản về chất do những thay đổi về lượng trước đó gây ra."
  },
  {
    id: 5,
    question: "Chất mới ra đời sẽ tác động như thế nào đến Lượng?",
    options: [
      "Không tác động gì cả",
      "Làm lượng ngừng biến đổi",
      "Làm thay đổi quy mô, nhịp điệu của Lượng",
      "Làm lượng giảm đi bằng 0"
    ],
    correct: 2,
    explanation: "Khi chất mới ra đời, nó tác động trở lại lượng, làm thay đổi kết cấu, quy mô, trình độ và nhịp điệu vận động của lượng."
  },
  {
    id: 6,
    question: "Trong tự nhiên, quá trình Lượng đổi dẫn đến Chất đổi diễn ra như thế nào?",
    options: [
      "Phụ thuộc ý muốn con người",
      "Diễn ra khách quan",
      "Chỉ diễn ra khi có tác động bên ngoài",
      "Không tuân theo quy luật nào"
    ],
    correct: 1,
    explanation: "Quy luật này mang tính khách quan, diễn ra độc lập với ý thức của con người."
  }
];

const LevelOneGame: React.FC<LevelOneGameProps> = ({ onExit, onNextLevel, onComplete }) => {
  // --- SOUND ---
  const { playSound, startContinuous, updateContinuous, stopContinuous, playBGM, stopBGM } = useSound();

  // Start BGM
  useEffect(() => {
    playBGM('ambient');
    return () => stopBGM();
  }, [playBGM, stopBGM]);

  // --- GAME STATE ---
  // UI States
  const [quantity, setQuantity] = useState(0);
  const [stability, setStability] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Game Logic Refs (Source of Truth for Loop)
  const quantityRef = useRef(0);
  const stabilityRef = useRef(100);
  const isChargingRef = useRef(false);
  const scoreRef = useRef(0);
  const mistakesRef = useRef(0);
  const holdStartRef = useRef<number | null>(null);
  const [holdTick, setHoldTick] = useState(0); // force re-render for visual bar while giữ

  // Phase Control
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false); // New state for roadmap modal
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Tracking for Report
  const [quizHistory, setQuizHistory] = useState<any[]>([]);

  // Stats
  const startTimeRef = useRef(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // Loop Ref
  const requestRef = useRef<number | null>(null);

  // --- DERIVED STATE ---
  const getCurrentState = (qty: number) => {
    if (qty < 360) return {
      id: 1, name: "Trạng thái Rắn", sub: "Cấu trúc Tinh thể",
      icon: "ac_unit", color: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500", shadow: "shadow-cyan-500/50",
      metaphor: "Nước đá (0°C trở xuống)",
      metaphorDesc: "Các phân tử dao động quanh vị trí cân bằng. Hình dạng xác định."
    };
    if (qty < 720) return {
      id: 2, name: "Trạng thái Lỏng", sub: "Dòng chảy Linh hoạt",
      icon: "water_drop", color: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500", shadow: "shadow-blue-500/50",
      metaphor: "Nước thường (0°C - 100°C)",
      metaphorDesc: "Liên kết lỏng lẻo hơn. Hình dạng phụ thuộc vật chứa."
    };
    return {
      id: 3, name: "Trạng thái Khí", sub: "Hỗn loạn Tự do",
      icon: "cloud", color: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500", shadow: "shadow-emerald-500/50",
      metaphor: "Hơi nước (> 100°C)",
      metaphorDesc: "Các phân tử chuyển động hỗn loạn. Thể tích không xác định."
    };
  };
  const currentState = getCurrentState(quantity);

  const nextNode = NODAL_POINTS.filter(n => quantity < n)[0] ?? MAX_QUANTITY;
  const prevNode = [...NODAL_POINTS].reverse().filter(n => quantity >= n)[0] ?? 0;

  const range = nextNode - prevNode;
  const currentProgress = quantity - prevNode;
  const progressPercent = Math.min(100, Math.max(0, (currentProgress / range) * 100));
  const isNearNode = progressPercent > 85;

  // Overload Calculation
  const overload = 100 - stability;

  // Visual boost: khi đang giữ, thanh quá tải tăng dần liên tục (chỉ hiển thị, không ảnh hưởng logic)
  const visualOverload = (() => {
    if (isCharging && holdStartRef.current) {
      const heldMs = Date.now() - holdStartRef.current;
      const ramp = Math.min(100, heldMs / 15); // ~1.5s để chạm 100%
      return Math.min(100, Math.max(overload, ramp));
    }
    return overload;
  })();

  // Determine meter appearance based on overload ranges
  // Using standard Tailwind colors to ensure visibility
  let meterColorClass = "bg-gradient-to-r from-teal-500 to-green-400";
  let meterShadowColor = "rgba(20, 184, 166, 0.5)";
  let meterStatusText = "ỔN ĐỊNH";
  let meterStatusColor = "text-teal-400";

  if (visualOverload > 75) {
    meterColorClass = "bg-gradient-to-r from-red-600 to-red-500 animate-pulse";
    meterShadowColor = "rgba(239, 68, 68, 0.9)";
    meterStatusText = "NGUY HIỂM";
    meterStatusColor = "text-red-500";
  } else if (visualOverload > 40) {
    meterColorClass = "bg-gradient-to-r from-orange-500 to-yellow-500";
    meterShadowColor = "rgba(249, 115, 22, 0.8)";
    meterStatusText = "CẢNH BÁO";
    meterStatusColor = "text-orange-400";
  }

  // Tick while holding to animate bar length
  useEffect(() => {
    if (!isCharging) return;
    const id = window.setInterval(() => {
      setHoldTick(t => t + 1);
    }, 60);
    return () => window.clearInterval(id);
  }, [isCharging]);

  // --- AUDIO EFFECTS ---
  useEffect(() => {
    // Stop sound if roadmap is open
    if (isCharging && !showQuiz && !isGameComplete && !showRoadmap) {
      startContinuous('charge');
    } else {
      stopContinuous();
    }
  }, [isCharging, showQuiz, isGameComplete, showRoadmap]);

  useEffect(() => {
    if (isCharging) {
      const intensity = overload / 100;
      updateContinuous('charge', intensity);
    }
  }, [overload, isCharging]);


  // --- GAME LOOP ---
  const update = () => {
    // Pause game loop if roadmap is open
    if (!showQuiz && !isGameComplete && !isGameOver && !showRoadmap) {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));

      const charging = isChargingRef.current;
      let q = quantityRef.current;
      let s = stabilityRef.current;

      // Update Quantity
      if (charging) {
        const nextQ = q + CHARGE_RATE;
        const hitNode = NODAL_POINTS.find(n => q < n && nextQ >= n);

        if (hitNode) {
          // Stop charging immediately
          isChargingRef.current = false;
          setIsCharging(false);

          // Update refs to node value
          quantityRef.current = hitNode;
          setQuantity(hitNode);

          triggerQuiz(hitNode);
          return; // Exit loop for this frame
        }

        if (nextQ >= MAX_QUANTITY) {
          quantityRef.current = MAX_QUANTITY;
          setQuantity(MAX_QUANTITY);
          handleWin();
          return; // Exit loop
        }

        q = nextQ;
      }

      // Update Stability
      let change = -PASSIVE_DECAY;
      if (charging) {
        change -= HEAT_GENERATION;
      } else {
        change += COOLING_RATE;
      }
      s = Math.min(100, Math.max(0, s + change));

      // Update Refs and State
      quantityRef.current = q;
      stabilityRef.current = s;
      setQuantity(q);
      setStability(s);

      // Check Game Over
      if (s <= 0) {
        requestAnimationFrame(() => {
          playSound('error');
          setIsGameOver(true);
        });
        return;
      }
    }
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [showQuiz, isGameComplete, isGameOver, showRoadmap]);

  // --- HANDLERS ---
  const triggerQuiz = (nodeVal: number) => {
    playSound('notification');
    const nodeIndex = NODAL_POINTS.indexOf(nodeVal);
    const quizIdx = nodeIndex % QUIZ_DATABASE.length;
    setCurrentQuizIndex(quizIdx);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (idx: number) => {
    const currentQ = QUIZ_DATABASE[currentQuizIndex];
    const isCorrect = idx === currentQ.correct;

    setQuizHistory(prev => [...prev, {
      question: currentQ.question,
      userAnswer: currentQ.options[idx],
      correctAnswer: currentQ.options[currentQ.correct],
      isCorrect: isCorrect,
      explanation: currentQ.explanation
    }]);

    if (isCorrect) {
      playSound('success');
      setShowQuiz(false);

      // Bonus reward
      const newQ = quantityRef.current + 30;
      quantityRef.current = newQ;
      setQuantity(newQ);

      stabilityRef.current = 100;
      setStability(100);

      updateScore(500);
    } else {
      playSound('error');

      const newMistakes = mistakesRef.current + 1;
      mistakesRef.current = newMistakes;
      setMistakes(newMistakes);

      const newStability = Math.max(10, stabilityRef.current - 30);
      stabilityRef.current = newStability;
      setStability(newStability);
    }
  };

  const updateScore = (points: number) => {
    const newScore = scoreRef.current + points;
    scoreRef.current = newScore;
    setScore(newScore);
  }

  const handleWin = () => {
    playSound('success');
    setIsGameComplete(true);
    const timeTaken = (Date.now() - startTimeRef.current) / 1000;
    const finalScore = Math.floor(scoreRef.current + quantityRef.current + (MAX_QUANTITY - timeTaken) * 5 - mistakesRef.current * 200);
    onComplete(finalScore > 0 ? finalScore : 100);
  };

  const handleRetry = () => {
    playSound('click');
    // Reset Refs
    quantityRef.current = 0;
    stabilityRef.current = 100;
    isChargingRef.current = false;
    scoreRef.current = 0;
    mistakesRef.current = 0;
    startTimeRef.current = Date.now();

    // Reset State
    setQuantity(0);
    setStability(100);
    setIsCharging(false);
    setIsGameOver(false);
    setMistakes(0);
    setScore(0);
    setQuizHistory([]);
  };

  const startCharging = () => {
    setIsCharging(true);
    isChargingRef.current = true;
    holdStartRef.current = Date.now();
  }

  const stopCharging = () => {
    setIsCharging(false);
    isChargingRef.current = false;
    holdStartRef.current = null;
  }

  // --- EXPORT REPORT ---
  const handleExportReport = () => {
    const date = new Date().toLocaleDateString('vi-VN');
    let content = `BÁO CÁO THỰC NGHIỆM: QUY LUẬT LƯỢNG - CHẤT\n`;
    content += `Ngày: ${date}\n`;
    content += `Người chơi: Học viên Triết học\n`;
    content += `Kết quả: Hoàn thành\n`;
    content += `Điểm số: ${score}\n`;
    content += `------------------------------------------------\n\n`;

    content += `TỔNG QUAN AI PHÂN TÍCH:\n`;
    content += `Bạn đã hoàn thành việc mô phỏng quá trình tích lũy về lượng dẫn đến sự thay đổi về chất. Dưới đây là phân tích chi tiết các tình huống (câu hỏi) bạn đã xử lý:\n\n`;

    quizHistory.forEach((item, index) => {
      content += `TÌNH HUỐNG #${index + 1}: ${item.question}\n`;
      content += `> Câu trả lời của bạn: ${item.userAnswer} [${item.isCorrect ? 'CHÍNH XÁC' : 'SAI'}]\n`;
      if (!item.isCorrect) {
        content += `> Đáp án đúng: ${item.correctAnswer}\n`;
      }
      content += `> Giải thích biện chứng: ${item.explanation}\n\n`;
    });

    content += `------------------------------------------------\n`;
    content += `KẾT LUẬN:\n`;
    content += `Sự phát triển là quá trình tích lũy dần dần (Lượng) bị gián đoạn bởi các bước nhảy vọt (Chất). Chúc mừng bạn đã nắm vững quy luật cơ bản này!\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bao_Cao_Triet_Hoc_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- 3D VISUAL COMPONENTS ---
  const SolidCrystal3D = () => (
    <div className="w-32 h-32" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(25deg) rotateY(-25deg)' }}>
      <div className="w-32 h-32 relative animate-[spin_10s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-8 bg-cyan-400 rounded-sm blur-xl opacity-60 animate-pulse"></div>
        {[
          { t: 'translateZ(64px)', c: 'from-cyan-500/30 to-cyan-900/50' },
          { t: 'rotateY(180deg) translateZ(64px)', c: 'from-cyan-600/30 to-cyan-950/50' },
          { t: 'rotateY(90deg) translateZ(64px)', c: 'from-cyan-400/30 to-cyan-800/50' },
          { t: 'rotateY(-90deg) translateZ(64px)', c: 'from-cyan-400/30 to-cyan-800/50' },
          { t: 'rotateX(90deg) translateZ(64px)', c: 'from-cyan-300/30 to-cyan-700/50' },
          { t: 'rotateX(-90deg) translateZ(64px)', c: 'from-cyan-700/30 to-cyan-950/50' }
        ].map((face, i) => (
          <div
            key={i}
            className={`absolute inset-0 border border-cyan-400/40 bg-gradient-to-br ${face.c} backdrop-blur-[2px]`}
            style={{ transform: face.t }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"></div>
            <div className="absolute inset-0 border-[4px] border-cyan-400/10"></div>
          </div>
        ))}
        <div className="absolute inset-8 animate-[spin_6s_linear_infinite_reverse]" style={{ transformStyle: 'preserve-3d' }}>
          {[
            'translateZ(32px)', 'rotateY(180deg) translateZ(32px)', 'rotateY(90deg) translateZ(32px)',
            'rotateY(-90deg) translateZ(32px)', 'rotateX(90deg) translateZ(32px)', 'rotateX(-90deg) translateZ(32px)'
          ].map((transform, i) => (
            <div key={i} className="absolute inset-0 border border-white/60 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ transform: transform }}></div>
          ))}
        </div>
      </div>
    </div>
  );

  const LiquidRipple3D = () => (
    <div className="w-48 h-48 relative flex items-center justify-center perspective-[500px]" style={{ transformStyle: 'preserve-3d' }}>
      <div className="relative z-10 w-24 h-24 bg-gradient-to-b from-blue-300 to-blue-600 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.8)] animate-[bounce_3s_ease-in-out_infinite]">
        <div className="absolute top-4 left-4 w-6 h-6 bg-white rounded-full opacity-60 blur-[1px]"></div>
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'rotateX(70deg)' }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute rounded-full border-2 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            style={{ width: '100%', height: '100%', animation: `ripple 3s linear infinite`, animationDelay: `${i * 1}s` }}></div>
        ))}
      </div>
    </div>
  );

  const Cloud3D = () => (
    <div className="w-40 h-40 relative flex items-center justify-center">
      <div className="absolute w-28 h-28 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
        <div className="absolute w-24 h-24 bg-emerald-400/10 rounded-full blur-xl -translate-x-6 -translate-y-6"></div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399]"
            style={{ top: '50%', left: '50%', transform: `rotate(${i * 45}deg) translate(${70 + Math.random() * 20}px) scale(${0.5 + Math.random()})`, opacity: 0.7 }}></div>
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i + 10} className="absolute w-1 h-1 bg-white rounded-full animate-[ping_4s_linear_infinite]"
          style={{ top: `${20 + Math.random() * 60}%`, left: `${20 + Math.random() * 60}%`, animationDelay: `${Math.random() * 5}s` }}></div>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes ripple {
          0% { width: 40px; height: 40px; opacity: 0.8; border-width: 4px; }
          100% { width: 200px; height: 200px; opacity: 0; border-width: 0px; }
        }
      `}</style>

      <div className="flex flex-col h-[100dvh] w-screen bg-[#111117] text-white overflow-hidden font-display">

        {/* HEADER */}
        <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-white/10 bg-[#12211e] px-6 py-4 z-20 shadow-sm relative">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary flex items-center justify-center cursor-pointer hover:bg-white/5 rounded transition-colors" onClick={() => { playSound('click'); onExit(); }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>all_inclusive</span>
            </div>
            <div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Dialectics Lab</h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="uppercase tracking-wider font-semibold">Cấp độ 1</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span>Bước nhảy Lượng - Chất</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-sm font-medium text-primary animate-pulse-slow italic">"Thay đổi là hằng số duy nhất của cuộc sống"</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-xs font-medium text-slate-500">Thành thạo Triết học</span>
              <div className="w-32 h-2 bg-[#37625b] rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '15%' }}></div>
              </div>
            </div>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-[#274540] transition-colors text-white" onClick={() => playSound('click')}>
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-500 border-2 border-[#12211e]"></div>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-[420px] xl:w-[480px] bg-[#16161d] border-r border-white/5 flex flex-col h-1/2 lg:h-full z-10 shadow-xl overflow-y-auto custom-scrollbar relative">
            <div className="p-6 md:p-8 flex flex-col gap-8 h-full">

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Bảng điều khiển</p>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">Trạng thái hệ thống</h1>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">{currentState.icon}</span>
                    <span className="font-semibold">{currentState.name}</span>
                  </div>
                </div>

                {/* Overload */}
                <div className="bg-[#131820] border border-white/5 rounded-xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Mức độ quá tải</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 ${meterStatusColor}`}>{meterStatusText}</span>
                    </div>
                    <span className={`text-sm font-mono ${meterStatusColor}`}>{Math.round(overload)}%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-surface-dark border border-white/5 overflow-hidden shadow-inner">
                    <div
                      className={`absolute top-0 left-0 h-full ${meterColorClass} transition-all duration-150 ease-linear`}
                      style={{
                        width: `${Math.max(2, Math.min(100, visualOverload))}%`,
                        boxShadow: `0 0 14px ${meterShadowColor}`
                      }}
                    >
                      <div className="absolute inset-0 opacity-25 bg-[linear-gradient(45deg,rgba(255,255,255,0.16)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.16)_50%,rgba(255,255,255,0.16)_75%,transparent_75%,transparent)] bg-[length:12px_12px]"></div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-y-0 left-1/3 w-px bg-white/10"></div>
                      <div className="absolute inset-y-0 left-2/3 w-px bg-white/10"></div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">Giữ chuột để nạp — quá tải đạt 100% sẽ sập hệ thống.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#151b24] border border-white/5 rounded-lg p-3 flex items-center gap-3">
                    <div className="size-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div className="leading-tight">
                      <div className="text-xl font-bold text-white">{elapsedTime}<span className="text-xs text-slate-400 font-normal ml-1">giây</span></div>
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Thời gian</div>
                    </div>
                  </div>
                  <div className="bg-[#151b24] border border-white/5 rounded-lg p-3 flex items-center gap-3">
                    <div className="size-10 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div className="leading-tight">
                      <div className="text-xl font-bold text-white">{score}<span className="text-xs text-slate-400 font-normal ml-1">xp</span></div>
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Điểm kỹ năng</div>
                    </div>
                  </div>
                  <div className="bg-[#151b24] border border-white/5 rounded-lg p-3 flex items-center gap-3">
                    <div className="size-10 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div className="leading-tight">
                      <div className="text-xl font-bold text-white">{mistakes}</div>
                      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Lỗi (quiz)</div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-[#131820] border border-white/5 rounded-xl p-4 space-y-2 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">Độ tiếp cận Điểm Nút</span>
                      {isNearNode && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-lime text-black font-semibold uppercase">Gần nút</span>}
                    </div>
                    <span className={`text-xs font-mono ${isNearNode ? 'text-accent-lime' : 'text-slate-500'}`}>
                      {progressPercent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="relative h-5 bg-surface-dark rounded-full overflow-hidden shadow-inner border border-white/5">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-120 ease-out ${isNearNode ? 'bg-gradient-to-r from-primary to-accent-lime' : 'bg-gradient-to-r from-blue-900 to-blue-500'}`}
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                    </div>
                    <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10 right-[15%] shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-50"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium uppercase tracking-[0.12em]">
                    <span>Tích lũy Lượng</span>
                    <span>Bước Nhảy (Chất mới)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
                <button
                  onMouseDown={startCharging}
                  onMouseUp={stopCharging}
                  onMouseLeave={stopCharging}
                  onTouchStart={startCharging}
                  onTouchEnd={stopCharging}
                  disabled={showQuiz || showRoadmap}
                  className={`w-full group relative overflow-hidden rounded-lg p-4 transition-all active:scale-[0.98] border border-transparent
                                ${showQuiz || showRoadmap ? 'bg-slate-800 cursor-not-allowed text-slate-500' : 'bg-primary hover:bg-[#179682] text-white shadow-[0_0_20px_rgba(31,173,150,0.4)]'}
                            `}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-6xl">add_circle</span>
                  </div>
                  <div className="relative flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">{showQuiz ? 'lock' : 'bolt'}</span>
                    <span className="text-base font-bold uppercase tracking-wider">{showQuiz ? 'Đang thực hiện Bước Nhảy' : 'Tích lũy nỗ lực'}</span>
                  </div>
                </button>

                <button
                  onClick={() => { playSound('click'); setShowRoadmap(true); }}
                  className="w-full rounded-lg border border-white/10 p-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">map</span>
                  Xem Lộ trình (Bản đồ)
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CANVAS */}
          <section className="flex-1 bg-[#111117] bg-grid-pattern relative flex items-center justify-center overflow-hidden p-6 perspective-[1200px]">

            {/* Background Glows */}
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${currentState.bg} opacity-20 rounded-full blur-[100px] pointer-events-none mix-blend-screen transition-colors duration-1000`}></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>

            {/* Main 3D Composition */}
            <div className="relative w-full max-w-2xl aspect-square max-h-[600px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative size-64 md:size-80 flex items-center justify-center transition-transform duration-500" style={{ transform: isCharging ? 'scale(1.1)' : 'scale(1)' }}>
                {/* Orbitals */}
                <div className={`absolute inset-0 rounded-full border-2 border-primary/30 transition-all duration-300 ${isCharging ? 'animate-pulse border-primary/60' : ''}`}></div>
                <div className="absolute inset-4 rounded-full border border-primary/50 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-primary/40 animate-[spin_15s_linear_infinite_reverse]"></div>

                {/* Central Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Inner Glow */}
                  <div className={`absolute size-32 ${currentState.bg} rounded-full blur-xl opacity-60 animate-pulse transition-colors duration-1000`}></div>

                  {/* The Actual 3D Component */}
                  <div className="relative z-20 flex items-center justify-center">
                    {currentState.id === 1 && <SolidCrystal3D />}
                    {currentState.id === 2 && <LiquidRipple3D />}
                    {currentState.id === 3 && <Cloud3D />}
                  </div>
                </div>

                {/* Orbiting Particles */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 size-3 bg-accent-lime rounded-full shadow-[0_0_10px_#B3EB26] animate-float"></div>
                <div className="absolute bottom-10 right-0 size-2 bg-primary rounded-full shadow-[0_0_10px_#1fad96] animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-0 -translate-x-4 size-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] animate-float" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Metaphor Card (Floating Top Right) */}
              <div className="absolute top-0 right-0 md:top-10 md:right-10 max-w-xs animate-float z-30" style={{ animationDuration: '7s' }}>
                <div className="bg-[#1c222e]/90 backdrop-blur-md p-4 rounded-lg shadow-lg border-l-4 border-accent-lime text-left border border-white/5">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-lime">science</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Phép ẩn dụ: {currentState.metaphor}</h4>
                      <p className="text-xs text-slate-300 mt-1">{currentState.metaphorDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nodal Point Card (Floating Bottom Left) */}
              <div className={`absolute bottom-0 left-0 md:bottom-20 md:left-10 max-w-xs animate-float z-30 transition-opacity duration-500 ${isNearNode ? 'opacity-100' : 'opacity-0'}`} style={{ animationDuration: '8s', animationDelay: '1s' }}>
                <div className="bg-[#1c222e]/90 backdrop-blur-md p-4 rounded-lg shadow-lg border-l-4 border-primary text-left border border-white/5">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">school</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Điểm Nút</h4>
                      <p className="text-xs text-slate-300 mt-1">Giới hạn mà sự thay đổi về lượng làm thay đổi căn bản về chất.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Caption */}
            <div className="absolute bottom-8 text-center pointer-events-none">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Hình 1.1: Hệ thống đang biến đổi</p>
            </div>

          </section>
        </main>

        {/* OVERLAYS (Roadmap, Quiz, GameOver, Victory) */}
        {showRoadmap && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-[#1c222e] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#151a23]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300">map</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Bản Đồ Lộ Trình Biến Đổi</h3>
                </div>
                <button onClick={() => setShowRoadmap(false)} className="text-slate-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-4 bottom-4 w-1 bg-white/10 rounded-full"></div>

                  <div className="space-y-8">
                    {/* Start */}
                    <div className="flex items-start gap-6 relative">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-600 flex items-center justify-center shrink-0 z-10">
                        <span className="text-xs font-bold text-slate-400">0</span>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-slate-300 font-bold">Khởi tạo Hệ thống</h4>
                        <p className="text-xs text-slate-500">Trạng thái ban đầu: Rắn</p>
                      </div>
                    </div>

                    {NODAL_POINTS.map((point, index) => {
                      const isPassed = quantity >= point;
                      const isNext = quantity < point && (index === 0 || quantity >= NODAL_POINTS[index - 1]);

                      return (
                        <div key={index} className="flex items-start gap-6 relative group">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border-4 transition-all
                                         ${isPassed ? 'bg-primary border-primary text-background-dark' :
                              isNext ? 'bg-accent/20 border-accent text-accent animate-pulse' : 'bg-slate-800 border-slate-600 text-slate-500'}
                                      `}>
                            <span className="text-xs font-bold">{point}</span>
                          </div>
                          <div className={`p-4 rounded-xl border flex-1 transition-all ${isPassed ? 'bg-primary/10 border-primary/20' :
                            isNext ? 'bg-accent/5 border-accent/30 shadow-[0_0_15px_rgba(179,235,38,0.1)]' : 'bg-white/5 border-white/5 opacity-60'
                            }`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`font-bold ${isNext ? 'text-accent' : isPassed ? 'text-white' : 'text-slate-400'}`}>
                                Điểm Nút #{index + 1}
                              </h4>
                              {isPassed && <span className="material-symbols-outlined text-primary text-lg">check_circle</span>}
                              {isNext && <span className="text-[10px] bg-accent text-black px-2 rounded font-bold uppercase">Mục tiêu</span>}
                            </div>
                            <p className="text-sm text-slate-400">
                              Xảy ra bước nhảy về chất. Chuyển đổi trạng thái vật chất.
                            </p>
                          </div>
                        </div>
                      )
                    })}

                    {/* Goal */}
                    <div className="flex items-start gap-6 relative">
                      <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-600 flex items-center justify-center shrink-0 z-10">
                        <span className="material-symbols-outlined text-slate-400">flag</span>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-slate-500 font-bold">Hoàn thành (1000)</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#151a23] border-t border-white/10 text-center">
                <p className="text-xs text-slate-500">
                  Mẹo: Bạn cần tích lũy đủ lượng để chạm tới các mốc trên.
                </p>
              </div>
            </div>
          </div>
        )}

        {showQuiz && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1c222e] border border-accent-lime max-w-lg w-full rounded-2xl p-8 shadow-[0_0_50px_rgba(179,235,38,0.2)] relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-lime"></div>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-lime text-black flex items-center justify-center font-black">?</div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Xác thực Bước Nhảy</h3>
              </div>
              <p className="text-lg text-white font-medium mb-8 leading-relaxed">{QUIZ_DATABASE[currentQuizIndex].question}</p>
              <div className="space-y-3">
                {QUIZ_DATABASE[currentQuizIndex].options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleQuizAnswer(idx)} className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-accent-lime hover:text-black hover:border-accent-lime transition-all text-sm font-medium text-slate-300">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 z-50 bg-red-950/90 backdrop-blur flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <span className="material-symbols-outlined text-6xl text-red-500 mb-4">gpp_bad</span>
              <h2 className="text-3xl font-black text-white mb-2 uppercase">Quá Tải Hệ Thống!</h2>
              <p className="text-slate-300 mb-8">Bạn đã để mức độ quá tải vượt quá 100%. Hãy chú ý đến thanh đo và thả chuột để làm mát.</p>
              <button onClick={handleRetry} className="px-8 py-3 bg-white text-red-900 font-bold rounded-lg hover:bg-red-100 transition-colors">Thử Lại</button>
            </div>
          </div>
        )}

        {isGameComplete && (
          <div className="absolute inset-0 z-50 bg-[#0B0B10]/95 backdrop-blur flex flex-col items-center justify-center p-6 animate-in fade-in duration-700 overflow-y-auto">
            <div className="max-w-3xl w-full bg-surface-dark border border-white/10 rounded-2xl p-8 my-10 relative">
              <div className="flex flex-col items-center mb-8">
                <span className="material-symbols-outlined text-6xl text-accent-lime mb-4">check_circle</span>
                <h2 className="text-3xl font-black text-white mb-2">Hoàn Thành Mô Phỏng!</h2>
                <div className="text-xl font-mono text-accent-lime">Tổng điểm: {score}</div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-white/5 mb-8 max-h-96 overflow-y-auto custom-scrollbar">
                <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Báo cáo phân tích từ AI</h3>
                <div className="space-y-6">
                  {quizHistory.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex gap-2">
                        <span className="text-slate-500 font-mono text-xs">#{i + 1}</span>
                        <h4 className="text-white font-bold text-sm">{item.question}</h4>
                      </div>
                      <div className={`text-xs p-3 rounded border ${item.isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        <span className="font-bold">Bạn chọn:</span> {item.userAnswer}
                      </div>
                      <p className="text-xs text-slate-400 pl-6 border-l-2 border-slate-600 italic">
                        <span className="font-bold not-italic text-slate-300">AI Giải thích:</span> {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button onClick={handleExportReport} className="flex items-center justify-center gap-2 px-6 py-3 bg-surface-hover hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10">
                  <span className="material-symbols-outlined">download</span>
                  Xuất báo cáo (.txt)
                </button>
                <button onClick={() => { playSound('click'); onNextLevel(); }} className="flex items-center justify-center gap-2 px-8 py-3 bg-accent-lime text-black font-black rounded-xl hover:bg-[#cbf755] hover:scale-105 transition-all">
                  Tiếp tục cấp độ 2
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LevelOneGame;