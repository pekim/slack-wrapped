'use strict';

const getDictionaries = require('./hunspell-dictionaries');
const SpellSuggester = require('./hunspell-suggester');

let suggester;

getDictionaries
  .then(dictionaries => {
    return dictionaries.en_GB;
  })
  .then(dictionary => {
    suggester = new SpellSuggester(dictionary);
  })
;


module.exports = function(textarea) {
  const word = getWordAt(textarea.value || '', textarea.selectionStart);

  if (suggester) {
    suggester
      .suggest(word)
      .then(response => {
        console.log(response);
      });
  }
};

function getWordAt(text, position) {
  // Search for the word's beginning and end.
  const left = text.slice(0, position + 1).search(/\S+$/);
  const right = text.slice(position).search(/\s/);

  // The last word in the string is a special case.
  if (right < 0) {
    return text.slice(left);
  }

  // Return the word, using the located bounds to extract it from the string.
  return text.slice(left, right + position);
}
