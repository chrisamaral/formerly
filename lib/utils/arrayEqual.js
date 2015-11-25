import almostSame from './numberEqualString'
export default (a, b) => a
  .map((val, index) => val === b[index] || almostSame(val, b[index]))
  .filter(Boolean)
  .length === a.length
