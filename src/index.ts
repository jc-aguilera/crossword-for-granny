import { puzzle } from './grid';

let separator = Array(puzzle.size[0] * 2 + 1).fill('-').join('');
console.log(separator)
puzzle.filledGrid.forEach(row => {
   console.log('|' + row.map(c => c || ' ').join('|') + '|');
   console.log(separator)
});