import React from 'react';
import { useSound } from './SoundContext';

interface AboutSectionProps {
  onOpenLibrary?: () => void;
  onOpenApplications?: () => void;
  onOpenLeaderboard?: () => void;
  onScrollToGames?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenLibrary, onOpenApplications, onOpenLeaderboard, onScrollToGames }) => {
  const { playSound } = useSound();

  const STEPS = [
    {
      step: '01',
      title: 'Thư Viện Lý Luận',
      subtitle: 'Trang bị Vũ khí',
      description: 'Trước khi ra trận, bạn cần vũ khí. Tại đây, tra cứu nhanh các khái niệm "Độ", "Điểm nút", "Bước nhảy" dưới dạng sơ đồ tư duy dễ hiểu.',
      icon: 'menu_book',
      action: 'Mở Thư viện',
      onClick: onOpenLibrary,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10'
    },
    {
      step: '02',
      title: 'Mô Phỏng Game',
      subtitle: 'Thực nghiệm Tương tác',
      description: 'Trực tiếp thao tác biến đổi "Lượng" (nhiệt độ, áp suất...) để chứng kiến sự thay đổi về "Chất". Học qua trải nghiệm thay vì học vẹt.',
      icon: 'sports_esports',
      action: 'Chơi ngay',
      onClick: onScrollToGames,
      color: 'text-primary',
      border: 'border-primary/30',
      bg: 'bg-primary/10'
    },
    {
      step: '03',
      title: 'Ứng Dụng Thực Tiễn',
      subtitle: 'Đối chiếu Đời sống',
      description: 'Triết học không xa rời thực tế. Phân tích cách quy luật Lượng-Chất vận hành trong AI, Sinh học, và Lịch sử xã hội loài người.',
      icon: 'science',
      action: 'Xem Ví dụ',
      onClick: onOpenApplications,
      color: 'text-accent',
      border: 'border-accent/30',
      bg: 'bg-accent/10'
    },
    // {
    //   step: '04',
    //   title: 'Bảng Xếp Hạng',
    //   subtitle: 'Khẳng định Vị thế',
    //   description: 'So sánh điểm số tích lũy với các "nhà triết học" khác. Đánh giá mức độ thấu hiểu và sự thành thạo trong tư duy biện chứng của bạn.',
    //   icon: 'military_tech',
    //   action: 'Xem Rank',
    //   onClick: onOpenLeaderboard,
    //   color: 'text-orange-400',
    //   border: 'border-orange-500/30',
    //   bg: 'bg-orange-500/10'
    // }
  ];

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
           <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-pulse">Lộ Trình Chinh Phục</span>
           <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
             Học Triết Học <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Để Làm Gì?</span>
           </h2>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
             Không chỉ là lý thuyết suông. Hệ thống được thiết kế theo quy trình <strong>4 bước khép kín</strong> giúp bạn biến kiến thức sách vở thành tư duy sắc bén.
           </p>
        </div>

        {/* Learning Path Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((item, index) => (
              <div 
                key={index}
                onMouseEnter={() => playSound('hover')}
                onClick={() => { playSound('click'); if(item.onClick) item.onClick(); }}
                className="group relative cursor-pointer"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center font-black text-slate-500 group-hover:text-white group-hover:border-white/30 transition-all z-20 shadow-lg">
                  {item.step}
                </div>

                {/* Card */}
                <div className={`h-full bg-surface-dark border ${item.border} rounded-2xl p-6 pt-10 hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col`}>
                   
                   {/* Icon */}
                   <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <span className={`material-symbols-outlined text-3xl ${item.color}`}>{item.icon}</span>
                   </div>

                   <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">{item.title}</h3>
                   <span className={`text-xs font-bold uppercase tracking-wider mb-4 block ${item.color}`}>{item.subtitle}</span>
                   
                   <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow border-t border-white/5 pt-4">
                     {item.description}
                   </p>

                   <button className={`w-full py-3 rounded-lg border border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:bg-white/10 group-hover:text-white transition-all flex items-center justify-center gap-2`}>
                      {item.action}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;