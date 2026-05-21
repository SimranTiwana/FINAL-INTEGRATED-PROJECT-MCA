// Loading spinner component
// Use <Loader /> for a centered full-page spinner
// Use <Loader inline /> for a small inline spinner

const Loader = ({ inline = false }) => {
  if (inline) {
    return <span className="inline-block w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-slate-400">Loading...</p>
    </div>
  )
}

export default Loader