import { CrosswordPuzzle, puzzle } from '../grid';

function rowWords(grid: string[][]): string[] {
  const word = grid.map((row) => row.map((c) => c || ' ').join(''));
  return word
    .join(' ')
    .split(' ')
    .filter((w) => w.length > 1);
}

export function horizontalWords({ grid }: { grid: string[][] }): string[] {
  return rowWords(grid);
}

export function verticalWords({ grid }: { grid: string[][] }): string[] {
  return rowWords(transpose(grid));
}

export function gridWords({ grid }: { grid: string[][] }): string[] {
  return [...horizontalWords({ grid }), ...verticalWords({ grid })];
}

export function isSameWordList(list1: string[], list2: string[]): boolean {
  return (
    JSON.stringify([...list1].sort()) === JSON.stringify([...list2].sort())
  );
}
export function keepTilde(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u0302|\u0304-\u036f]/g, '')
    .normalize();
}

export function scramble<T>(list: T[], rng = Math.random): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

export function prettyGrid(puzzle: CrosswordPuzzle): string {
  let prettyString = '';
  const separator = Array(puzzle.size[0] * 2 + 1)
    .fill('-')
    .join('');
  prettyString += separator + '\n';
  puzzle.filledGrid().forEach((row) => {
    prettyString += '|' + row.map((c) => c || ' ').join('|') + '|\n';
    prettyString += separator + '\n';
  });
  return prettyString;
}
