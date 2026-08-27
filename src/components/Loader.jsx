import { Loader2 } from 'lucide-react';

export default function Loader({ message = "Loading data...", fullPage = false }) {
  return (
    <div className={`w-full flex flex-col items-center justify-center space-y-4 text-center
      ${fullPage 
        ? 'h-[60vh] md:pt-[26px]' 
        : 'min-h-[300px] bg-white rounded-xl border border-slate-200/80 shadow-sm'
      }`}>
        
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      <p className="text-slate-500 text-sm font-semibold tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}
