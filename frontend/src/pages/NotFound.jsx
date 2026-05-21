import { Link } from 'react-router-dom'
import { Home, SearchX } from 'lucide-react'
import Button from '../components/Button'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-fade-in">
    <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
      <SearchX size={36} className="text-slate-400" />
    </div>
    <h1 className="text-6xl font-extrabold font-mono text-slate-200 mb-2">404</h1>
    <h2 className="text-xl font-bold text-slate-700 mb-2">Page not found</h2>
    <p className="text-slate-400 mb-8 max-w-sm">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to="/">
      <Button variant="primary" className="gap-2">
        <Home size={16} /> Back to Home
      </Button>
    </Link>
  </div>
)

export default NotFound
