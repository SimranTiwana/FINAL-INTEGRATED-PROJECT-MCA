// ─────────────────────────────────────────────────────────────
// Unit values MUST match backend enum constant names exactly.
//
// LengthUnit      → FEET, INCH, YARDS, CENTIMETERS
// WeightUnit      → KILOGRAM, GRAM, POUND
// VolumeUnit      → LITRE, MILLILITRE, GALLON
// TemperatureUnit → CELSIUS, FAHRENHEIT, KELVIN
// ─────────────────────────────────────────────────────────────

export const LENGTH_UNITS = [
  { value: 'FEET',        label: 'Feet'        },
  { value: 'INCH',        label: 'Inch'        },
  { value: 'YARDS',       label: 'Yards'       },
  { value: 'CENTIMETERS', label: 'Centimeters' },
]

export const WEIGHT_UNITS = [
  { value: 'KILOGRAM', label: 'Kilogram' },
  { value: 'GRAM',     label: 'Gram'     },
  { value: 'POUND',    label: 'Pound'    },
]

export const TEMPERATURE_UNITS = [
  { value: 'CELSIUS',    label: 'Celsius (°C)'    },
  { value: 'FAHRENHEIT', label: 'Fahrenheit (°F)' },
  { value: 'KELVIN',     label: 'Kelvin (K)'      },
]

export const VOLUME_UNITS = [
  { value: 'LITRE',      label: 'Litre'      },
  { value: 'MILLILITRE', label: 'Millilitre' },
  { value: 'GALLON',     label: 'Gallon'     },
]

// Keys must match MEASUREMENT_TYPES values and backend switch-case strings
export const UNIT_MAP = {
  LENGTHUNIT:      LENGTH_UNITS,
  WEIGHTUNIT:      WEIGHT_UNITS,
  TEMPERATUREUNIT: TEMPERATURE_UNITS,
  VOLUMEUNIT:      VOLUME_UNITS,
}

// measurementType values must match backend switch-case exactly
export const MEASUREMENT_TYPES = [
  { value: 'LENGTHUNIT',      label: 'Length'      },
  { value: 'WEIGHTUNIT',      label: 'Weight'      },
  { value: 'TEMPERATUREUNIT', label: 'Temperature' },
  { value: 'VOLUMEUNIT',      label: 'Volume'      },
]

export const ARITHMETIC_OPS = [
  { value: 'ADD',      label: 'Addition (+)'       },
  { value: 'SUBTRACT', label: 'Subtraction (−)'    },
  { value: 'MULTIPLY', label: 'Multiplication (×)' },
  { value: 'DIVIDE',   label: 'Division (÷)'       },
]
