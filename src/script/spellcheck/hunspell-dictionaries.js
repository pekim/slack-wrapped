'use strict';

const Promise = require('bluebird');
const path = require('path');
const appPath = require('../app-path');
const glob = Promise.promisify(require('glob'));

const dictionariesPath = appPath('dictionaries');

module.exports = glob(path.join(dictionariesPath, '*.dic'))
  .then(toMap);

function toMap(dictionaryPaths) {
  const dictionaries = dictionaryPaths.map(toDictionary);
  const dictionariesMap = {};

  dictionaries.forEach(dictionary => {
    dictionariesMap[dictionary.normalisedLanguage] = dictionary;
  });

  return dictionariesMap;
}

function toDictionary(dictionaryPath) {
  const language = extractLanguage(dictionaryPath);
  const normalisedLanguage = language.slice(0, 5);
  const dicPath = dictionaryPath;
  const affPath = dictionaryPath.replace(/\.dic$/, '.aff');

  return {language, normalisedLanguage, dicPath, affPath};
}

function extractLanguage(dictionaryPath) {
  return /.*([a-z]{2}_[A-Z]{2}.*?)\.dic/.exec(dictionaryPath)[1];
}

// module.exports = childProcess.execAsync('echo "" | hunspell -D')
//   .then(splitStderrIntoLines)
//   .then(convertToRealPaths)
//   .filter(isDictionary)
//   .then(asDictionaryObject)
// ;

function splitStderrIntoLines(results) {
  const [, stderr] = results;

  return stderr.split('\n');
}

// some paths are sym links
function convertToRealPaths(dictionaryPaths) {
  const suffix = '.aff';

  return Promise.all(dictionaryPaths.map(dictionaryPath => {
    return fs.realpathAsync(`${dictionaryPath}${suffix}`)
      .then(path => path.slice(0, -suffix.length))
      .catch(exception => {
        if (exception.cause.code !== 'ENOENT') {
          return Promise.reject(exception);
        }
      })
    ;
  }));
}

function isDictionary(value) {
  return !!value;
}

function asDictionaryObject(dictionaryPaths) {
  const object = {};

  dictionaryPaths.forEach(dictionaryPath => {
    const indexOfLastSlash = dictionaryPath.lastIndexOf('/');
    const language = dictionaryPath.slice(indexOfLastSlash + 1);
    const aff = `${dictionaryPath}.aff`;
    const dic = `${dictionaryPath}.dic`;

    object[language] = {language, aff, dic};
  });

  return object;
}
