
import React, { useState } from 'react';
import { FilmProject } from '../types';

interface FilmStudioProps {
  projects: FilmProject[];
  onClose: () => void;
  onReorder: (newProjects: FilmProject[]) => void;
}

const FilmStudio: React.FC<FilmStudioProps> = ({ projects, onClose, onReorder }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleExport = () => {
    alert("In this portfolio version, 'Export' generates a combined project manifest. In a full version, this would trigger a cloud-side video stitch operation.");
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt2film-project.json';
    a.click();
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const onDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedProjects = [...projects];
    const [movedItem] = updatedProjects.splice(draggedIndex, 1);
    updatedProjects.splice(index, 0, movedItem);

    onReorder(updatedProjects);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="cyber-card w-full max-w-5xl h-[80vh] flex flex-col rounded-[2.5rem] border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-fuchsia-50/30">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Film Studio <span className="text-fuchsia-600">v1.0</span></h2>
            <span className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 text-[10px] font-bold uppercase tracking-wider">{projects.length} Clips Loaded</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-100 p-2 rounded-full">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-slate-50/50">
             <div className="grid grid-cols-2 gap-4">
                {projects.map((p, idx) => (
                  <div 
                    key={p.id} 
                    draggable
                    onDragStart={(e) => onDragStart(e, idx)}
                    onDragOver={(e) => onDragOver(e, idx)}
                    onDrop={(e) => onDrop(e, idx)}
                    onDragEnd={onDragEnd}
                    className={`relative aspect-video rounded-xl overflow-hidden border transition-all cursor-move shadow-sm bg-white ${
                      draggedIndex === idx ? 'opacity-30 scale-95 border-fuchsia-500' : 
                      dragOverIndex === idx ? 'border-cyan-400 scale-105 z-10 shadow-lg' : 
                      'border-slate-200 hover:border-cyan-300'
                    }`}
                  >
                    <video src={p.url} muted className="w-full h-full object-cover opacity-90 pointer-events-none" />
                    <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-slate-900 border border-slate-100 flex items-center gap-1">
                      <svg className="w-3 h-3 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      CLIP {idx + 1}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white text-[10px] text-slate-600 truncate font-medium">{p.prompt}</div>
                  </div>
                ))}
             </div>
          </div>

          <div className="w-full md:w-80 bg-white border-l border-slate-100 p-8 flex flex-col gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest">Global Settings</h4>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1 font-bold">Timeline Transition</span>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800">
                    <option>Crossfade (AI Enhanced)</option>
                    <option>Hard Cut</option>
                    <option>Glitch Effect</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1 font-bold">Color Lut</span>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800">
                    <option>Neural Blue</option>
                    <option>Professional Flat</option>
                    <option>Cinema Warm</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <button 
                onClick={handleExport}
                className="w-full py-4 neon-button font-black uppercase tracking-widest rounded-xl text-xs"
              >
                Compile & Export Film
              </button>
              <p className="text-[8px] text-center text-slate-400 font-mono tracking-tighter">Drag clips to reorder the sequence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmStudio;
