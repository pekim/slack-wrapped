'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const Spellchecker = require('hunspell-spellchecker');

module.exports = function(dictionary) {
  return Promise.all([
    fs.readFileSync(dictionary.aff),
    fs.readFileSync(dictionary.dic)
  ])
  .then(files => {
    const [aff, dic] = files;
    const spellchecker = new Spellchecker();
    const DICT = spellchecker.parse({aff, dic});

    spellchecker.use(DICT);

    return spellchecker;
  });
};
