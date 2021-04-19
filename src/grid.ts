type direction = 'horizontal' | 'vertical';
interface Word {
   word: string;
   direction: direction,
   xStart: number;
   yStart: number;
}

interface CrosswordPuzzle {
   size: [number, number],
   words: Word[];
   readonly filledGrid: string[][],
   addWord: (newWord: Word) => boolean;
}

export const puzzle: CrosswordPuzzle = {
   size: [20, 20],
   words: [{
      word: 'perro',
      direction: 'horizontal',
      xStart: 2,
      yStart: 3,
   }],
   get filledGrid() {
      const grid: string[][] = [...new Array(this.size[0])]
         .map(() => new Array(this.size[1]).fill(''));
      this.words.forEach(({ word, direction, xStart, yStart }) => {
         word.split('').forEach((c, i) => {
            grid
               [xStart + (direction === 'horizontal' ? 0 : i)]
               [yStart + (direction === 'vertical' ? 0 : i)]
               = c.toUpperCase();
         })
      });
      return grid;
   },
   addWord(newWord): boolean {
      this.words.push(newWord);
      return true;
   }
}
