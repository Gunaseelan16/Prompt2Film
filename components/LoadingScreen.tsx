
import React from 'react';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="cyber-card p-16 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in zoom-in-95 duration-500 overflow-hidden relative bg-white border-slate-200">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative">
        <div className="w-32 h-32 border border-slate-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-32 h-32 border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute top-4 left-4 w-24 h-24 border-2 border-b-fuchsia-500 border-r-transparent border-t-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <span className="text-3xl opacity-80">💿</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Synthesizing Reality</h3>
        <p className="text-cyan-600/80 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse font-bold">{message}</p>
      </div>

      <div className="w-64 bg-slate-100 h-[3px] rounded-full relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 w-1/3 animate-[loading_1.5s_infinite_ease-in-out]"></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { left: -33%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
