import { puzzle } from './grid';
import { prettyGrid, scramble } from './utils';
import animals from './data/animals.json';

const wordList = animals;
const wordAdded = scramble(wordList).map((word) =>
  puzzle.addWordAtRandomPosition(word),
);
console.log(prettyGrid(puzzle));
console.log('Words:', wordAdded.filter((w) => !!w).length);
console.log('Last word index:', wordAdded.lastIndexOf(true));
