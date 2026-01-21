import React, { useState } from 'react';

interface ApplicationsSectionProps {
  onExit: () => void;
}

// Data types
interface TimelineStage {
  title: string;
  subtitle: string;
  description: string;
  dialectics: string; // The philosophical analysis
  law: string; // Which law is most prominent
  image: string;
  year: string;
}

interface ExampleCase {
  id: string;
  name: string;
  icon: string;
  stages: TimelineStage[];
}

// Example Data
const EXAMPLES: ExampleCase[] = [
  {
    id: 'tech',
    name: 'Sự Tiến Hóa Của Giao Tiếp (Xã Hội)',
    icon: 'smartphone',
    stages: [
      {
        year: 'Giai đoạn 1',
        title: 'Kỷ nguyên Vật lý',
        subtitle: 'Thư tay, Mã Morse & Điện tín',
        description: 'Giao tiếp phụ thuộc hoàn toàn vào vật chất hữu hình và dây dẫn. Tốc độ chậm, phạm vi hẹp.',
        dialectics: 'Tích lũy về Lượng: Nhu cầu trao đổi thông tin của con người tăng dần, vượt qua khả năng đáp ứng của các phương tiện thô sơ.',
        law: 'Quy luật Lượng - Chất',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Morse_Telegraph_1837.jpg/1200px-Morse_Telegraph_1837.jpg'
      },
      {
        year: 'Giai đoạn 2',
        title: 'Kỷ nguyên Vô tuyến & Di động',
        subtitle: 'Điện thoại, Internet sơ khai',
        description: 'Phá vỡ giới hạn dây dẫn. Sự ra đời của sóng vô tuyến và mạng internet đời đầu.',
        dialectics: 'Mâu thuẫn biện chứng (Đấu tranh): Xung đột giữa nhu cầu kết nối tức thời và giới hạn không gian địa lý. Cái cũ (dây dẫn) bị phủ định bởi cái mới (sóng).',
        law: 'Quy luật Thống nhất & Đấu tranh',
        image: 'https://thicongdiennhe.vn/wp-content/uploads/2020/06/phanbietmanglanwanmanmanglanlagi-1.png'
      },
      {
        year: 'Giai đoạn 3',
        title: 'Kỷ nguyên Siêu kết nối',
        subtitle: 'AI, IoT & Neuralink',
        description: 'Giao tiếp không chỉ là nghe/nói mà là truyền tải dữ liệu, cảm xúc tức thời trên toàn cầu.',
        dialectics: 'Phủ định của phủ định: Quay lại việc "kết nối trực tiếp" (như nói chuyện mặt đối mặt) nhưng ở trình độ cao hơn hẳn (qua không gian ảo, AI).',
        law: 'Quy luật Phủ định của phủ định',
        image: 'https://www.insights10.com/uploads/blog/IMG-1693917377.jpg'
      }
    ]
  },
  {
    id: 'nature',
    name: 'Sự Vận Động Của Vật Chất (Tự Nhiên)',
    icon: 'eco',
    stages: [
      {
        year: 'Giai đoạn 1',
        title: 'Sâu Bướm (Ấu trùng)',
        subtitle: 'Tích lũy dinh dưỡng',
        description: 'Giai đoạn ăn và lớn lên. Sâu bướm chỉ tập trung vào việc tăng kích thước cơ thể.',
        dialectics: 'Lượng đổi dẫn đến Chất đổi: Việc ăn liên tục làm tăng lượng vật chất sinh học đến giới hạn, buộc nó phải thay đổi hình thái.',
        law: 'Quy luật Lượng - Chất',
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20250323/pngtree-brown-caterpillar-camouflaged-as-a-moth-brown-caterpillar-camouflage-brown-photo-photo-image_65530748.webp'
      },
      {
        year: 'Giai đoạn 2',
        title: 'Kén (Nhộng)',
        subtitle: 'Đấu tranh nội tại',
        description: 'Giai đoạn nằm im, nhưng bên trong là sự sắp xếp lại toàn bộ cấu trúc tế bào.',
        dialectics: 'Đấu tranh giữa các mặt đối lập: Sự phá hủy các mô cũ của sâu và sự hình thành các mô mới của bướm diễn ra quyết liệt bên trong vỏ kén.',
        law: 'Quy luật Thống nhất & Đấu tranh',
        image: 'https://media.istockphoto.com/id/487505366/vi/anh/b%C6%B0%E1%BB%9Bm-ch%C3%BAa-chrysalis.jpg?s=612x612&w=0&k=20&c=vyzFKd1R11f0Xbtqa1iUpoV_eAJ51aMoqAqdiZzfyQw='
      },
      {
        year: 'Giai đoạn 3',
        title: 'Bướm trưởng thành',
        subtitle: 'Sự lột xác hoàn toàn',
        description: 'Phá vỡ vỏ kén, bay lên với hình thái hoàn toàn mới, có khả năng sinh sản.',
        dialectics: 'Bước nhảy vọt & Tính kế thừa: Bướm là sự phủ định của kén (và kén là phủ định của sâu). Nó không còn là sâu, nhưng mang gen của sâu ở trình độ cao hơn.',
        law: 'Quy luật Phủ định của phủ định',
        image: 'https://truongtotnhat.vn/wp-content/uploads/2025/07/sau-buom-an-la-cay-gay-hai-mua-mang.jpg'
      }
    ]
  }
];

