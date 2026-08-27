import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '.SideBar';
import { Menu } from 'lucide-react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans antialiased text-slate-600">
      
      {/* menu */}
      <header className="flex items-center justify-between bg-[#0f172a] px-6 py-4 border-b border-slate-800 md:hidden sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">E</div>
          <span className="font-bold text-slate-100 tracking-tight text-base">Employee MS</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full min-w-0 px-6 md:px-10 lg:px-12 pt-6 md:pt-0 pb-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
