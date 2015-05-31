'use strict';

const getActiveDictionary = require('./hunspell-dictionaries').getActiveDictionary;
const SpellSuggester = require('./hunspell-suggester');

let suggester;

getActiveDictionary()
  .then(dictionary => {
    suggester = new SpellSuggester(dictionary);
  })
;

module.exports = function(textarea, cb) {
  const word = getWordAt(textarea.value || '', textarea.selectionStart);

  if (suggester) {
    suggester
      .suggest(word)
      .then(response => cb(response))
      .catch(error => console.error(error))
    ;
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
