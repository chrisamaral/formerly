const toStr = val => val ? String(val) : ''
/**
 *
 * @param value
 * @param minLength
 * @param maxLength
 */
module.exports = (value, minLength, maxLength) => {
  if (!value) return true
  return toStr(value).length >= (typeof minLength === 'number' ? minLength : 0) &&
    toStr(value).length <= (typeof maxLength === 'number' ? maxLength : Infinity)
}
