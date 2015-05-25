'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const childProcess = Promise.promisifyAll(require('child_process'));
const fs = Promise.promisifyAll(require('fs'));

module.exports = childProcess.execAsync('echo "" | hunspell -D')
  .then(splitStderrIntoLines)
  .then(convertToRealPaths)
  .filter(isDictionary)
  .then(_.uniq)
  .then(asDictionaryObject)
;

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
