'use strict';

const Promise = require('bluebird');
const childProcess = require('child_process');

module.exports = class SpellSuggester {
  constructor(dictionary) {
    this.responseText = '';

    this.process = childProcess.spawn('hunspell', [
      '-a',
      '-d', dictionary.basePath
    ]);

    this.process.on('error', err => console.log(err));
    this.process.on('exit', (code, signal) => {
      console.log(`hunspell exited : ${code}, ${signal}`);
    });

    this.process.stderr.on('data', data => {
      console.error(`hunspell : ${data.toString()}`);
    });
  }

  suggest(word) {
    this.process.stdin.write(`^${word}\n`);

    return new Promise((resolve, reject) => {
      this.process.stdout.on('data', data => {
        this.responseText += data.toString();
        const lines = this.responseText
          .split('\n')
          .filter(line => line.charAt(0) !== '@')
        ;

        if (lines.length >= 2 ) {
          this.responseText = '';
          this.process.stdout.removeAllListeners('data');
          this.processResultLine(word, lines[0], resolve, reject);
        }
      });
    });
  }

  processResultLine(word, resultLine, resolve, reject) {
    if (resultLine.charAt(0) === '*') {
      // spelled correctly
      resolve();
    } else if (resultLine.charAt(0) === '&') {
      resolve(this.processSuggestions(resultLine));
    } else if (resultLine.charAt(0) === '#') {
      // no suggestions
      resolve();
    } else {
      reject(`unexpected response for '${word}' : ${resultLine}`);
    }
  }

  processSuggestions(resultLine) {
    // Example:
    //   & color 5 0: colour, colon, col or, col-or, Colo

    const [, suggestions] = resultLine.split(':');

    return suggestions
      .split(',')
      .map(suggestion => suggestion.trim())
    ;
  }
};
