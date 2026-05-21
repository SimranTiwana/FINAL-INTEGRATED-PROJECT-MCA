import { CheckCircle } from 'lucide-react'

// Shows the result of a conversion or calculation
const ResultCard = ({ value, fromUnit, toUnit, label }) => (
  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-400/10 border border-brand-500/30 animate-slide-up">
    <div className="flex items-start gap-3">
      <CheckCircle size={20} className="text-brand-500 mt-0.5 shrink-0" />
      <div>
        {label && (
          <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">{label}</p>
        )}
        <p className="font-mono text-3xl font-bold text-slate-800">
          {typeof value === 'number' ? value.toFixed(4).replace(/\.?0+$/, '') : value}
          <span className="text-base font-sans font-medium text-slate-500 ml-2">{toUnit}</span>
        </p>
        {fromUnit && toUnit && (
          <p className="text-sm text-slate-500 mt-1">
            Converted from <span className="font-medium text-slate-700">{fromUnit}</span>
            {' → '}
            <span className="font-medium text-slate-700">{toUnit}</span>
          </p>
        )}
      </div>
    </div>
  </div>
)

export default ResultCard