/**
 *
 * @param value
 * @param min
 * @param max
 */
module.exports = (value, min, max) => value >= (typeof min === 'number' ? min : -Infinity) && value <= (typeof max === 'number' ? max : Infinity)
