
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative pt-12 pb-6 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/20 bg-white/40 backdrop-blur-md mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-600">Pro Studio · Veo 3.1</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-2">
        PROMPT<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-600">2FILM</span>
      </h1>
      <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto px-6 tracking-wide">
        The Ultimate AI Director's Suite. Craft, compile, and export cinematic reality.
      </p>
    </header>
  );
};

export default Header;
