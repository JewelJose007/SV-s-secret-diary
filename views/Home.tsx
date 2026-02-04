
import React from 'react';
import { View, User } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
  user?: User;
  onLogout: () => void;
  entriesCount: number;
}

const Home: React.FC<HomeProps> = ({ onNavigate, user, onLogout, entriesCount }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* User Profile Header */}
      <div className="absolute top-12 left-8 right-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          {user?.picture ? (
            <img src={user.picture} alt="" className="w-8 h-8 rounded-full border border-stone-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[8px] text-stone-400">
              {user?.name?.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-stone-800 text-[10px] font-medium uppercase tracking-widest">{user?.name}</span>
            <span className="text-stone-300 text-[8px] uppercase tracking-widest">{entriesCount} Reflections</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="text-stone-300 hover:text-stone-800 text-[10px] uppercase tracking-widest transition-all hover:tracking-[0.2em]"
        >
          Exit
        </button>
      </div>

      {/* Background Breathing Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-stone-100 rounded-full blur-3xl breathing-circle" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gray-50 rounded-full blur-3xl breathing-circle" style={{ animationDelay: '2s' }} />

      <div className="z-10 text-center mb-16 animate-in fade-in duration-1000">
        <h1 className="font-serif text-5xl font-light tracking-tight text-stone-800 mb-2 italic">Steady Heart</h1>
        <p className="text-stone-400 text-[10px] tracking-[0.5em] uppercase pl-[0.5em]">A Private Sanctuary</p>
      </div>

      <div className="relative w-full max-w-sm aspect-square grid grid-cols-2 gap-4 z-10 p-4">
        {[
          { view: View.WRITE, label: 'Write', icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
          { view: View.PAUSE, label: 'Pause', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M10 15V9 M14 15V9' },
          { view: View.REFLECT, label: 'Reflect', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
          { view: View.ARCHIVE, label: 'Archive', icon: 'M21 8v13H3V8M1 3h22v5H1zM10 12h4' }
        ].map((item, idx) => (
          <button 
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] border border-stone-100 bg-white/40 backdrop-blur-sm hover:bg-white hover:border-stone-200 transition-all duration-500 group relative overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <span className="text-stone-400 group-hover:text-stone-800 text-[10px] mb-4 tracking-[0.3em] uppercase transition-all duration-500 font-medium">
              {item.label}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-200 group-hover:text-stone-800 transition-colors duration-500">
              <path d={item.icon} />
            </svg>
          </button>
        ))}

        {/* Center Connecting Star */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-stone-800 rotate-45 shadow-[0_0_20px_rgba(0,0,0,0.05)] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      <div className="mt-24 text-stone-300 text-[9px] uppercase tracking-[0.6em] animate-pulse">
        presence over progress
      </div>
    </div>
  );
};

export default Home;
