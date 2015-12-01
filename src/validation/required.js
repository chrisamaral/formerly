/**
 *
 * @param value
 * @param type
 * @returns {boolean}
 */
module.exports = (value, type) => {
  if (typeof value === 'string' && !value.trim()) return false

  if (type === 'number') return !isNaN(Number(value))

  if (Array.isArray(value)) return Boolean(value.length)

  if (value instanceof Date) return !Boolean(value.toString().match(/invalid date/i))

  if (typeof value === 'object') return Boolean(value && Object.keys(value).length)

  return Boolean(value)
}
