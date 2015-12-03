/**
 *
 * @param value
 * @param min
 * @param max
 */
module.exports = (value, min, max) => {
  if (!value && value !== 0) return true
  return value >= (typeof min === 'number' ? min : -Infinity) &&
    value <= (typeof max === 'number' ? max : Infinity)
}
