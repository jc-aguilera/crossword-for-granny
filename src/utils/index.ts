export function keepTilde(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u0302|\u0304-\u036f]/g, '')
    .normalize()
}
