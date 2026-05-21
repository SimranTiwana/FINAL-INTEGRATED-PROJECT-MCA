// Reusable button with loading spinner support
// Usage: <Button variant="primary" loading={true} onClick={fn}>Save</Button>

const Button = ({ children, variant = 'primary', size = 'lg', loading = false, disabled = false, className = '', ...props }) => {
  // Pick styles based on the variant prop
  let variantStyle = ''
  if (variant === 'primary') {
    variantStyle = 'bg-brand-500 hover:bg-brand-600 text-white shadow-md'
  } else if (variant === 'secondary') {
    variantStyle = 'bg-slate-100 hover:bg-slate-200 text-slate-700'
  } else if (variant === 'outline') {
    variantStyle = 'border-2 border-brand-500 text-brand-500 hover:bg-brand-50'
  } else if (variant === 'danger') {
    variantStyle = 'bg-red-500 hover:bg-red-600 text-white'
  }

  // Pick size
  let sizeStyle = 'px-5 py-2.5 text-sm'
  if (size === 'sm') sizeStyle = 'px-3 py-1.5 text-xs'
  if (size === 'lg') sizeStyle = 'px-7 py-3 text-base'

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {/* Show a spinner when loading */}
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button