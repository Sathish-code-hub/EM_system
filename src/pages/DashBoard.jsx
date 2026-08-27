import { useMemo, useState, useEffect } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import SummaryCard from "../components/SummaryCard";
import Loader from '../components/Loader';
import { Users, Building2, Activity, AlertTriangle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { employees } = useEmployees();
  const navigate = useNavigate(); 

  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  useEffect(() => {
    setIsDashboardLoading(true);
    const timer = setTimeout(() => {
      setIsDashboardLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const metrics = useMemo(() => {
    const total = employees?.length || 0;
    const active = employees?.filter(e => e.status.toLowerCase() === 'active').length || 0;
    const inactive = total - active;
    const uniqueDepts = new Set(employees?.map(e => e.department)).size || 0;

    return { total, active, inactive, uniqueDepts };
  }, [employees]);

  const toSeeEmployees = () => {
    navigate("/employees" ,{replace:true});     
  };

  if (isDashboardLoading) {
    return <Loader fullPage={true} />;
  }

  return (
    <div className="w-full space-y-6 md:pt-[26px] animate-in fade-in duration-300">
      {/* title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Welcome back — here's your overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Employees"
          value={metrics.total.toString()}
          icon={Users}
          color="bg-blue-500"/>

        <SummaryCard
          title="Active Employees"
          value={metrics.active.toString()}
          icon={Activity}
          color="bg-indigo-500"/>

        <SummaryCard
          title="Inactive Employees"
          value={metrics.inactive.toString()}
          icon={AlertTriangle}
          color="bg-emerald-500"/>

        <SummaryCard
          title="Departments"
          value={metrics.uniqueDepts.toString()}
          icon={Building2}
          color="bg-rose-500"/>

      </div>

      <button 
        onClick={toSeeEmployees} 
        className="md:hidden inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none active:scale-[0.98] cursor-pointer">
        See all employees
      </button>
      
    </div>
  );
}
