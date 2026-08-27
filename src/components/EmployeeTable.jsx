import { ArrowUpDown, Edit2, Trash2 } from 'lucide-react';

function EmployeeTable({ employees, onSort, sortAsc, onEdit, onDelete, isProcessing }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden w-full relative">
      
      {/* horizontal scroll bar */}
      <div className="w-full overflow-x-auto block pb-3
        [scrollbar-width:thin] 
        [scrollbar-color:#cbd5e1_#f1f5f9]
        [&::-webkit-scrollbar]:!inline-block
        [&::-webkit-scrollbar]:h-2 
        [&::-webkit-scrollbar-track]:bg-slate-100
        [&::-webkit-scrollbar-track]:rounded-b-xl
        [&::-webkit-scrollbar-thumb]:bg-slate-300 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
          
        <table className="w-full border-collapse text-left text-sm text-slate-600 min-w-[700px]">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 select-none">
            <tr>
              <th className="px-6 py-4">
                <button 
                  onClick={onSort}
                  disabled={isProcessing}
                  className="flex items-center space-x-1.5 hover:text-slate-900 group transition-colors focus:outline-none disabled:pointer-events-none">
                  <span>Name</span>
                  <ArrowUpDown className={`w-3.5 h-3.5 transition-colors ${sortAsc ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}/>
                </button>
              </th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 hidden sm:table-cell">Department</th>
              <th className="px-6 py-4 hidden md:table-cell">Designation</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 hidden lg:table-cell">Joining Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {employees && employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id} className={`transition-colors ${isProcessing ? 'opacity-40' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{emp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">{emp.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700 hidden sm:table-cell">{emp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 hidden md:table-cell">{emp.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border ${
                      emp.status.toLowerCase() === 'active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${emp.status.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 hidden lg:table-cell">{emp.joiningDate || 'N/A'}</td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-1">
                    <button 
                      onClick={() => onEdit(emp)}
                      disabled={isProcessing}
                      className="inline-flex p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all focus:outline-none disabled:opacity-30">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(emp._id, emp.name)}
                      disabled={isProcessing}
                      className="inline-flex p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-all focus:outline-none disabled:opacity-30">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center text-slate-400 font-medium bg-slate-50/30">
                  No employee records match the active filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;
