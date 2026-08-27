import { useState, useMemo, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function Employees() {

  const { employees, isLoading: isGlobalLoading, error, retryFetch, addEmployee, updateEmployee, deleteEmployee } = useEmployees();

  // Search, Filter, & Sorting
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortAsc, setSortAsc] = useState(true);

  // Modal Form Workflow States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isTableSyncing, setIsTableSyncing] = useState(true);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setIsTableSyncing(true);
    const timer = setTimeout(() => {
      setIsTableSyncing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const departments = useMemo(() => {
    if (!employees) return ['All'];
    return ['All', ...new Set(employees.map(e => e.department))];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const dataPool = employees || [];
    return dataPool
      .filter(e => {
        const matchesSearch = 
          e.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
          e.email.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesDept = dept === 'All' || e.department === dept;
        const matchesStatus = status === 'All' || e.status.toLowerCase() === status.toLowerCase();
        return matchesSearch && matchesDept && matchesStatus;
      })
      .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }, [employees, debouncedSearch, dept, status, sortAsc]);

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  }, [filteredEmployees]);

  const isCurrentlyLoadingData = isGlobalLoading || isTableSyncing;

  if (error) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4 text-center p-6 md:pt-[26px]">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-full border border-rose-100">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="max-w-xs space-y-1">
          <h3 className="text-base font-bold text-slate-900">Database Sync Failed</h3>
          <p className="text-slate-400 text-xs font-medium leading-relaxed">{error}</p>
        </div>
        <button 
          onClick={retryFetch}
          className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Synchronizing</span>
        </button>
      </div>
    );
  }

  const handleAddOrEdit = async (formData) => {
    setIsProcessing(true);
    const toastId = toast.loading(editingEmployee ? 'Saving profile changes...' : 'Creating database record file...');
    
    setTimeout(() => {
      if (editingEmployee) {
        updateEmployee(editingEmployee._id, formData);
        toast.success(`Updated details for ${formData.name} successfully!`, { id: toastId });
      } else {
        addEmployee(formData);
        toast.success(`${formData.name} successfully added to the employees list`, { id: toastId });
        setCurrentPage(1);
      }
      setIsProcessing(false);
      setIsModalOpen(false);
      setEditingEmployee(null);
    }, 1000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure want to delete employee "${name}"?`)) {
      setIsProcessing(true);
      const toastId = toast.loading(`Removing record file for ${name}...`);
      
      setTimeout(() => {
        deleteEmployee(id);
        toast.success(`Deleted "${name}" from database.`, { id: toastId });        
        if (paginatedEmployees.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 w-full relative md:pt-[26px] animate-in fade-in duration-300">
      {isProcessing && (
        <div className="fixed inset-0 bg-slate-200/10 backdrop-blur-[1px] z-50 pointer-events-none" />
      )}

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employees Portal</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage, monitor, and configure corporate organizational team profiles.</p>
        </div>
        <button 
          onClick={() => { setEditingEmployee(null); setIsModalOpen(true); }}
          disabled={isProcessing}
          className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none active:scale-[0.98] cursor-pointer disabled:pointer-events-none">
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* filter toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="md:w-1/2">
          <SearchBar value={search} onChange={(val) => { setSearch(val); setCurrentPage(1); }} />
        </div>
        <div className="md:w-1/2">
          <Filters 
            departments={departments} 
            selectedDept={dept} 
            onDeptChange={(val) => { setDept(val); setCurrentPage(1); }} 
            selectedStatus={status} 
            onStatusChange={(val) => { setStatus(val); setCurrentPage(1); }} />
        </div>
      </div>

      {isCurrentlyLoadingData ? (

        <Loader message="Fetching employees..." fullPage={false} />
      ) : (
        <>
          {/* table */}
          <EmployeeTable 
            employees={paginatedEmployees} 
            onSort={() => setSortAsc(!sortAsc)} 
            sortAsc={sortAsc} 
            onEdit={(emp) => { setEditingEmployee(emp); setIsModalOpen(true); }} 
            onDelete={handleDelete}
            isProcessing={isProcessing}/>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 px-1 select-none">
              <p className="text-sm text-slate-500 font-medium">Page {currentPage} of {totalPages}</p>
              <div className="flex items-center space-x-2">
                <button 
                  disabled={currentPage === 1 || isProcessing} 
                  onClick={() => setCurrentPage(p => p - 1)} 
                  className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button 
                  disabled={currentPage === totalPages || isProcessing} 
                  onClick={() => setCurrentPage(p => p + 1)} 
                  className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>
          )}
        </>
      )}

      <EmployeeForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddOrEdit} 
        initialData={editingEmployee} 
        isProcessing={isProcessing}/>
    </div>

  );
}
