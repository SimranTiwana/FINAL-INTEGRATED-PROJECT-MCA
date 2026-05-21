import { useState } from 'react'
import { ArrowRightLeft, Ruler } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/Button'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import ResultCard from '../components/ResultCard'
import PageHeader from '../components/PageHeader'
import { convertUnit, compareUnits } from '../services/converterService'
import { MEASUREMENT_TYPES, UNIT_MAP } from '../utils/units'
import { isValidNumber, prettifyUnit } from '../utils/helpers'

const Converter = () => {
  // Converter form state
  const [type,     setType]     = useState('LENGTHUNIT')
  const [value,    setValue]    = useState('')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit,   setToUnit]   = useState('')
  const [result,   setResult]   = useState(null)
  const [loading,  setLoading]  = useState(false)

  // Equality check state
  const [val2,      setVal2]      = useState('')
  const [unit2,     setUnit2]     = useState('')
  const [eqResult,  setEqResult]  = useState(null)
  const [eqLoading, setEqLoading] = useState(false)

  const units = UNIT_MAP[type] || []

  const handleTypeChange = (e) => {
    setType(e.target.value)
    setFromUnit('')
    setToUnit('')
    setResult(null)
    setEqResult(null)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult(null)
  }

  const handleConvert = async () => {
    if (!isValidNumber(value)) return toast.error('Please enter a valid number.')
    if (!fromUnit)             return toast.error('Select a "From" unit.')
    if (!toUnit)               return toast.error('Select a "To" unit.')
    if (fromUnit === toUnit)   return toast.error('From and To units are the same.')

    setLoading(true)
    setResult(null)
    try {
      const res = await convertUnit(value, fromUnit, toUnit, type)
      // Backend returns QuantityMeasurementDTO — result is in .resultValue
      setResult(res.data)
      toast.success('Converted successfully!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const handleCompare = async () => {
    if (!isValidNumber(value) || !isValidNumber(val2)) return toast.error('Enter both values.')
    if (!fromUnit || !unit2) return toast.error('Select units for both quantities.')

    setEqLoading(true)
    setEqResult(null)
    try {
      const res = await compareUnits(value, fromUnit, val2, unit2, type)
      // Backend returns QuantityMeasurementDTO where resultValue 1.0 = equal, 0.0 = not equal
      setEqResult(res.data.resultValue === 1.0)
      toast.success('Comparison complete!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.')
    }
    setEqLoading(false)
  }

  const selectClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition'
  const inputClass  = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition placeholder:text-slate-400'

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in">
      <PageHeader
        icon={Ruler}
        title="Unit Converter"
        description="Convert any quantity between supported units using the Spring Boot backend."
      />

      <Card className="p-6 sm:p-8">
        {/* Measurement type dropdown */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Measurement Type
          </label>
          <select value={type} onChange={handleTypeChange} className={selectClass}>
            {MEASUREMENT_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* From / Swap / To row */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end mb-6">

          {/* FROM column */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">From</label>
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Enter value"
              className={inputClass}
            />
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={`${selectClass} mt-2`}>
              <option value="">Select unit</option>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>

          {/* Swap button */}
          <button
            onClick={swapUnits}
            className="mb-1 mx-auto sm:mx-0 p-3 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-500 hover:text-brand-500 transition-all active:scale-90"
            aria-label="Swap units"
          >
            <ArrowRightLeft size={18} />
          </button>

          {/* TO column — shows result */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">To</label>
            <div className={`${inputClass} bg-slate-50 text-brand-600`}>
              {result?.resultValue ?? <span className="text-slate-300">Result</span>}
            </div>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={`${selectClass} mt-2`}>
              <option value="">Select unit</option>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <Button onClick={handleConvert} loading={loading} className="w-full">
          Convert
        </Button>

        {result && !loading && (
          <ResultCard
            value={result.resultValue}
            fromUnit={prettifyUnit(fromUnit)}
            toUnit={prettifyUnit(toUnit)}
            label="Result"
          />
        )}

        {!result && !loading && (
          <EmptyState title="No conversion yet" description="Fill in a value and both units, then hit Convert." />
        )}
      </Card>

      {/* Equality Check section */}
      <Card className="p-6 sm:p-8 mt-6">
        <h2 className="font-bold text-slate-700 mb-1">Equality Check</h2>
        <p className="text-sm text-slate-400 mb-5">Are two measurements (in different units) equal?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Value 1</label>
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="e.g. 1"
              className={inputClass}
            />
            <p className="text-xs text-slate-400 mt-1 ml-1">Unit: {prettifyUnit(fromUnit) || '—'}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Value 2</label>
            <input
              type="number"
              value={val2}
              onChange={e => setVal2(e.target.value)}
              placeholder="e.g. 12"
              className={inputClass}
            />
            <select value={unit2} onChange={e => setUnit2(e.target.value)} className={`${selectClass} mt-2`}>
              <option value="">Select unit</option>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <Button onClick={handleCompare} loading={eqLoading} variant="secondary">
          Check Equality
        </Button>

        {eqResult !== null && (
          <div className={`mt-4 p-4 rounded-xl text-sm font-medium flex items-center gap-2 border ${
            eqResult
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {eqResult
              ? '✓ Equal — these two quantities are the same.'
              : '✗ Not equal — these quantities differ.'}
          </div>
        )}
      </Card>
    </div>
  )
}

export default Converter
