import { puzzle } from './grid';
import { horizontalWords, verticalWords } from './utils';

const separator = Array(puzzle.size[0] * 2 + 1)
  .fill('-')
  .join('');
console.log(separator);
puzzle.filledGrid.forEach((row) => {
  console.log('|' + row.map((c) => c || ' ').join('|') + '|');
  console.log(separator);
});

console.log(horizontalWords(puzzle));
console.log(verticalWords(puzzle));
puzzle.addWord('chancho');
