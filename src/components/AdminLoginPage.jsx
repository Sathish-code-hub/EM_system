import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({email:'sample@gmail.com',password:'123',});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev,[name]: value,}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // to authentice
    setTimeout(() => {
      setIsLoading(false);
      console.log('Admin Authentication Payload:', formData);
      
      // to dashboard
      navigate('/dashboard', {replace: true});
       toast.success("Login Successfull")
    }, 2000);

  };


  return (
    <div className="min-h-screen w-full flex bg-slate-50/50 font-sans antialiased">
      {/* Left Panel */}

      <div className="hidden md:flex md:w-1/2 flex-col justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-12 lg:p-16 text-white relative overflow-hidden select-none border-r border-slate-200/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        
        <div className="max-w-md mx-auto space-y-6 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Employee <br />
            Management System
          </h1>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed font-normal max-w-sm">
           View and Mange employees securely
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center bg-white p-8 sm:p-12 md:p-16 lg:p-24 shadow-2xl shadow-slate-900/5">
        <div className="w-full max-w-md mx-auto">
    
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Admin Portal
          </h2>
          <p className="text-sm text-slate-500 mt-2 mb-8 font-medium">
            Sign in to manage the organization
          </p>          
          <form onSubmit={handleSubmit} className="space-y-6">            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Email address
              </label>
              <input type="email" name="email" required placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg border border-slate-200/80 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"/>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" required placeholder="....."
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200/80 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 active:scale-95 transition-all focus:outline-none">
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 stroke-[1.75]" />
                  ) : (
                    <Eye className="w-5 h-5 stroke-[1.75]" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/10 transition-all flex items-center justify-center text-sm h-11 active:scale-[0.98] disabled:pointer-events-none cursor-pointer">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                  <span className="text-slate-200 font-medium">Signing up...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
