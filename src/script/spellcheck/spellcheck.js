'use strict';

const getDictionaries = require('./hunspell-dictionaries').getDictionaries;
const getSpellChecker = require('./hunspell-checker');
const webframe = require('web-frame');

function createAndRegisterSpellchecker(language) {
  getDictionaries()
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
  webframe.setSpellCheckProvider(language, false, {
    spellCheck: word => {
      return checker.check(word);
    }
  });
}

exports.initialise = createAndRegisterSpellchecker;
