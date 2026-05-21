// Page title section used at the top of every feature page
const PageHeader = ({ icon: Icon, title, description, color = 'text-brand-500' }) => (
  <div className="mb-8 animate-fade-in">
    <div className="flex items-center gap-3 mb-2">
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Icon size={20} className={color} />
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{title}</h1>
    </div>
    {description && (
      <p className="text-slate-500 text-sm sm:text-base ml-[52px]">{description}</p>
    )}
  </div>
)

export default PageHeader