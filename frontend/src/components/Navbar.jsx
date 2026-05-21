import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Menu, X, Ruler } from 'lucide-react'

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  // Check if token exists
  const isLoggedIn = localStorage.getItem("token")

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  // Active link styles
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 px-1 py-0.5 border-b-2 ${
      isActive
        ? 'text-brand-500 border-brand-500'
        : 'text-slate-500 border-transparent hover:text-brand-500'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">

            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-md">
              <Ruler size={16} className="text-white" />
            </div>

            <span className="font-bold text-lg text-slate-800 tracking-tight">
              Quantity<span className="text-brand-500">App</span>
            </span>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/converter" className={linkClass}>
              Converter
            </NavLink>

            <NavLink to="/arithmetic" className={linkClass}>
              Arithmetic
            </NavLink>

            <NavLink to="/temperature" className={linkClass}>
              Temperature
            </NavLink>

            <NavLink to="/volume" className={linkClass}>
              Volume
            </NavLink>


            {!isLoggedIn ? (

              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

            ) : (

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Logout
              </button>

            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >

            {menuOpen ? <X size={20} /> : <Menu size={20} />}

          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-3 animate-fade-in">

          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/converter"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Converter
          </NavLink>

          <NavLink
            to="/arithmetic"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Arithmetic
          </NavLink>

          <NavLink
            to="/temperature"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Temperature
          </NavLink>

          <NavLink
            to="/volume"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Volume
          </NavLink>

         

          {!isLoggedIn ? (

            <NavLink
              to="/login"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>

          ) : (

            <button
              onClick={handleLogout}
              className="text-left text-sm font-medium text-red-500 hover:text-red-600"
            >
              Logout
            </button>

          )}

        </div>

      )}

    </nav>
  )
}

export default Navbar