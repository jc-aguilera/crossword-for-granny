/**
 * @description Removes all accents from words, except tildes
 * @param {string} str The string to normalize
 * @returns Normalized string with tildes (~) 
 */
function keepTilde(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u0302|\u0304-\u036f]/g, '')
    .normalize()
}

module.exports = { keepTilde }
