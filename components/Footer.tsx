
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 mt-auto border-t border-slate-100">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-slate-400 tracking-wide uppercase font-bold">
            Powered by Gemini Veo 3.1
          </p>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
            Prompt2Film &copy; {new Date().getFullYear()} · Professional Edition
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
