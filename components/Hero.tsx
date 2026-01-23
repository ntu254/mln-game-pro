import React from "react";
import { useSound } from "./SoundContext";

const Hero: React.FC = () => {
  const { playSound } = useSound();

  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background-dark to-background-dark"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-flux"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-dark/50 border border-white/10 mb-8 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#B3EB26]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
            Nguyên lý về sự Phát triển
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] text-white mb-8 leading-[1.1] animate-in zoom-in-95 duration-700 delay-100">
          Thay đổi là <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent drop-shadow-[0_0_15px_rgba(31,173,150,0.3)]">
            hằng số duy nhất của{" "}
          </span>{" "}
          <br className="md:hidden" /> cuộc sống
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Khám phá <strong>Nguyên Lý Về Sự Phát Triển</strong> và{" "}
          <strong>Ba Quy Luật</strong> cốt lõi điều khiển sự vận động của vũ
          trụ. Hiểu rõ khuynh hướng đi lên theo đường xoắn ốc của vạn vật.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <button
            onMouseEnter={() => playSound("hover")}
            onClick={() => {
              playSound("success");
              const modules = document.getElementById("modules-section");
              if (modules) modules.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto h-14 px-8 bg-accent text-background-dark font-extrabold text-base rounded-lg hover:bg-[#cbf755] transition-all shadow-[0_0_20px_rgba(179,235,38,0.2)] hover:shadow-[0_0_30px_rgba(179,235,38,0.4)] flex items-center justify-center gap-2 group"
          >
            <span>Vào Cổng Game</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          <button
            onMouseEnter={() => playSound("hover")}
            onClick={() => {
              playSound("click");
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
            className="w-full sm:w-auto h-14 px-8 bg-surface-dark border border-white/10 text-white font-bold text-base rounded-lg hover:bg-surface-hover hover:border-white/20 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-primary">
              play_circle
            </span>
            <span>Xem Lộ Trình</span>
          </button>
        </div>
      </div>
      {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce cursor-pointer" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
        <span className="text-[10px] uppercase tracking-[0.2em]">Cuộn để khám phá</span>
        <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
      </div> */}
    </header>
  );
};

export default Hero;
