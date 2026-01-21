import React from 'react';
import { useSound } from './SoundContext';

interface NavbarProps {
  onOpenLibrary?: () => void;
  onOpenApplications?: () => void;
  onOpenLeaderboard?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLibrary, onOpenApplications, onOpenLeaderboard }) => {
  const { playSound, isMuted, toggleMute } = useSound();

  const handleNavClick = (callback?: () => void) => {
    playSound('click');
    if (callback) callback();
  };

  const playHover = () => playSound('hover');

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-panel">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick(() => window.scrollTo({top: 0, behavior: 'smooth'}))} onMouseEnter={playHover}>
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-2xl">all_inclusive</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-none">PHÉP BIỆN CHỨNG</span>
            <span className="text-xs text-primary font-medium tracking-[0.2em] uppercase mt-1">Cổng Game</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick(() => window.scrollTo({top: 0, behavior: 'smooth'}))} 
            onMouseEnter={playHover}
            className="text-sm font-medium text-white border-b-2 border-primary pb-0.5"
          >
            Trang chủ
          </button>
          <button 
            onClick={() => handleNavClick(onOpenLibrary)}
            onMouseEnter={playHover} 
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Thư viện Lý luận
          </button>
          <button 
            onMouseEnter={playHover}
            onClick={() => {
                const modules = document.getElementById('modules-section');
                if(modules) modules.scrollIntoView({behavior: 'smooth'});
            }}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Chơi Game
          </button>
          <button 
            onClick={() => handleNavClick(onOpenApplications)}
            onMouseEnter={playHover}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Ứng dụng Thực tiễn
          </button>
          {/* <button 
            onClick={() => handleNavClick(onOpenLeaderboard)}
            onMouseEnter={playHover}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Bảng xếp hạng
          </button> */}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => { playSound('click'); toggleMute(); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            <span className="material-symbols-outlined">{isMuted ? 'volume_off' : 'volume_up'}</span>
          </button>

          {/* <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
            <span>Đăng nhập</span>
          </button> */}
          <button 
            onMouseEnter={playHover}
            onClick={() => {
                playSound('success');
                const modules = document.getElementById('modules-section');
                if(modules) modules.scrollIntoView({behavior: 'smooth'});
            }}
            className="flex items-center justify-center h-10 px-5 bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(31,173,150,0.3)] hover:shadow-[0_0_20px_rgba(31,173,150,0.5)] active:scale-95"
          >
            Bắt đầu học
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;