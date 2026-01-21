import React from 'react';

const PrinciplesSection: React.FC = () => {
  return (
    <section className="py-20 bg-background-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-surface-dark/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Nền Tảng Thế Giới Quan</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Nguyên Lý Về Sự Phát Triển</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
             Trước khi hiểu "cách thức" vận động (thông qua 3 quy luật), ta cần thấu hiểu "khuynh hướng" tồn tại của vật chất. 
             Mọi sự vật, hiện tượng không đứng yên mà luôn vận động theo hướng đi lên.
          </p>
        </div>

        <div className="flex justify-center">
          
          {/* Principle of Development - Featured Single View */}
          <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-accent/50 hover:to-accent/10 transition-all duration-500 shadow-[0_0_0_0_rgba(179,235,38,0)] hover:shadow-[0_0_50px_-10px_rgba(179,235,38,0.2)] max-w-4xl w-full">
            <div className="absolute inset-0 bg-background-dark rounded-2xl m-[1px]"></div>
            <div className="relative h-full p-8 md:p-12 flex flex-col md:flex-row gap-10 z-10 items-center">
              
              {/* Content Side */}
              <div className="flex-1">
                <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(179,235,38,0.2)]">
                  <span className="material-symbols-outlined text-4xl">upgrade</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">Khái niệm & Bản chất</h3>
                
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  Phát triển không phải là sự lặp lại đơn thuần hay tăng giảm số lượng. Đó là quá trình vận động <strong>từ thấp đến cao, từ đơn giản đến phức tạp, từ kém hoàn thiện đến hoàn thiện hơn</strong>.
                </p>

                <div className="flex flex-wrap gap-3">
                  <div className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2 bg-accent/5 px-3 py-2 rounded-full border border-accent/10">
                    <span className="material-symbols-outlined text-sm">history_edu</span>
                    Tính kế thừa
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                    <span className="material-symbols-outlined text-sm">all_inclusive</span>
                    Tính phổ biến
                  </div>
                   <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                    <span className="material-symbols-outlined text-sm">diversity_2</span>
                    Tính đa dạng
                  </div>
                </div>
              </div>

              {/* Visualization Side */}
              <div className="w-full md:w-2/5">
                <div className="bg-white/5 rounded-xl border border-white/5 p-6 relative overflow-hidden group-hover:border-accent/30 transition-colors">
                  
                   {/* Spiral Visualization */}
                   <div className="relative h-48 w-full flex items-center justify-center">
                       <svg width="100%" height="100%" viewBox="0 0 200 200" className="animate-[spin_20s_linear_infinite]">
                          <path 
                            d="M100,100 m0,0 a10,10 0 1,0 20,0 a20,20 0 1,0 -40,0 a30,30 0 1,0 60,0 a40,40 0 1,0 -80,0 a50,50 0 1,0 100,0" 
                            fill="none" 
                            stroke="url(#spiralGradient)" 
                            strokeWidth="3" 
                            strokeLinecap="round"
                            className="opacity-80"
                          />
                          <defs>
                              <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#B3EB26" stopOpacity="1" />
                              </linearGradient>
                          </defs>
                       </svg>
                       
                       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="material-symbols-outlined text-4xl text-white mb-1 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">arrow_upward</span>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-black/50 backdrop-blur px-2 py-1 rounded">Xoắn ốc</span>
                       </div>
                   </div>

                   <div className="text-center mt-4">
                      <p className="text-xs text-slate-500 italic">"Cái mới ra đời trên cơ sở cái cũ nhưng ở trình độ cao hơn."</p>
                   </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;