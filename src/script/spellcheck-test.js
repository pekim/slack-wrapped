'use strict';

// this example uses the en_US hunspell files from SCOWL:
//   http://wordlist.sourceforge.net/
const SpellCheck = require('spellcheck');
const spell = new SpellCheck('/home/mike/hunspell-dictionaries/en_GB-ise.aff', '/home/mike/hunspell-dictionaries/en_GB-ise.dic');

spell.check('sain', function(err, correct, suggestions) {
   if (err) {
     throw err;
   }

   if (correct) {
     console.log('Word is spelled correctly!');
   } else {
     console.log('Word not recognized. Suggestions: ' + suggestions);
   }
});
