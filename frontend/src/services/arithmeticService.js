import api from './api'

// ========================================
// Perform arithmetic on two quantities
// ========================================
// Backend has four separate endpoints — one per operation.
// Both quantities are passed as QuantityInputDTO.
// The result unit = q1's unit (backend uses q1.unit as targetUnit for
// add/subtract/multiply; divide returns a dimensionless RATIO).
// So pass targetUnit as unit1 when you need the result in a specific unit.
// Returns QuantityMeasurementDTO → use .resultValue and .resultUnit
// ========================================

const OPERATION_ENDPOINT = {
  ADD:      '/api/v1/quantities/add',
  SUBTRACT: '/api/v1/quantities/subtract',
  MULTIPLY: '/api/v1/quantities/multiply',
  DIVIDE:   '/api/v1/quantities/divide',
}

export const performArithmetic = (
  value1, unit1,
  value2, unit2,
  operation,
  measurementType   // "LENGTHUNIT" | "WEIGHTUNIT" | "VOLUMEUNIT" | "TEMPERATUREUNIT"
) => {
  const endpoint = OPERATION_ENDPOINT[operation]

  if (!endpoint) {
    return Promise.reject(new Error(`Unknown operation: ${operation}`))
  }

  return api.post(endpoint, {
    thisQuantityDTO: {
      value: Number(value1),
      unit: unit1,
      measurementType,
    },
    thatQuantityDTO: {
      value: Number(value2),
      unit: unit2,
      measurementType,
    },
  })
}
