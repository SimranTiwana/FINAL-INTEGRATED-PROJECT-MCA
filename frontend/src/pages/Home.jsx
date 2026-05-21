import { Link } from 'react-router-dom'
import {
  Ruler, Weight, Thermometer, Droplets,
  Calculator, ArrowRightLeft, Scale, Github, ArrowRight
} from 'lucide-react'
import Button from '../components/Button'

// Feature card data — one card per use case group
const FEATURES = [
  {
    icon: Ruler,
    title: 'Length Converter',
    desc: 'Convert between Feet, Inches, Metres, Kilometres and more.',
    to: '/converter',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    tag: 'UC3 · UC4 · UC5',
  },
  {
    icon: Weight,
    title: 'Weight Converter',
    desc: 'Grams, Kilograms, Pounds, Tonnes — instantly converted.',
    to: '/converter',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
    tag: 'UC9',
  },
  {
    icon: Thermometer,
    title: 'Temperature',
    desc: 'Celsius, Fahrenheit and Kelvin conversions with precision.',
    to: '/temperature',
    color: 'from-rose-400 to-red-500',
    bg: 'bg-rose-50',
    tag: 'UC14',
  },
  {
    icon: Droplets,
    title: 'Volume',
    desc: 'Convert Litres, Gallons, Millilitres and Cubic Metres.',
    to: '/volume',
    color: 'from-teal-400 to-emerald-500',
    bg: 'bg-teal-50',
    tag: 'UC11',
  },
  {
    icon: Calculator,
    title: 'Arithmetic',
    desc: 'Add, subtract, or divide quantities across mixed units.',
    to: '/arithmetic',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    tag: 'UC6 · UC12 · UC13',
  },
  {
    icon: Scale,
    title: 'Equality Check',
    desc: 'Compare if two measurements with different units are equal.',
    to: '/converter',
    color: 'from-pink-400 to-fuchsia-500',
    bg: 'bg-pink-50',
    tag: 'UC1 · UC2',
  },
  {
    icon: ArrowRightLeft,
    title: 'Unit-to-Unit',
    desc: 'Flexible any-to-any unit conversion in a single step.',
    to: '/converter',
    color: 'from-cyan-400 to-brand-500',
    bg: 'bg-cyan-50',
    tag: 'UC5',
  },
  {
    icon: Calculator,
    title: 'Generic Quantity',
    desc: 'Dynamic quantity handling driven by backend response.',
    to: '/generic',
    color: 'from-slate-400 to-slate-600',
    bg: 'bg-slate-100',
    tag: 'UC10',
  },
]

const Home = () => (
  <div className="animate-fade-in">

    {/* Hero section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 sm:py-32 px-6">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-widest mb-6 border border-brand-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow" />
          Spring Boot · React · Full Stack
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
          Quantity{' '}
          <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
            Measurement
          </span>{' '}
          App
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A clean, full-stack measurement system for Length, Weight, Temperature,
          Volume and more — built with Java Spring Boot + React.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/converter">
            <Button size="lg" className="gap-2">
              Try Converter <ArrowRight size={16} />
            </Button>
          </Link>
          <a
            href="https://github.com/SimranTiwana/QuantityMeasurementApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 gap-2">
              <Github size={16} /> View on GitHub
            </Button>
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[['17', 'Use Cases'], ['4', 'Measurement Types'], ['∞', 'Conversions']].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold font-mono text-white">{num}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feature cards grid */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">All Features</h2>
        <p className="text-slate-500 mt-2">Every use case from the spec, in one place.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map(({ icon: Icon, title, desc, to, color, bg, tag }, i) => (
          <Link
            key={title}
            to={to}
            className={`group p-6 rounded-2xl border border-slate-200 ${bg} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-slide-up`}
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both', opacity: 0 }}
          >
            {/* Colored icon */}
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
              <Icon size={20} className="text-white" />
            </div>

            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{tag}</span>
            <h3 className="font-bold text-slate-800 mt-1 mb-2 group-hover:text-brand-500 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>

            <div className="mt-4 flex items-center text-xs font-semibold text-brand-500 gap-1 group-hover:gap-2 transition-all">
              Open <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Tech stack strip */}
    <section className="border-t border-slate-200 bg-white py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-5">Built with</p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Java 17', 'Spring Boot 3', 'React 18', 'Vite', 'Tailwind CSS', 'Axios', 'JUnit 5', 'MySQL'].map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  </div>
)

export default Home
