import {
  isSameWordList,
  generatePairs,
  getRandomInt,
  gridWords,
  scramble,
} from './utils';

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
  filledGrid(): string[][];
  addWord: (newWord: string) => boolean;
}

export const puzzle: CrosswordPuzzle = {
  size: [10, 10],
  words: [],
  filledGrid() {
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
    const possiblePairs = scramble(generatePairs(horzLimit, vertLimit), rng);
    return possiblePairs.some((pair, index) => {
      const grid = this.filledGrid();
      const [currentDown, currentRight] = pair;
      if (
        newWord.split('').every((letter, position) => {
          const gridLetter = grid[
            currentDown + (dir === 'vertical' ? position : 0)
          ][
            currentRight + (dir === 'horizontal' ? position : 0)
          ].toLocaleUpperCase();
          return !gridLetter || gridLetter === letter.toLocaleUpperCase();
        })
      ) {
        const newGrid: CrosswordPuzzle = { ...this, words: [...this.words] };
        newGrid.words.push({
          word: newWord,
          direction: dir,
          xStart: currentDown,
          yStart: currentRight,
        });
        if (
          isSameWordList(
            gridWords({ grid: newGrid.filledGrid() }),
            [
              ...this.words.map(({ word }) => word.toLocaleUpperCase()),
              newWord.toLocaleUpperCase(),
            ].sort(),
          )
        ) {
          this.words.push({
            word: newWord,
            direction: dir,
            xStart: currentDown,
            yStart: currentRight,
          });
          return true;
        }
      }
      return false;
    });
  },
};
