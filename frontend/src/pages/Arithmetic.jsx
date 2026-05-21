import { useState } from 'react'
import { Calculator } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/Button'
import Card from '../components/Card'
import ResultCard from '../components/ResultCard'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { performArithmetic } from '../services/arithmeticService'
import { MEASUREMENT_TYPES, UNIT_MAP, ARITHMETIC_OPS } from '../utils/units'
import { isValidNumber, prettifyUnit } from '../utils/helpers'

const Arithmetic = () => {
  const [type,      setType]      = useState('LENGTHUNIT')
  const [value1,    setValue1]    = useState('')
  const [unit1,     setUnit1]     = useState('')
  const [value2,    setValue2]    = useState('')
  const [unit2,     setUnit2]     = useState('')
  const [operation, setOperation] = useState('ADD')
  const [result,    setResult]    = useState(null)
  const [loading,   setLoading]   = useState(false)

  const units = UNIT_MAP[type] || []

  const handleTypeChange = (e) => {
    setType(e.target.value)
    setUnit1('')
    setUnit2('')
    setResult(null)
  }

  const handleCalculate = async () => {
    if (!isValidNumber(value1) || !isValidNumber(value2)) return toast.error('Enter valid numbers for both values.')
    if (!unit1 || !unit2)  return toast.error('Select units for both quantities.')
    if (operation === 'DIVIDE' && Number(value2) === 0) return toast.error('Cannot divide by zero.')

    setLoading(true)
    setResult(null)
    try {
      // Backend uses q1.unit as the result unit for add/subtract/multiply.
      // For divide, result unit is "RATIO" (dimensionless).
      const res = await performArithmetic(value1, unit1, value2, unit2, operation, type)
      // Backend returns QuantityMeasurementDTO — result is in .resultValue / .resultUnit
      setResult(res.data)
      toast.success('Calculated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.')
    }
    setLoading(false)
  }

  const selectClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition'
  const inputClass  = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition placeholder:text-slate-400'

  const opSymbol = { ADD: '+', SUBTRACT: '−', MULTIPLY: '×', DIVIDE: '÷' }[operation] ?? '?'

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in">
      <PageHeader
        icon={Calculator}
        title="Arithmetic Operations"
        description="Add, subtract, multiply or divide two quantities — even across different units."
      />

      <Card className="p-6 sm:p-8">
        {/* Type and operation selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Measurement Type
            </label>
            <select value={type} onChange={handleTypeChange} className={selectClass}>
              {MEASUREMENT_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Operation
            </label>
            <select value={operation} onChange={e => setOperation(e.target.value)} className={selectClass}>
              {ARITHMETIC_OPS.map(op => (
                <option key={op.value} value={op.value}>{op.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity A — operator badge — Quantity B */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quantity A</label>
            <input type="number" value={value1} onChange={e => setValue1(e.target.value)}
              placeholder="Value" className={inputClass} />
            <select value={unit1} onChange={e => setUnit1(e.target.value)} className={`${selectClass} mt-2`}>
              <option value="">Select unit</option>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-center sm:pt-6">
            <span className="w-10 h-10 rounded-full bg-brand-500/10 text-brand-500 font-bold text-xl flex items-center justify-center border-2 border-brand-500/30">
              {opSymbol}
            </span>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quantity B</label>
            <input type="number" value={value2} onChange={e => setValue2(e.target.value)}
              placeholder="Value" className={inputClass} />
            <select value={unit2} onChange={e => setUnit2(e.target.value)} className={`${selectClass} mt-2`}>
              <option value="">Select unit</option>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <Button onClick={handleCalculate} loading={loading} className="w-full">
          Calculate
        </Button>

        {result && !loading && (
          <ResultCard
            value={result.resultValue}
            toUnit={prettifyUnit(result.resultUnit)}
            label={`${prettifyUnit(unit1)} ${opSymbol} ${prettifyUnit(unit2)}`}
          />
        )}
        {!result && !loading && (
          <EmptyState title="No result yet" description="Set both quantities, choose an operation and click Calculate." />
        )}
      </Card>
    </div>
  )
}

export default Arithmetic
