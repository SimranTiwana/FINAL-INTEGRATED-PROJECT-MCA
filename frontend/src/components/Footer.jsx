import { Github, Ruler } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 mt-16">
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
            <Ruler size={14} className="text-white" />
          </div>
          <span className="font-bold text-slate-700">
            Quantity<span className="text-brand-500">App</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <Link to="/converter" className="hover:text-brand-500 transition-colors">Converter</Link>
          <Link to="/arithmetic" className="hover:text-brand-500 transition-colors">Arithmetic</Link>
          <Link to="/temperature" className="hover:text-brand-500 transition-colors">Temperature</Link>
          <a
            href="https://github.com/SimranTiwana/QuantityMeasurementApp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-500 transition-colors flex items-center gap-1"
          >
            <Github size={15} /> GitHub
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Simran Tiwana · Chitkara MCA
        </p>
      </div>
    </div>
  </footer>
)

export default Footer