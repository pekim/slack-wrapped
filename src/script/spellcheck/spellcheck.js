'use strict';

const getDictionaries = require('./hunspell-dictionaries');
const getSpellChecker = require('./hunspell-checker');
const webframe = require('web-frame');

function createAndRegisterSpellchecker(language) {
  getDictionaries
    .then(dictionaries => {
      return dictionaries[language];
    })
    .then(getSpellChecker)
    .then(checker => {
      registerSpellChecker(language, checker);
    })
    .catch(exception => {
      console.log(exception);
    })
  ;
}

function registerSpellChecker(language, checker) {
  webframe.setSpellCheckProvider(language, true, {
    spellCheck: word => {
      console.log(word, checker.check(word))
      return checker.check(word);
    }
  });
}

exports.initialise = createAndRegisterSpellchecker;
