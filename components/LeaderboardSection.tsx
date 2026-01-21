import React, { useState } from 'react';

interface LeaderboardSectionProps {
  onExit: () => void;
  userScore: number;
}

const MOCK_LEADERBOARD = [
  { id: 1, name: "K. Marx", score: 15420, rank: "Triết Gia Vĩ Đại", avatar: "face_3" },
  { id: 2, name: "F. Engels", score: 14850, rank: "Nhà Lý Luận", avatar: "face_6" },
  { id: 3, name: "V.I. Lenin", score: 13200, rank: "Nhà Cách Mạng", avatar: "face_5" },
  { id: 4, name: "Hegel", score: 11500, rank: "Nhà Biện Chứng", avatar: "face_4" },
  { id: 5, name: "Heraclitus", score: 9800, rank: "Học Giả", avatar: "face_2" },
  { id: 6, name: "Người chơi 452", score: 8500, rank: "Học Giả", avatar: "person" },
  { id: 7, name: "Người chơi 102", score: 7200, rank: "Thực Tập Sinh", avatar: "person" },
  { id: 8, name: "Người chơi 999", score: 6500, rank: "Thực Tập Sinh", avatar: "person" },
];

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ onExit, userScore }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');

  // Insert current user into the list for display purposes if not top 3
  const displayList = [...MOCK_LEADERBOARD];
  
  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B10] flex flex-col font-display text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-surface-dark flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-500">
             <span className="material-symbols-outlined text-lg">trophy</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Bảng Xếp Hạng</span>
        </div>
        <button 
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm font-bold text-slate-400 hover:text-white"
        >
          <span>Đóng</span>
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-dark relative pb-24">
         {/* Background Effect */}
         <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>

         <div className="max-w-3xl mx-auto px-6 py-8 relative z-10">
            
            {/* Tabs - FIX: Improved styling and gap */}
            <div className="flex justify-center mb-8">
               <div className="bg-white/5 p-1.5 rounded-xl flex gap-2 border border-white/10">
                  <button 
                    onClick={() => setActiveTab('global')}
                    className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'global' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    Toàn cầu
                  </button>
                  <button 
                    onClick={() => setActiveTab('friends')}
                    className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'friends' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    Bạn bè
                  </button>
               </div>
            </div>

            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-4 mb-12">
               {/* 2nd Place */}
               <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-slate-400 bg-slate-800 flex items-center justify-center mb-3 relative">
                     <span className="material-symbols-outlined text-4xl text-slate-400">{MOCK_LEADERBOARD[1].avatar}</span>
                     <div className="absolute -bottom-3 bg-slate-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">#2</div>
                  </div>
                  <div className="text-white font-bold text-sm">{MOCK_LEADERBOARD[1].name}</div>
                  <div className="text-orange-400 font-black text-sm">{MOCK_LEADERBOARD[1].score.toLocaleString()}</div>
               </div>

               {/* 1st Place */}
               <div className="flex flex-col items-center -mt-6">
                  <div className="relative">
                    <span className="material-symbols-outlined text-yellow-500 text-4xl absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">crown</span>
                    <div className="w-24 h-24 rounded-full border-4 border-yellow-500 bg-yellow-500/20 flex items-center justify-center mb-3 relative shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                       <span className="material-symbols-outlined text-5xl text-yellow-500">{MOCK_LEADERBOARD[0].avatar}</span>
                       <div className="absolute -bottom-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full border-2 border-background-dark">#1</div>
                    </div>
                  </div>
                  <div className="text-white font-bold text-base">{MOCK_LEADERBOARD[0].name}</div>
                  <div className="text-orange-400 font-black text-lg">{MOCK_LEADERBOARD[0].score.toLocaleString()}</div>
               </div>

               {/* 3rd Place */}
               <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-orange-700 bg-orange-900/50 flex items-center justify-center mb-3 relative">
                     <span className="material-symbols-outlined text-4xl text-orange-700">{MOCK_LEADERBOARD[2].avatar}</span>
                     <div className="absolute -bottom-3 bg-orange-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">#3</div>
                  </div>
                  <div className="text-white font-bold text-sm">{MOCK_LEADERBOARD[2].name}</div>
                  <div className="text-orange-400 font-black text-sm">{MOCK_LEADERBOARD[2].score.toLocaleString()}</div>
               </div>
            </div>

            {/* List */}
            <div className="space-y-3">
               {displayList.slice(3).map((user, index) => (
                 <div key={user.id} className="flex items-center gap-4 bg-surface-hover rounded-xl p-4 border border-white/5 hover:border-white/20 transition-colors">
                    <span className="w-8 text-center font-bold text-slate-500">#{index + 4}</span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-slate-300">{user.avatar}</span>
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-white text-sm">{user.name}</h4>
                       <span className="text-xs text-slate-500">{user.rank}</span>
                    </div>
                    <div className="font-black text-orange-400">{user.score.toLocaleString()}</div>
                 </div>
               ))}
            </div>
         </div>
      </main>

      {/* User Stats Sticky Footer */}
      <div className="absolute bottom-0 inset-x-0 bg-[#1c222e] border-t border-orange-500/30 p-4 pb-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
         <div className="max-w-3xl mx-auto flex items-center gap-4">
             <span className="w-8 text-center font-bold text-orange-500">---</span>
             <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">face</span>
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-white">Bạn (Hiện tại)</h4>
                <span className="text-xs text-primary font-bold">Mới gia nhập</span>
             </div>
             <div className="text-right">
                <div className="font-black text-2xl text-accent">{userScore.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Điểm tích lũy</div>
             </div>
         </div>
      </div>

    </div>
  );
};

export default LeaderboardSection;