import { puzzle } from './grid';
import { prettyGrid } from './utils';

const wordList = ['perro', 'gato', 'chancho', 'loro'];
wordList.forEach((word) => puzzle.addWord(word));
console.log(prettyGrid(puzzle));
