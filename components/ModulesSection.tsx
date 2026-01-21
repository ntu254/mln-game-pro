import React from 'react';

interface ModulesSectionProps {
  onPlayModule?: (id: number) => void;
}

const ModulesSection: React.FC<ModulesSectionProps> = ({ onPlayModule }) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Cơ chế vận động</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ba Quy Luật Cốt Lõi</h2>
          <p className="text-slate-400 max-w-lg text-lg">
            Nếu "Phát triển" là khuynh hướng chung, thì 3 quy luật sau đây giải thích <strong>cách thức</strong>, <strong>nguyên nhân</strong> và <strong>hình thức</strong> của sự phát triển đó.
          </p>
        </div>
        <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer hover:text-accent transition-colors group">
          <span>Xem Đề Cương Chi Tiết</span>
          <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">arrow_outward</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module 1 */}
        <div 
          onClick={() => onPlayModule && onPlayModule(1)}
          className="group relative bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(31,173,150,0.15)] flex flex-col h-full hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute top-4 right-4 z-20 bg-background-dark/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-primary border border-primary/20 shadow-lg">
            Cách thức
          </div>
          <div className="h-64 bg-surface-hover relative overflow-hidden group-hover:h-56 transition-all duration-500">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0" 
              data-alt="Nước sôi và chuyển thành hơi nước đại diện cho sự thay đổi trạng thái" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKB28tP0F4vvT37q4Cjq_43XXh58a5zGmuGX8uegmfGVG75F81PSGk2SsXsbwYLl-gRSnfjp4yxUBR69N4LwlZEugyL8tIpeS_oUf_dvqkfFSegFDrIQx9mFKerPWOlRIBeLWTuYlVRRB8NFNrN6fLsr_pL9MowH-l109uQ2DyibRN3JbEHO2Em3mt6EjWkD1WJInQjJ-mRzWGLKzKZO8thbeOCQKT2JzQmxe6d9UwrezNlJsQcc6Rm76RkpmcuYT4Cbue49nj6yo')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent"></div>
          </div>
          <div className="p-8 flex flex-col grow">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-background-dark transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">water_drop</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">Quy luật Lượng - Chất</h3>
              <p className="text-base text-slate-400 leading-relaxed font-light">
                Chỉ ra <strong>cách thức</strong> của sự phát triển. Tích lũy những thay đổi nhỏ về lượng cho đến khi kích hoạt bước nhảy vọt cách mạng về chất.
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Độ khó</span>
                <div className="flex gap-1">
                  <div className="w-6 h-1 bg-primary rounded-full"></div>
                  <div className="w-6 h-1 bg-white/10 rounded-full"></div>
                  <div className="w-6 h-1 bg-white/10 rounded-full"></div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary text-white hover:text-background-dark flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-background-dark">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div 
          onClick={() => onPlayModule && onPlayModule(2)}
          className="group relative bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(179,235,38,0.15)] flex flex-col h-full hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute top-4 right-4 z-20 bg-background-dark/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-accent border border-accent/20 shadow-lg">
            Nguồn gốc
          </div>
          <div className="h-64 bg-surface-hover relative overflow-hidden group-hover:h-56 transition-all duration-500">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0" 
              data-alt="Hai lực đối lập va chạm trong thế cân bằng trừu tượng như âm và dương" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnBpoHxXyeygyMlGcsVlc1Jn5K_jbd05l0w4LbO72mZIIqhbjxMhn4v9UwiWmhhh8J6WbxldlPDTwLTLGFqhZ9WCxvXtl9XXeM0cVMD-l9xxxeOaR2Q_HliB7hnumbXYQ7mlhqKbTf73rq8jaerm4WHlQMS5Zfwp0Aj4qQvlEoezGabH_JxPJt8mNRwXcHtPHNd-wmoq7EHfD48zY9oYXlrRZ4RmD_gVoQeGIGbZyka9qFsNaqb2pnbARiyfXlvlxsP3e26pi_uiA')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent"></div>
          </div>
          <div className="p-8 flex flex-col grow">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-background-dark transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">balance</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">Thống nhất &amp; Đấu tranh</h3>
              <p className="text-base text-slate-400 leading-relaxed font-light">
                Chỉ ra <strong>nguyên nhân</strong> của sự phát triển. Mâu thuẫn giữa các mặt đối lập là động lực thúc đẩy mọi chuyển động.
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Độ khó</span>
                <div className="flex gap-1">
                  <div className="w-6 h-1 bg-accent rounded-full"></div>
                  <div className="w-6 h-1 bg-accent rounded-full"></div>
                  <div className="w-6 h-1 bg-white/10 rounded-full"></div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent text-white hover:text-background-dark flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-background-dark">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div 
          onClick={() => onPlayModule && onPlayModule(3)}
          className="group relative bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-indigo-400 transition-all duration-500 hover:shadow-[0_0_40px_rgba(129,140,248,0.15)] flex flex-col h-full hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute top-4 right-4 z-20 bg-background-dark/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-indigo-400 border border-indigo-400/20 shadow-lg">
            Hình thức
          </div>
          <div className="h-64 bg-surface-hover relative overflow-hidden group-hover:h-56 transition-all duration-500">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0" 
              data-alt="Cầu thang xoắn ốc đi lên đại diện cho sự phát triển theo chu kỳ" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjO_8PsBnq_4MOzokLyZTzXiJ72O45aKFcOcFRn6Ex7a-i26WxxDo5XbODcsQV2oH7sHwdVpmdLgxQI46qdB06IYX3GC1vfTeMjipAhjCFQ8Z0Mu5BIZV5dshf0mXeTgeqfdzA6A_LRk_XYtTNaJ8csp10OapPCteEGs6BiSooDe0ex925KE1eyQFqrzWl8TXBLzVOG1mPtIsDsWCgAC4AUVJ6gMvmaNW8gcAxZcplV7hXWIRwCflEZ2RKZELsViWmPpsPSu2ZvzQ')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent"></div>
          </div>
          <div className="p-8 flex flex-col grow">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-5 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-2xl">cyclone</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">Phủ định của phủ định</h3>
              <p className="text-base text-slate-400 leading-relaxed font-light">
                Chỉ ra <strong>hình thức</strong> của sự phát triển. Lịch sử di chuyển theo đường xoắn ốc (kế thừa và lọc bỏ), không phải vòng tròn khép kín.
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Độ khó</span>
                <div className="flex gap-1">
                  <div className="w-6 h-1 bg-indigo-400 rounded-full"></div>
                  <div className="w-6 h-1 bg-indigo-400 rounded-full"></div>
                  <div className="w-6 h-1 bg-indigo-400 rounded-full"></div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-400 text-white hover:text-background-dark flex items-center justify-center transition-all group-hover:bg-indigo-400 group-hover:text-white">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulesSection;