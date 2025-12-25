
import React from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `veo-video-${Date.now()}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cyber-card rounded-[2.5rem] p-5 shadow-xl overflow-hidden border-slate-200 bg-white">
      <div className="relative aspect-video bg-slate-100 rounded-3xl overflow-hidden group shadow-inner">
        <video 
          src={url} 
          controls 
          autoPlay 
          loop 
          className="w-full h-full object-contain"
        />
        
        <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] font-mono text-slate-800 tracking-widest uppercase font-bold">VEO-3.1 LIVE RENDER</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 pb-2">
        <div className="flex flex-col text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-600 font-bold mb-1">Status: Success</span>
          <span className="text-lg font-bold text-slate-900 tracking-tight">AI Masterpiece Generated</span>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            className="neon-button font-bold py-3 px-8 rounded-2xl transition-all flex items-center gap-2 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save to Device
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
