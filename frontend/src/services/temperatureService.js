import api from './api'

// ========================================
// Convert a temperature between scales
// ========================================
// Backend: POST /api/v1/quantities/convert
// measurementType must be "TEMPERATUREUNIT" to match the backend switch case.
// Returns QuantityMeasurementDTO → use .resultValue and .resultUnit
// ========================================

export const convertTemperature = (value, fromUnit, toUnit) => {
  return api.post('/api/v1/quantities/convert', {
    thisQuantityDTO: {
      value: Number(value),
      unit: fromUnit,
      measurementType: 'TEMPERATUREUNIT',
    },
    thatQuantityDTO: {
      value: 0,
      unit: toUnit,
      measurementType: 'TEMPERATUREUNIT',
    },
  })
}