const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<string>('tech');
  const activeData = EXAMPLES.find(e => e.id === activeTab) || EXAMPLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B10] flex flex-col font-display text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-surface-dark flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent">
             <span className="material-symbols-outlined text-lg">science</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Ứng Dụng Thực Tiễn</span>
        </div>
        <button 
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm font-bold text-slate-400 hover:text-white"
        >
          <span>Đóng</span>
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto relative bg-background-dark">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none fixed"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          
          {/* Hero Section of the Page */}
          <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-700 fade-in">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Nguyên Lý & Thực Tiễn</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Sự Phát Triển: Từ Lý Luận Đến Đời Sống</h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg font-light leading-relaxed">
               Trước khi đi vào các quy luật cụ thể, ta cần thấu hiểu "khuynh hướng" tồn tại của vật chất thông qua Nguyên lý về sự Phát triển.
            </p>
          </div>

          {/* --- PART 1: THE PRINCIPLE (THEORY) --- */}
          <div className="flex justify-center mb-24 animate-in slide-in-from-bottom-8 duration-700 delay-100 fade-in">
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-accent/50 hover:to-accent/10 transition-all duration-500 shadow-[0_0_0_0_rgba(179,235,38,0)] hover:shadow-[0_0_50px_-10px_rgba(179,235,38,0.2)] max-w-4xl w-full">
              <div className="absolute inset-0 bg-[#15151e] rounded-2xl m-[1px]"></div>
              <div className="relative h-full p-8 md:p-12 flex flex-col md:flex-row gap-10 z-10 items-center">
                
                {/* Content Side */}
                <div className="flex-1">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(179,235,38,0.2)]">
                    <span className="material-symbols-outlined text-4xl">upgrade</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">Nguyên Lý Về Sự Phát Triển</h3>
                  
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

          {/* Separator */}
          <div className="flex items-center justify-center mb-16 animate-in slide-in-from-bottom-8 duration-700 delay-200 fade-in">
               <div className="h-px bg-white/10 w-full max-w-xs"></div>
               <span className="px-6 text-slate-500 text-xs font-bold uppercase tracking-widest text-center whitespace-nowrap">Minh chứng thực tế</span>
               <div className="h-px bg-white/10 w-full max-w-xs"></div>
          </div>

          {/* --- PART 2: APPLICATIONS (PRACTICE) --- */}
          <div className="animate-in slide-in-from-bottom-8 duration-700 delay-300 fade-in">
              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-20">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveTab(ex.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 border ${
                      activeTab === ex.id 
                        ? 'bg-primary text-background-dark border-primary shadow-[0_0_20px_rgba(31,173,150,0.4)] translate-y-[-2px]' 
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined">{ex.icon}</span>
                    {ex.name}
                  </button>
                ))}
              </div>

              {/* Timeline Visualization */}
              <div className="relative">
                {/* Vertical Spiral Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary opacity-30 rounded-full hidden md:block"></div>
                
                {/* Timeline Items */}
                <div className="space-y-12 md:space-y-24">
                  {activeData.stages.map((stage, index) => (
                    <div key={index} className={`flex flex-col md:flex-row gap-8 items-center group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      
                      {/* Image Side */}
                      <div className="w-full md:w-1/2 px-4 md:px-12 relative">
                        {/* Connection Dot */}
                        <div className="hidden md:block absolute top-1/2 -mt-3 w-6 h-6 rounded-full bg-background-dark border-4 border-accent shadow-[0_0_15px_#B3EB26] z-20 
                                        left-full -ml-3 group-hover:scale-125 transition-transform duration-300
                                        data-[reversed=true]:left-auto data-[reversed=true]:right-full data-[reversed=true]:-mr-3"
                              data-reversed={index % 2 !== 0}
                        ></div>

                        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl group-hover:shadow-[0_0_30px_rgba(31,173,150,0.2)] transition-shadow duration-500">
                            <img 
                              src={stage.image} 
                              alt={stage.title} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-4 left-4">
                              <span className="bg-primary text-background-dark text-xs font-black px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                                {stage.year}
                              </span>
                              <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                            </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="w-full md:w-1/2 px-4 md:px-12 text-left">
                        <div className={`flex flex-col ${index % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                            <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest mb-2">
                              <span className="material-symbols-outlined text-lg">psychology</span>
                              {stage.law}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4">{stage.subtitle}</h4>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                              <p className="text-slate-300 mb-4 leading-relaxed">
                                {stage.description}
                              </p>
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-sm text-primary font-medium italic">
                                  <span className="font-bold not-italic text-slate-400 mr-1">Góc nhìn Biện chứng:</span> 
                                  "{stage.dialectics}"
                                </p>
                              </div>
                            </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* End Marker */}
                <div className="flex justify-center mt-16 relative z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent animate-bounce">
                      <span className="material-symbols-outlined text-2xl">arrow_downward</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tiếp tục phát triển</span>
                  </div>
                </div>

              </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ApplicationsSection;