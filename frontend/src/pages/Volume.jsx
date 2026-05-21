import { useState } from 'react'
import { Droplets, ArrowRightLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/Button'
import Card from '../components/Card'
import ResultCard from '../components/ResultCard'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { convertVolume } from '../services/volumeService'
import { VOLUME_UNITS } from '../utils/units'
import { isValidNumber, prettifyUnit } from '../utils/helpers'

const Volume = () => {
  const [value,    setValue]    = useState('')
  const [fromUnit, setFromUnit] = useState('LITRE')
  const [toUnit,   setToUnit]   = useState('MILLILITRE')
  const [result,   setResult]   = useState(null)
  const [loading,  setLoading]  = useState(false)

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult(null)
  }

  const handleConvert = async () => {
    if (!isValidNumber(value)) return toast.error('Enter a valid number.')
    if (fromUnit === toUnit)   return toast.error('Units must differ.')

    setLoading(true)
    setResult(null)
    try {
      const res = await convertVolume(value, fromUnit, toUnit)
      // Backend returns QuantityMeasurementDTO — result is in .resultValue
      setResult(res.data)
      toast.success('Converted!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const selectClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition'
  const inputClass  = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono text-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition placeholder:text-slate-400'

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <PageHeader
        icon={Droplets}
        title="Volume Converter"
        description="Convert Litres, Millilitres, Gallons and Cubic Metres."
      />

      {/* Quick unit picker cards */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {VOLUME_UNITS.map(u => (
          <button
            key={u.value}
            onClick={() => setFromUnit(u.value)}
            className={`py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all text-center ${
              fromUnit === u.value
                ? 'border-teal-500 bg-teal-50 text-teal-600'
                : 'border-slate-200 text-slate-500 hover:border-teal-300'
            }`}
          >
            <Droplets size={16} className={`mx-auto mb-1 ${fromUnit === u.value ? 'text-teal-500' : 'text-slate-400'}`} />
            {u.label}
          </button>
        ))}
      </div>

      <Card className="p-6 sm:p-8">
        {/* Value input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Volume</label>
          <input
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="e.g. 5"
            className={inputClass}
          />
        </div>

        {/* From / Swap / To */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">From</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={selectClass}>
              {VOLUME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
          <button
            onClick={swapUnits}
            className="p-3 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-500 hover:text-teal-500 transition-all active:scale-90"
          >
            <ArrowRightLeft size={18} />
          </button>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">To</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={selectClass}>
              {VOLUME_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <Button onClick={handleConvert} loading={loading} className="w-full bg-teal-500 hover:bg-teal-600">
          Convert Volume
        </Button>

        {result && !loading && (
          <ResultCard
            value={result.resultValue}
            fromUnit={prettifyUnit(fromUnit)}
            toUnit={prettifyUnit(toUnit)}
            label="Volume Result"
          />
        )}
        {!result && !loading && (
          <EmptyState title="Ready to convert" description="Select units and enter a volume above." />
        )}
      </Card>
    </div>
  )
}

export default Volume