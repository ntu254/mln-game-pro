import React from 'react';
import { useSound } from './SoundContext';

const CTASection: React.FC = () => {
  const { playSound } = useSound();

  const handleStart = () => {
    playSound('success');
    const modules = document.getElementById('modules-section');
    if(modules) modules.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Gradient and Noise */}
      <div className="absolute inset-0 bg-[#0B0B10]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-30"></div>
        <div className="absolute inset-0" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', opacity: 0.1}}></div>
        {/* Animated Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        <div className="inline-block mb-6 animate-bounce">
            <span className="material-symbols-outlined text-6xl text-accent drop-shadow-[0_0_15px_rgba(179,235,38,0.5)]">rocket_launch</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Đừng Để Lý Thuyết <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent">Nằm Yên Trên Giấy</span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Tham gia cùng hơn <strong>1,200+</strong> người học đang khám phá Triết học thông qua tương tác trực quan. Biến kiến thức thành tư duy, biến tư duy thành hành động.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={handleStart}
            onMouseEnter={() => playSound('hover')}
            className="w-full sm:w-auto px-10 py-5 bg-accent text-background-dark font-black text-lg rounded-xl hover:bg-[#cbf755] hover:scale-105 transition-all shadow-[0_0_30px_rgba(179,235,38,0.3)] flex items-center justify-center gap-3 group"
          >
            <span>Bắt Đầu Ngay</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-2xl">arrow_forward</span>
          </button>
          
          <button 
            onClick={() => { playSound('click'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">info</span>
            <span>Tìm Hiểu Thêm</span>
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">school</span>
                <span className="text-sm font-bold text-white">Phù hợp Sinh viên</span>
            </div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">devices</span>
                <span className="text-sm font-bold text-white">Chạy trên mọi thiết bị</span>
            </div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">verified</span>
                <span className="text-sm font-bold text-white">Miễn phí 100%</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;