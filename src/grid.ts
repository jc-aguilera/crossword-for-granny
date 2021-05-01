import {
  isSameWordList,
  generatePairs,
  getRandomInt,
  gridWords,
  scramble,
  keepTilde,
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
  addWordAtRandomPosition: (newWord: string, rng?: () => number) => boolean;
  addWord: (word: Word) => boolean;
}

export const puzzle: CrosswordPuzzle = {
  size: [13, 13],
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
  addWordAtRandomPosition(
    potentialNewWord: string,
    rng = Math.random,
  ): boolean {
    const newWord = keepTilde(potentialNewWord).toLocaleUpperCase();
    const dir: direction = getRandomInt(0, 2, rng) ? 'horizontal' : 'vertical';
    const [horzLimit, vertLimit] = [
      this.size[0] - (dir === 'vertical' ? newWord.length : 0),
      this.size[1] - (dir === 'horizontal' ? newWord.length : 0),
    ];
    const possiblePairs = scramble(generatePairs(horzLimit, vertLimit), rng);
    return possiblePairs.some(([xStart, yStart]) =>
      this.addWord({
        word: newWord,
        direction: dir,
        xStart,
        yStart,
      }),
    );
  },

  addWord(wordToCheck: Word) {
    const { word, xStart, yStart, direction } = wordToCheck;
    const grid = this.filledGrid();
    if (
      word.split('').every((letter, position) => {
        const gridLetter = grid[
          xStart + (direction === 'vertical' ? position : 0)
        ][
          yStart + (direction === 'horizontal' ? position : 0)
        ].toLocaleUpperCase();
        return !gridLetter || gridLetter === letter.toLocaleUpperCase();
      })
    ) {
      const newGrid: CrosswordPuzzle = { ...this, words: [...this.words] };
      newGrid.words.push({
        word,
        direction,
        xStart,
        yStart,
      });
      if (
        isSameWordList(
          gridWords({ grid: newGrid.filledGrid() }),
          [
            ...this.words.map(({ word }) => word.toLocaleUpperCase()),
            word.toLocaleUpperCase(),
          ].sort(),
        )
      ) {
        this.words.push({
          word: word,
          direction: direction,
          xStart: xStart,
          yStart: yStart,
        });
        return true;
      }
    }
    return false;
  },
};
