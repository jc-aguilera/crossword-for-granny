import { CrosswordPuzzle } from '../grid';

function rowWords(grid: string[][]): string[] {
  const word = grid.map((row) => row.map((c) => c || ' ').join(''));
  return word
    .join(' ')
    .split(' ')
    .filter((w) => w.length > 1);
}

export function horizontalWords(
  puzzle: CrosswordPuzzle,
): Array<string> | void {
  const grid = puzzle.filledGrid;
  return rowWords(grid);
}

export function verticalWords(puzzle: CrosswordPuzzle): Array<string> | void {
  const transposedGrid = transpose(puzzle.filledGrid);
  return rowWords(transposedGrid);
}

export function keepTilde(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u0302|\u0304-\u036f]/g, '')
    .normalize();
}

export function getRandomInt(
  min: number,
  max: number,
  rng = Math.random,
): number {
  const m = Math.ceil(min);
  const M = Math.floor(max);
  return Math.floor(rng() * (M - m) + m); //The maximum is exclusive and the minimum is inclusive
}

export function transpose(matrix: string[][]): string[][] {
  return matrix[0].map((_col, i) => matrix.map((row) => row[i]));
}

export function generatePairs(
  horzLimit: number,
  vertLimit: number,
): number[][] {
  const pairs = [];
  for (let i = 0; i < horzLimit; i++)
    for (let j = 0; j < vertLimit; j++) pairs.push([i, j]);
  return pairs;
}
