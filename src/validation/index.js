const validateEmail = require('./email')
const validateRequired = require('./required')
const validateLength = require('./length')
const validateRange = require('./range')

module.exports = function validate (value, {type, min, max, maxLength, minLength, shouldEqual, validator, required}) {
  const errors = {}

  if (typeof validator === 'function') {
    const res = validator(value)
    if (!res || res instanceof Error) errors.custom = res
  }

  if (required && !validateRequired(value, type)) {
    errors.required = true
  } else {
    if (shouldEqual !== undefined && shouldEqual !== value) errors.shouldEqual = true
    if ((min !== undefined || max !== undefined) && !validateRange(value, min, max)) errors.range = true
    if ((minLength !== undefined || maxLength !== undefined) && !validateLength(value, minLength, maxLength)) errors.length = true
    if (type === 'email' && !validateEmail(value)) errors.email = true
  }

  return Object.keys(errors).length ? errors : null
}
