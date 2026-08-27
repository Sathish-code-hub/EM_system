
export default function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="space-y-1 min-w-0">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block truncate">{title}</span>
        <span className="text-2xl font-bold text-slate-900 block">{value}</span>
      </div>
      <div className={`p-3 rounded-xl text-white ${color || 'bg-indigo-600'} shadow-sm shrink-0`}>
        <Icon className="w-5 h-5 stroke-[2]"/>
      </div>
    </div>
  );
}
