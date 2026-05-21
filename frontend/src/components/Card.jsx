// Simple card wrapper with optional hover lift effect
const Card = ({ children, className = '', hover = false }) => (
  <div
    className={`
      bg-white border border-slate-200 rounded-2xl shadow-sm
      ${hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </div>
)

export default Card