import { getRandomInt } from './utils';

type direction = 'horizontal' | 'vertical';
interface Word {
  word: string;
  direction: direction;
  xStart: number;
  yStart: number;
}

export interface CrosswordPuzzle {
  size: [number, number];
  words: Word[];
  readonly filledGrid: string[][];
  addWord: (newWord: string) => boolean;
}

export const puzzle: CrosswordPuzzle = {
  size: [10, 10],
  words: [
    {
      word: 'perro',
      direction: 'vertical',
      xStart: 2,
      yStart: 0,
    },
    {
      word: 'gato',
      direction: 'vertical',
      xStart: 2,
      yStart: 9,
    },
    {
      word: 'loro',
      direction: 'vertical',
      xStart: 2,
      yStart: 1,
    },
  ],
  get filledGrid() {
    const grid: string[][] = [...new Array(this.size[0])].map(() =>
      new Array(this.size[1]).fill(''),
    );
    this.words.forEach(({ word, direction, xStart, yStart }) => {
      word.split('').forEach((c, i) => {
        grid[xStart + (direction === 'horizontal' ? 0 : i)][
          yStart + (direction === 'vertical' ? 0 : i)
        ] = c.toUpperCase();
      });
    });
    return grid;
  },
  addWord(newWord: string, rng = Math.random): boolean {
    const dir: direction = getRandomInt(0, 2, rng) ? 'horizontal' : 'vertical';
    const [horzLimit, vertLimit] = [
      this.size[0] - (dir === 'vertical' ? newWord.length : 0),
      this.size[1] - (dir === 'horizontal' ? newWord.length : 0),
    ];
    console.log(dir, [horzLimit, vertLimit]);
    return true;
  },
};
