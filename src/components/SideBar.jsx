import  { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SideBar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/employees', icon: Users },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    onClose();
    const toastId = toast.loading('Signing out...');
    setTimeout(() => {
      toast.dismiss(toastId);
      toast.success('Logged out successfully');
      setIsLoggingOut(false);
      navigate('/');
    }, 1000);
  };

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-400 px-6 pb-6 pt-6 md:pt-[26px] flex flex-col justify-between border-r border-slate-800/40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:sticky md:translate-x-0 md:h-screen md:top-0`}>
        
        <div className="space-y-7">

          {/* Header */}
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center space-x-3 text-white">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-base shadow-lg shadow-indigo-600/30">E</div>
              <span className="font-extrabold text-lg tracking-tight text-slate-100">Employee MS</span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 md:hidden focus:outline-none">
              <X className="w-5 h-5" />
            </button>
          </div>
        
          <div className="bg-slate-800/40 border border-slate-800/60 rounded-xl p-4 flex flex-col select-none">
            <span className="text-sm font-bold text-slate-100">Admin</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5">Administrator</span>
          </div>

          {/* directories */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-4 select-none">Navigation</span>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                      : 'hover:bg-slate-800/40 hover:text-slate-200'
                    }`}>

                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* logout */}
        <div className="border-t border-slate-800/60 pt-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all disabled:opacity-50 cursor-pointer focus:outline-none">
            {isLoggingOut ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-rose-400"/>
                <span className="text-rose-400 font-medium">Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4"/>
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>

      </aside>
    </>
  );
}

