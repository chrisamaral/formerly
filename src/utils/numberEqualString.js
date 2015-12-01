module.exports = (a, b) => {
  const diffType = (typeof a === 'string' && typeof b === 'number') || (typeof a === 'number' && typeof b === 'string')

  return diffType && (Number(a) === Number(b))
}
