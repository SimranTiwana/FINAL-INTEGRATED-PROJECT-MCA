import { SearchX } from 'lucide-react'

// Shows a friendly empty state when there is no result yet
const EmptyState = ({ icon: Icon = SearchX, title = 'No result yet', description = 'Fill in the form and click Convert.' }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
      <Icon size={28} className="text-slate-400" />
    </div>
    <div>
      <h3 className="font-semibold text-slate-600">{title}</h3>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
  </div>
)

export default EmptyState