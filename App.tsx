
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Generator from './components/Generator';
import VideoPlayer from './components/VideoPlayer';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import ProjectGallery from './components/ProjectGallery';
import FilmStudio from './components/FilmStudio';
import { VideoGenerationState, GenerationConfig, FilmProject } from './types';
import { generateAiVideo, checkApiKey, openKeySelector } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<VideoGenerationState>({
    isGenerating: false,
    progressMessage: '',
    error: null,
    videoUrl: null,
    needsKey: false
  });

  const [projects, setProjects] = useState<FilmProject[]>([]);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('p2f_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    }
    
    const verify = async () => {
      const hasKey = await checkApiKey();
      setState(prev => ({ ...prev, needsKey: !hasKey }));
    };
    verify();
  }, []);

  const saveProject = (url: string, prompt: string) => {
    const newProject: FilmProject = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      prompt,
      timestamp: Date.now()
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem('p2f_projects', JSON.stringify(updated));
  };

  const handleReorder = (newProjects: FilmProject[]) => {
    setProjects(newProjects);
    localStorage.setItem('p2f_projects', JSON.stringify(newProjects));
  };

  const handleClear = () => {
    if (confirm("Permanently delete your master library?")) {
      setProjects([]);
      localStorage.removeItem('p2f_projects');
    }
  };

  const handleSelectKey = async () => {
    await openKeySelector();
    // Proceed assuming success as per race condition guidelines
    setState(prev => ({ ...prev, needsKey: false }));
  };

  const handleGenerate = async (config: GenerationConfig) => {
    setState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      error: null, 
      videoUrl: null,
      progressMessage: 'Initializing Neuro-Synthesizer...' 
    }));

    try {
      const url = await generateAiVideo(
        config.prompt, 
        config.aspectRatio, 
        config.resolution,
        config.style,
        config.duration,
        (msg) => setState(prev => ({ ...prev, progressMessage: msg }))
      );
      setState(prev => ({ ...prev, isGenerating: false, videoUrl: url }));
      saveProject(url, config.prompt);
    } catch (err: any) {
      const isNotFoundError = err.message?.includes("Requested entity was not found");
      
      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        error: err.message || "Neural system disruption detected.",
        needsKey: isNotFoundError // Reset key state if 404
      }));

      if (isNotFoundError) {
        // The service already calls openKeySelector, but we ensure UI state is consistent
        console.debug("404 Error: Triggering key re-selection flow.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl z-10">
        {state.needsKey ? (
          <div className="cyber-card p-12 rounded-[3rem] text-center flex flex-col items-center gap-8 border-cyan-500/20 shadow-xl">
            <div className="w-24 h-24 bg-cyan-500/5 rounded-full flex items-center justify-center border border-cyan-500/10">
              <svg className="w-12 h-12 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Key Injection Required</h2>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed font-light">
                To access the <strong>Veo 3.1</strong> core, you must provide an authorized API key from your paid Google Cloud project.
              </p>
            </div>
            
            <button 
              onClick={handleSelectKey}
              className="px-12 py-5 neon-button font-black uppercase tracking-widest rounded-2xl active:scale-95"
            >
              Select Access Key
            </button>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Environment Node: Secured</p>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-600 underline hover:text-cyan-800 uppercase tracking-widest">View Billing Protocol</a>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {!state.isGenerating && !state.videoUrl && (
              <div className="animate-in fade-in zoom-in-95 duration-700">
                <Generator onGenerate={handleGenerate} isGenerating={state.isGenerating} />
              </div>
            )}

            {state.isGenerating && <LoadingScreen message={state.progressMessage} />}

            {state.error && !state.isGenerating && (
              <div className="cyber-card p-10 rounded-[2.5rem] border-red-500/20 text-center animate-in shake duration-500">
                <div className="text-red-500 mb-4 flex justify-center">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tighter">System Error</h4>
                <p className="text-slate-500 text-sm mb-8">{state.error}</p>
                <button 
                  onClick={() => setState(prev => ({ ...prev, error: null }))}
                  className="px-10 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                >
                  Restart Core
                </button>
              </div>
            )}

            {state.videoUrl && !state.isGenerating && (
              <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <VideoPlayer url={state.videoUrl} />
                <div className="mt-12 flex justify-center gap-6">
                  <button 
                    onClick={() => setState(prev => ({ ...prev, videoUrl: null }))}
                    className="group px-10 py-4 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3"
                  >
                    Generate Another Clip
                  </button>
                </div>
              </div>
            )}

            <ProjectGallery 
              projects={projects} 
              onSelect={(url) => setState(prev => ({ ...prev, videoUrl: url }))}
              onClear={handleClear}
              onStudio={() => setIsStudioOpen(true)}
            />
          </div>
        )}
      </main>

      <Footer />

      {isStudioOpen && (
        <FilmStudio projects={projects} onReorder={handleReorder} onClose={() => setIsStudioOpen(false)} />
      )}
    </div>
  );
};

export default App;
