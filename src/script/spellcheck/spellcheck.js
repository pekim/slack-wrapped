'use strict';

const async = require('async');
const fs = require('fs');
const webframe = require('web-frame');
const Spellchecker = require('hunspell-spellchecker');

const languageAlternatives = {
  'en_GB': 'en_GB-ise'
};

function initialise() {
  const language = navigator.language.replace('-', '_');
  const dictionaryLanguage = languageAlternatives[language] || language;

  async.map(
    ['aff', 'dic'],
    (suffix, cb) => {
      fs.readFile(appPath(`dictionaries/${dictionaryLanguage}.${suffix}`), cb);
    },
    (err, filesContent) => {
      if (err) {
        console.error(`failed to load dictionary for ${navigator.language}`, err);
      } else {
        createAndRegisterSpellchecker(...filesContent);
      }
    }
  );
}

function createAndRegisterSpellchecker(aff, dic) {
  const spellchecker = new Spellchecker();

  const DICT = spellchecker.parse({
    aff: aff,
    dic: dic
  });

  spellchecker.use(DICT);

  webframe.setSpellCheckProvider(navigator.language, true, {
    spellCheck: function(text) {
      return spellchecker.check(text);
    }
  });
}

exports.initialise = initialise;
