import React, { useState } from 'react';

interface LibrarySectionProps {
  onExit: () => void;
}

const TOPICS = [
  {
    id: 'development',
    title: '1. Nguyên Lý Sự Phát Triển',
    icon: 'upgrade',
    content: (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">psychology</span>
            Khái niệm & Thực chất
          </h3>
          <div className="space-y-6">
            <div className="pl-4 border-l-2 border-primary/50">
              <h4 className="font-bold text-white text-lg mb-2">Phát triển là gì?</h4>
              <p className="text-slate-400 leading-relaxed">
                Là quá trình vận động từ thấp đến cao, từ kém hoàn thiện đến hoàn thiện hơn, từ chất cũ đến chất mới ở trình độ cao hơn.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-primary/50">
              <h4 className="font-bold text-white text-lg mb-2">Phân biệt với vận động</h4>
              <p className="text-slate-400 leading-relaxed">
                Phát triển là vận động nhưng không phải mọi vận động đều là phát triển. <span className="text-primary font-bold">Chỉ có vận động theo khuynh hướng đi lên mới là phát triển.</span>
              </p>
            </div>
            <div className="pl-4 border-l-2 border-primary/50">
              <h4 className="font-bold text-white text-lg mb-2">Thực chất</h4>
              <p className="text-slate-400 leading-relaxed">
                Là sự phát sinh đối tượng mới phù hợp với quy luật tiến hóa và sự diệt vong của đối tượng cũ đã lỗi thời.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-hover rounded-xl p-6 border border-white/5">
            <div className="w-10 h-10 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">public</span>
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Tính Khách quan</h4>
            <p className="text-sm text-slate-400">
              Nguồn gốc nằm trong chính bản thân sự vật, không phụ thuộc vào ý muốn chủ quan của con người.
            </p>
          </div>
          <div className="bg-surface-hover rounded-xl p-6 border border-white/5">
            <div className="w-10 h-10 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">all_inclusive</span>
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Tính Phổ biến</h4>
            <p className="text-sm text-slate-400">
              Diễn ra ở khắp mọi nơi: Tự nhiên (vũ trụ, sinh học), Xã hội (lịch sử) và Tư duy (nhận thức).
            </p>
          </div>
          <div className="bg-surface-hover rounded-xl p-6 border border-white/5">
            <div className="w-10 h-10 rounded bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">history_edu</span>
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Tính Kế thừa</h4>
            <p className="text-sm text-slate-400">
              Cái mới ra đời từ cái cũ, gạt bỏ mặt tiêu cực và giữ lại, cải tạo các yếu tố tích cực. Không phủ định sạch trơn.
            </p>
          </div>
          <div className="bg-surface-hover rounded-xl p-6 border border-white/5">
            <div className="w-10 h-10 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">diversity_2</span>
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Tính Đa dạng</h4>
            <p className="text-sm text-slate-400">
              Mỗi sự vật có quá trình phát triển khác nhau tùy thuộc vào không gian, thời gian và điều kiện cụ thể.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'quantity-quality',
    title: '2. Quy Luật Lượng - Chất',
    icon: 'water_drop',
    content: (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined">definitions</span>
            Các Phạm Trù Cơ Bản
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cấu trúc bên trong</span>
              <h4 className="text-xl font-black text-white mb-3">CHẤT (Quality)</h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                Là những thuộc tính khách quan vốn có, làm cho sự vật là nó chứ không phải cái khác.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Biểu hiện bên ngoài</span>
              <h4 className="text-xl font-black text-white mb-3">LƯỢNG (Quantity)</h4>
              <p className="text-slate-400 leading-relaxed text-sm">
                Quy mô, số lượng, trình độ, nhịp độ vận động... Lượng thường xuyên biến đổi.
              </p>
            </div>
          </div>
        </div>

        <div className="relative p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-primary/20 to-green-500/20">
           <div className="bg-surface-dark rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Cơ Chế: Lượng đổi dẫn đến Chất đổi</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                 {/* Step 1 */}
                 <div className="flex-1 text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-surface-hover border-2 border-slate-600 flex items-center justify-center mx-auto mb-3">
                       <span className="material-symbols-outlined text-2xl text-slate-400">hourglass_top</span>
                    </div>
                    <h4 className="font-bold text-white">Tích lũy Lượng</h4>
                    <p className="text-xs text-slate-500 mt-1">Trong giới hạn "Độ"</p>
                 </div>

                 {/* Arrow */}
                 <div className="hidden md:block h-1 flex-1 bg-gradient-to-r from-slate-600 to-primary"></div>
                 
                 {/* Step 2 */}
                 <div className="flex-1 text-center relative z-10">
                    <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(31,173,150,0.3)] animate-pulse">
                       <span className="material-symbols-outlined text-3xl text-primary">target</span>
                    </div>
                    <h4 className="font-bold text-primary">Điểm Nút</h4>
                    <p className="text-xs text-slate-500 mt-1">Giới hạn tột cùng</p>
                 </div>

                 {/* Arrow */}
                 <div className="hidden md:block h-1 flex-1 bg-gradient-to-r from-primary to-accent"></div>

                 {/* Step 3 */}
                 <div className="flex-1 text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-3">
                       <span className="material-symbols-outlined text-2xl text-accent">rocket_launch</span>
                    </div>
                    <h4 className="font-bold text-white">Bước Nhảy</h4>
                    <p className="text-xs text-slate-500 mt-1">Chất mới ra đời</p>
                 </div>
              </div>

              <div className="mt-8 bg-white/5 rounded p-4 text-sm text-slate-300 italic border-l-4 border-primary">
                 "Ngược lại, khi Chất mới ra đời, nó cũng tác động trở lại làm thay đổi kết cấu, quy mô và trình độ của Lượng."
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'unity-struggle',
    title: '3. Quy Luật Mâu Thuẫn',
    icon: 'balance',
    content: (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
           <h3 className="text-2xl font-bold text-white mb-2">Hạt Nhân Của Phép Biện Chứng</h3>
           <p className="text-slate-400 mb-6">Chỉ ra nguồn gốc, động lực bên trong của sự phát triển.</p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/20 p-5 rounded-lg border border-white/5">
                <h4 className="text-accent font-bold mb-2">Mặt đối lập</h4>
                <p className="text-sm text-slate-400">Những thuộc tính, khuynh hướng trái ngược nhau nhưng cùng tồn tại trong một sự vật.</p>
              </div>
              <div className="bg-black/20 p-5 rounded-lg border border-white/5">
                <h4 className="text-accent font-bold mb-2">Mâu thuẫn biện chứng</h4>
                <p className="text-sm text-slate-400">Mối quan hệ vừa thống nhất vừa đấu tranh; vừa nương tựa, vừa phủ định lẫn nhau.</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
           <div className="flex-1 bg-gradient-to-b from-blue-500/10 to-transparent p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                 <span className="material-symbols-outlined text-3xl">handshake</span>
                 <h4 className="text-xl font-bold">Sự Thống Nhất</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm">
                 <li>Các mặt đối lập nương tựa vào nhau, làm điều kiện tồn tại cho nhau.</li>
                 <li>Tạo nên trạng thái ổn định tương đối (Đứng im tương đối).</li>
                 <li>Chứa đựng yếu tố đồng nhất để chuyển hóa lẫn nhau.</li>
                 <li className="font-bold text-white mt-2">Mang tính tương đối.</li>
              </ul>
           </div>

           <div className="flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-slate-600 rotate-90 md:rotate-0">swap_horiz</span>
           </div>

           <div className="flex-1 bg-gradient-to-b from-red-500/10 to-transparent p-6 rounded-xl border border-red-500/20">
              <div className="flex items-center gap-3 mb-4 text-red-400">
                 <span className="material-symbols-outlined text-3xl">swords</span>
                 <h4 className="text-xl font-bold">Sự Đấu Tranh</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm">
                 <li>Tác động qua lại theo hướng bài trừ, phủ định lẫn nhau.</li>
                 <li>Phá vỡ sự thống nhất cũ.</li>
                 <li>Dẫn đến sự hình thành thống nhất mới ở trình độ cao hơn.</li>
                 <li className="font-bold text-white mt-2">Mang tính tuyệt đối (Động lực).</li>
              </ul>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 'negation',
    title: '4. Phủ Định Của Phủ Định',
    icon: 'cyclone',
    content: (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
           <h3 className="text-2xl font-bold text-white mb-2">Khuynh Hướng Của Sự Phát Triển</h3>
           <p className="text-slate-400">Sự phát triển không đi theo đường thẳng, không theo vòng tròn khép kín, mà theo đường xoáy ốc.</p>
        </div>

        <div className="bg-surface-hover rounded-2xl p-8 border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
           
           <h4 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
             <span className="material-symbols-outlined">delete_forever</span>
             Phủ định biện chứng
           </h4>
           
           <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                 <div className="w-1 h-auto bg-indigo-500 rounded-full"></div>
                 <div>
                    <h5 className="font-bold text-white">Không xóa bỏ hoàn toàn</h5>
                    <p className="text-sm text-slate-400">Không phải là sự hủy diệt sạch trơn cái cũ.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-1 h-auto bg-indigo-500 rounded-full"></div>
                 <div>
                    <h5 className="font-bold text-white">Tính khách quan</h5>
                    <p className="text-sm text-slate-400">Do mâu thuẫn bên trong sự vật gây ra, là quá trình tự thân.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-1 h-auto bg-indigo-500 rounded-full"></div>
                 <div>
                    <h5 className="font-bold text-white">Tính kế thừa</h5>
                    <p className="text-sm text-slate-400">Loại bỏ cái lỗi thời, giữ lại và cải tạo những yếu tố tích cực.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-black/20 rounded-2xl p-8 border border-white/10">
           <h4 className="text-xl font-bold text-white mb-6 text-center">Chu Kỳ Phát Triển (Hình Xoáy Ốc)</h4>
           
           <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 opacity-50">
                 <span className="text-2xl font-black text-slate-600">01</span>
                 <div className="flex-1 p-4 bg-surface-dark rounded border border-white/5">
                    <span className="font-bold">Khẳng định ban đầu</span>
                 </div>
              </div>
              <div className="flex justify-center h-6 border-l border-dashed border-slate-600 ml-8"></div>
              
              <div className="flex items-center gap-4 opacity-75">
                 <span className="text-2xl font-black text-slate-500">02</span>
                 <div className="flex-1 p-4 bg-surface-dark rounded border border-white/5">
                    <span className="font-bold">Phủ định lần 1</span>
                    <span className="text-xs text-slate-400 block mt-1">(Cái đối lập xuất hiện)</span>
                 </div>
              </div>
              <div className="flex justify-center h-6 border-l border-dashed border-slate-600 ml-8"></div>

              <div className="flex items-center gap-4">
                 <span className="text-2xl font-black text-accent">03</span>
                 <div className="flex-1 p-4 bg-accent/10 rounded border border-accent">
                    <span className="font-bold text-accent">Phủ định lần 2 (Phủ định của phủ định)</span>
                    <span className="text-xs text-slate-300 block mt-1">
                       Giống cái ban đầu về hình thức nhưng cao hơn về chất.
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  }
];

const LibrarySection: React.FC<LibrarySectionProps> = ({ onExit }) => {
  const [activeTopicId, setActiveTopicId] = useState(TOPICS[0].id);

  const activeContent = TOPICS.find(t => t.id === activeTopicId)?.content;

  return (
    <div className="fixed inset-0 z-50 bg-background-dark flex flex-col font-display text-white animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-surface-dark flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
             <span className="material-symbols-outlined text-lg">menu_book</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Thư Viện Lý Luận</span>
        </div>
        <button 
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm font-bold text-slate-400 hover:text-white"
        >
          <span>Đóng</span>
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-[#111117] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto hidden md:flex">
          <div className="p-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Mục lục</h4>
            <div className="space-y-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                    activeTopicId === topic.id 
                      ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/20' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{topic.icon}</span>
                  <span className="text-sm">{topic.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto p-6 border-t border-white/5">
            <div className="bg-gradient-to-br from-surface-dark to-black p-4 rounded-xl border border-white/5">
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "Lý luận mà không có thực tiễn là lý luận suông. Thực tiễn mà không có lý luận là thực tiễn mù quáng."
                <br/>
                <span className="font-bold not-italic text-slate-400 mt-2 block">— Hồ Chí Minh</span>
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation (Tabs) */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface-dark border-t border-white/10 z-30 px-4 py-2 flex justify-between overflow-x-auto gap-2">
           {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] ${
                  activeTopicId === topic.id ? 'text-primary' : 'text-slate-500'
                }`}
              >
                <span className="material-symbols-outlined text-xl mb-1">{topic.icon}</span>
                <span className="text-[10px] font-bold whitespace-nowrap">{topic.title.split('.')[1].trim().split(' ')[0]}...</span>
              </button>
           ))}
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0B0B10] relative pb-20 md:pb-0">
          <div className="max-w-4xl mx-auto px-6 py-12">
             {activeContent}
          </div>
          
          {/* Decorative Footer in Content */}
          <div className="flex justify-center pb-12 opacity-30">
             <span className="material-symbols-outlined text-4xl text-slate-600">all_inclusive</span>
          </div>
        </main>

      </div>
    </div>
  );
};

export default LibrarySection;