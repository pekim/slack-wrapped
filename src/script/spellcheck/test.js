'use strict';

const getDictionaries = require('./hunspell-dictionaries');
const getSpellChecker = require('./hunspell-checker');

// getDictionaries
//   .then(dictionaries => {
//     return dictionaries.en_GB;
//   })
//   .then(getSpellChecker)
//   .then(checker => {
//     console.log(checker.check('the'));
//     console.log(checker.check('colour'));
//     console.log(checker.check('colourr'));
//     console.log(checker.check('color'));
//   })
//   .catch(exception => {
//     console.log(exception);
//   })
// ;
//

getDictionaries
  .then(dictionaries => {
    return dictionaries.en_GB;
  })
  .then(getSpellChecker)
  .then(checker => {
    console.log(checker.check('the'));
    console.log(checker.check('colour'));
    console.log(checker.check('colourr'));
    console.log(checker.check('color'));
    console.log(checker.suggest('color'));
    console.log(checker.suggest('seperated'));
  })
  .catch(exception => {
    console.log(exception);
  })
;
