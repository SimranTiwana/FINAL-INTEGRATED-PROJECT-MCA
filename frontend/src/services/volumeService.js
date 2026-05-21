import api from './api'

// ========================================
// Convert a volume between units
// ========================================
// Backend: POST /api/v1/quantities/convert
// measurementType must be "VOLUMEUNIT" to match the backend switch case.
// Returns QuantityMeasurementDTO → use .resultValue and .resultUnit
// ========================================

export const convertVolume = (value, fromUnit, toUnit) => {
  return api.post('/api/v1/quantities/convert', {
    thisQuantityDTO: {
      value: Number(value),
      unit: fromUnit,
      measurementType: 'VOLUMEUNIT',
    },
    thatQuantityDTO: {
      value: 0,
      unit: toUnit,
      measurementType: 'VOLUMEUNIT',
    },
  })
}
