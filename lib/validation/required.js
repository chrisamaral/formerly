/**
 *
 * @param value
 * @param type
 * @returns {boolean}
 */
export default (value, type) => {
  if (type === 'number') return typeof value === 'number'

  if (Array.isArray(value)) return Boolean(value.length)

  if (value instanceof Date) return !Boolean(value.toString().match(/invalid date/i))

  if (typeof value === 'object') return Boolean(value && Object.keys(value).length)

  return Boolean(value)
}
