
import React from 'react';
import { FilmProject } from '../types';

interface ProjectGalleryProps {
  projects: FilmProject[];
  onSelect: (url: string) => void;
  onClear: () => void;
  onStudio: () => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, onSelect, onClear, onStudio }) => {
  if (projects.length === 0) return null;

  return (
    <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Master Reel Library
        </h3>
        <div className="flex gap-4">
           {projects.length >= 3 && (
            <button 
              onClick={onStudio}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-600 rounded-lg hover:bg-fuchsia-600 hover:text-white transition-all shadow-sm"
            >
              Enter Film Studio
            </button>
          )}
          <button 
            onClick={handleClearPrompt}
            className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            Reset Library
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="cyber-card rounded-2xl overflow-hidden group cursor-pointer aspect-video relative border-slate-100 bg-white"
            onClick={() => onSelect(project.url)}
          >
            <video 
              src={project.url} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              muted
              onMouseOver={(e) => e.currentTarget.play()}
              onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="text-[10px] text-cyan-700 font-bold uppercase truncate">{project.prompt}</p>
              <p className="text-[8px] text-slate-400">{new Date(project.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleClearPrompt() {
    onClear();
  }
};

export default ProjectGallery;
