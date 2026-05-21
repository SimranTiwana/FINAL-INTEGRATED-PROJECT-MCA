import api from "./api"

// ========================================
// Convert a quantity to another unit
// ========================================
// Backend: POST /api/v1/quantities/convert
// Expects QuantityInputDTO:
//   thisQuantityDTO → the source quantity (value + fromUnit + measurementType)
//   thatQuantityDTO → used only for its unit (the target unit); value is 0
// Returns QuantityMeasurementDTO — result is in .resultValue / .resultUnit
// ========================================

export const convertUnit = async (
  value,
  fromUnit,
  toUnit,
  measurementType       // must be "LENGTHUNIT" | "WEIGHTUNIT" | etc.
) => {
  return await api.post("/api/v1/quantities/convert", {
    thisQuantityDTO: {
      value: Number(value),
      unit: fromUnit,
      measurementType,
    },
    thatQuantityDTO: {
      value: 0,
      unit: toUnit,
      measurementType,
    },
  })
}

// ========================================
// Check if two quantities are equal
// ========================================
// Backend: POST /api/v1/quantities/compare
// Returns QuantityMeasurementDTO where:
//   resultValue === 1.0  → equal
//   resultValue === 0.0  → not equal
// ========================================

export const compareUnits = async (
  value1, unit1,
  value2, unit2,
  measurementType
) => {
  return await api.post("/api/v1/quantities/compare", {
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
