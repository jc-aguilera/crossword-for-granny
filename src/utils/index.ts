export function keepTilde(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u0302|\u0304-\u036f]/g, '')
    .normalize()
}

export function getRandomInt(min: number, max: number): number {
   let m = Math.ceil(min);
   let M = Math.floor(max);
   return Math.floor(Math.random() * (M - m) + m); //The maximum is exclusive and the minimum is inclusive
 }
 