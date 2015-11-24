const toStr = val => val ? String(val) : ''
/**
 *
 * @param value
 * @param minLength
 * @param maxLength
 */
export default (value, minLength, maxLength) => toStr(value).length >= (typeof minLength === 'number' ? minLength : 0) && toStr(value).length <= (typeof maxLength === 'number' ? maxLength : Infinity)
