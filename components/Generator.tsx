
import React, { useState } from 'react';
import { GenerationConfig, VideoStyle, VideoDuration } from '../types';

interface GeneratorProps {
  onGenerate: (config: GenerationConfig) => void;
  isGenerating: boolean;
}

const STYLES: { id: VideoStyle; label: string; icon: string }[] = [
  { id: 'none', label: 'NEURAL', icon: '🧠' },
  { id: 'realistic', label: 'RASTER', icon: '📷' },
  { id: '3d', label: 'VOLUMETRIC', icon: '💎' },
  { id: 'anime', label: 'CELL', icon: '🎨' },
  { id: 'cyberpunk', label: 'NEON', icon: '🌩️' },
  { id: 'cinematic', label: 'PANAVISION', icon: '🎥' },
];

const Generator: React.FC<GeneratorProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [duration, setDuration] = useState<VideoDuration>(6);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle>('none');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate({
        prompt: prompt.trim(),
        aspectRatio,
        resolution,
        style: selectedStyle,
        duration
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cyber-card p-8 md:p-12 rounded-[3rem] shadow-xl relative overflow-hidden group bg-white/80 border border-slate-200">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
      
      <div className="space-y-10">
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-3 ml-2 italic">Neural Prompt Input</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Inject scene parameters... (e.g., A peaceful mountain lake at sunrise with mist)"
              className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-800 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none placeholder:text-slate-400 font-light"
              disabled={isGenerating}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
               <span className="text-[10px] text-slate-300 font-mono">ENCRYPTED STREAM</span>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2 italic">Visual Matrix Style</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                disabled={isGenerating}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group ${
                  selectedStyle === style.id 
                    ? 'bg-cyan-500/5 border-cyan-500 text-cyan-700 shadow-sm' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                }`}
              >
                <span className="text-xl mb-2 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">{style.icon}</span>
                <span className="text-[9px] font-black tracking-widest">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-2 italic">Output Ratio</label>
            <div className="flex gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
              {['16:9', '9:16'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAspectRatio(r as any)}
                  className={`flex-1 py-3 rounded-lg text-xs font-black tracking-widest transition-all ${aspectRatio === r ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-2 italic">Bitrate Protocol</label>
            <div className="flex gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
              {['720p', '1080p'].map(res => (
                <button
                  key={res}
                  type="button"
                  onClick={() => setResolution(res as any)}
                  className={`flex-1 py-3 rounded-lg text-xs font-black tracking-widest transition-all ${resolution === res ? 'bg-fuchsia-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-2 italic">Temporal Depth</label>
            <div className="flex gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
              {[3, 6, 10].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d as VideoDuration)}
                  className={`flex-1 py-3 rounded-lg text-xs font-black tracking-widest transition-all ${duration === d ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {d}S
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-6 neon-button font-black uppercase tracking-[0.4em] rounded-[2rem] active:scale-95 flex items-center justify-center gap-4 text-sm disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              INITIATE FILM SYNTHESIS
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Generator;
