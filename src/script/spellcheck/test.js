'use strict';

const getDictionaries = require('./hunspell-dictionaries');
const getSpellChecker = require('./hunspell-checker');
const SpellSuggester = require('./hunspell-suggester');

getDictionaries
  .then(dictionaries => {
    return dictionaries.en_GB;
  })
  .then(dictionary => {
    const suggester = new SpellSuggester(dictionary);

    // suggester.initialise()
    //   .then(() => {
        suggester
          .suggest('color')
          .then(response => {
            console.log(response);
          });
    //   })
    // ;

    return dictionary;
  })
  .then(getSpellChecker)
  .then(checker => {
    console.log(checker.check('the'));
    console.log(checker.check('colour'));
    console.log(checker.check('colourr'));
    console.log(checker.check('color'));
  })
  .catch(exception => {
    console.log(exception);
  })
;
