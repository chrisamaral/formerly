export default (a, b) => {
  const diffType = (typeof a === 'string' && typeof b === 'number') || (typeof a === 'number' && typeof b === 'string')

  return diffType && (parseInt(a, 10) === parseInt(b, 10))
}
