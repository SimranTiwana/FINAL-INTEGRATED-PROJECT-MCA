// Check if a value is a non-empty valid number
export const isValidNumber = (val) => {
  return val !== '' && !isNaN(val)
}

// Convert unit name like 'CUBIC_METRE' to 'Cubic Metre' for display
export const prettifyUnit = (unit) => {
  if (!unit) return ''
  return unit.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}