'use strict';

const Promise = require('bluebird');
const path = require('path');
const appPath = require('../app-path');
const glob = Promise.promisify(require('glob'));

const dictionariesPath = appPath('dictionaries');

let activeDictionaryName;

const getDictionaries = glob(path.join(dictionariesPath, '*.dic'))
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
  const basePath = dictionaryPath.slice(0, -4);
  const dicPath = dictionaryPath;
  const affPath = dictionaryPath.replace(/\.dic$/, '.aff');

  return {
    language,
    normalisedLanguage,
    basePath,
    dicPath,
    affPath
  };
}

function extractLanguage(dictionaryPath) {
  return /.*([a-z]{2}_[A-Z]{2}.*?)\.dic/.exec(dictionaryPath)[1];
}

function getActiveDictionary() {
  return Promise.all([
    getActiveDictionaryName(),
    getDictionaries
  ]).then(results => {
      const [dictionaryName, dictionaries] = results;

      return dictionaries[dictionaryName];
    })
  ;
}

function getActiveDictionaryName() {
  return getDictionaries
    .then(dictionaries => {
      if (!activeDictionaryName) {
        activeDictionaryName = localStorage.getItem('dictionary');
      }

      if (!activeDictionaryName) {
        if (navigator && navigator.language) {
          const environmentLanguage = navigator.language.replace('-', '_');

          if (dictionaries[environmentLanguage]) {
            activeDictionaryName = environmentLanguage;
          } else if (dictionaries[environmentLanguage.subst(0, 2)]) {
            activeDictionaryName = environmentLanguage;
          }
        } else {
          activeDictionaryName = Object.keys(dictionaries)[0];
        }
      }

      return activeDictionaryName;
    })
  ;
}

function setActiveDictionaryName(newActiveDictionaryName) {
  activeDictionaryName = newActiveDictionaryName;
  localStorage.setItem('dictionary', activeDictionaryName);
}

exports.getDictionaries = () => getDictionaries;
exports.getActiveDictionary = getActiveDictionary;
exports.getActiveDictionaryName = getActiveDictionaryName;
exports.setActiveDictionaryName = setActiveDictionaryName;
