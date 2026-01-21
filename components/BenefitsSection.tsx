import React from 'react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Trực quan hóa Trừu tượng",
      desc: "Thay vì đọc hàng trang lý thuyết khô khan, bạn nhìn thấy sự vận động của sự vật qua đồ họa mô phỏng thời gian thực.",
      icon: "visibility",
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Học qua Tương tác",
      desc: "Bạn không phải là người quan sát thụ động. Bạn trực tiếp thay đổi các tham số (Lượng) để tạo ra kết quả (Chất).",
      icon: "touch_app",
      color: "text-accent-lime",
      bg: "bg-accent-lime/10"
    },
    {
      title: "Tư duy Đa chiều",
      desc: "Rèn luyện óc quan sát và phân tích vấn đề từ nhiều phía, thấy được mâu thuẫn nội tại để tìm ra giải pháp đột phá.",
      icon: "psychology_alt",
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "Ghi nhớ Dài hạn",
      desc: "Việc kết hợp âm thanh, hình ảnh và thao tác tay giúp kiến thức đi vào vùng trí nhớ dài hạn nhanh gấp 3 lần cách học vẹt.",
      icon: "memory",
      color: "text-orange-400",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <section className="py-24 bg-[#14141b] relative border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content: Purpose */}
          <div className="lg:w-1/3">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Mục đích & Giá trị</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              Tại sao chúng tôi xây dựng <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Cổng Game này?</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Triết học Mác-Lênin thường bị coi là khó hiểu và xa rời thực tế. Chúng tôi tin rằng: <strong>Bản chất của triết học là sự sống động.</strong>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Mục tiêu của dự án là hạ thấp rào cản nhập môn, giúp sinh viên và người học yêu thích việc tư duy biện chứng thông qua ngôn ngữ của thời đại kỹ thuật số: <strong>Gamification (Game hóa)</strong>.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-[#14141b] bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                      <span className="material-symbols-outlined text-sm">face</span>
                   </div>
                 ))}
              </div>
              <div className="text-xs font-bold text-slate-500">
                <span className="text-white block text-sm">1,200+</span>
                Người học đã tham gia
              </div>
            </div>
          </div>

          {/* Right Content: Benefits Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((item, idx) => (
              <div key={idx} className="bg-surface-dark border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group shadow-lg">
                <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                   <span className={`material-symbols-outlined text-2xl ${item.color}`}>{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;