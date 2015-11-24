/**
 *
 * @param value
 * @param min
 * @param max
 */
export default (value, min, max) => value >= (typeof min === 'number' ? min : -Infinity) && value <= (typeof max === 'number' ? max : Infinity)
