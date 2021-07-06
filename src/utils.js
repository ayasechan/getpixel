/**
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
export const rgb2hex = (r, g, b) => {
  const s = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return s.toUpperCase()
}
