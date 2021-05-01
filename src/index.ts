import { puzzle } from './grid';
import { prettyGrid, scramble } from './utils';
import animals from './data/animals.json';
import seedrandom from 'seedrandom';

const rng = seedrandom('lorem ipsum');

const wordList = animals;
const wordAdded = scramble(wordList, rng).map((word) =>
  puzzle.addWordAtRandomPosition(word, rng),
);
console.log(prettyGrid(puzzle));
console.log('Words:', wordAdded.filter((w) => !!w).length);
console.log('Last word index:', wordAdded.lastIndexOf(true));
