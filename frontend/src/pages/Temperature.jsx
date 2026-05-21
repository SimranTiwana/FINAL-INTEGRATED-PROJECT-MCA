import { useState } from 'react'
import { Thermometer } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/Button'
import Card from '../components/Card'
import ResultCard from '../components/ResultCard'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { convertTemperature } from '../services/temperatureService'
import { TEMPERATURE_UNITS } from '../utils/units'
import { isValidNumber, prettifyUnit } from '../utils/helpers'

// Quick-pick presets for common conversions
const PRESETS = [
  { label: '0°C → °F',   value: 0,    from: 'CELSIUS',     to: 'FAHRENHEIT' },
  { label: '100°C → K',  value: 100,  from: 'CELSIUS',     to: 'KELVIN'     },
  { label: '98.6°F → °C',value: 98.6, from: 'FAHRENHEIT',  to: 'CELSIUS'    },
  { label: '373K → °C',  value: 373,  from: 'KELVIN',      to: 'CELSIUS'    },
]

// Symbol for each temperature scale
const SYMBOL = { CELSIUS: '°C', FAHRENHEIT: '°F', KELVIN: 'K' }

// Color for each scale card
const SCALE_COLOR = { CELSIUS: 'text-sky-500', FAHRENHEIT: 'text-rose-500', KELVIN: 'text-violet-500' }

const Temperature = () => {
  const [value,    setValue]    = useState('')
  const [fromUnit, setFromUnit] = useState('CELSIUS')
  const [toUnit,   setToUnit]   = useState('FAHRENHEIT')
  const [result,   setResult]   = useState(null)
  const [loading,  setLoading]  = useState(false)

  const handleConvert = async (v, f, t) => {
    // Use passed values OR fall back to state (for the regular Convert button)
    const val      = v ?? value
    const fromVal  = f ?? fromUnit
    const toVal    = t ?? toUnit

    if (!isValidNumber(val)) return toast.error('Enter a valid temperature value.')
    if (fromVal === toVal)   return toast.error('From and To units must differ.')

    setLoading(true)
    setResult(null)
    try {
      const res = await convertTemperature(val, fromVal, toVal)
      // Backend returns QuantityMeasurementDTO — result is in .resultValue
      setResult({ value: res.data.resultValue, fromUnit: fromVal, toUnit: toVal })
      toast.success('Converted!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  // Apply a preset by updating state and immediately calling the API
  const applyPreset = (p) => {
    setValue(String(p.value))
    setFromUnit(p.from)
    setToUnit(p.to)
    handleConvert(p.value, p.from, p.to)
  }

  const inputClass  = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono text-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition placeholder:text-slate-400'
  const selectClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition'

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <PageHeader
        icon={Thermometer}
        title="Temperature Converter"
        description="Convert between Celsius, Fahrenheit and Kelvin."
      />

      {/* Quick preset buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-600 hover:border-brand-500 hover:text-brand-500 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <Card className="p-6 sm:p-8">
        {/* Scale picker — click a card to select From scale */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TEMPERATURE_UNITS.map(u => (
            <button
              key={u.value}
              onClick={() => setFromUnit(u.value)}
              className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                fromUnit === u.value
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-slate-200 text-slate-500 hover:border-brand-300'
              }`}
            >
              <span className={`block text-xl font-bold font-mono ${SCALE_COLOR[u.value]}`}>
                {SYMBOL[u.value]}
              </span>
              {u.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Value input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Temperature ({SYMBOL[fromUnit]})
          </label>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="e.g. 100"
            className={inputClass}
          />
        </div>

        {/* Convert to */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Convert To
          </label>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={selectClass}>
            {TEMPERATURE_UNITS.map(u => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>

        <Button onClick={() => handleConvert()} loading={loading} className="w-full">
          Convert Temperature
        </Button>

        {result && !loading && (
          <ResultCard
            value={result.value}
            fromUnit={`${prettifyUnit(result.fromUnit)} (${SYMBOL[result.fromUnit]})`}
            toUnit={`${prettifyUnit(result.toUnit)} (${SYMBOL[result.toUnit]})`}
            label="Temperature Result"
          />
        )}
        {!result && !loading && (
          <EmptyState title="Select a scale & value" description="Pick a from-scale above, enter a temperature, then convert." />
        )}
      </Card>
    </div>
  )
}

export default Temperature