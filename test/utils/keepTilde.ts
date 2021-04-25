const assert = require('chai').assert;
const { keepTilde } = require('../../src/utils');

describe('removeTilde', () => {
  it('should remove all accents from words, except tildes', () => {
    const tildeString = 'añsdèÜUÑüñ';
    const noTildeString = 'añsdeUUÑuñ';
    const noTildes = keepTilde(tildeString);

    assert.strictEqual(noTildes, noTildeString);
  });
});
