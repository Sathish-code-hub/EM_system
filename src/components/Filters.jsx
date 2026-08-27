
export default function Filters({ 
  departments, 
  selectedDept, 
  onDeptChange, 
  selectedStatus, 
  onStatusChange 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <select
        value={selectedDept}
        onChange={(e) => onDeptChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 bg-slate-50/50 text-slate-800 font-medium transition-all">
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept === 'All' ? 'All Departments' : dept}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 bg-slate-50/50 text-slate-800 font-medium transition-all">
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}
