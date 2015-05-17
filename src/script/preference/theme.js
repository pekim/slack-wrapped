'use strict';

const app = require('remote').require('app');
const async = require('async');
const cssParse = require('css').parse;
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const path = require('path');
const Immutable = require('immutable');
const data = appRequire('data/data');
const appPath = appRequire('app-path');

const eventEmitter = new EventEmitter();
const defaultThemeId = 'builtin-Default';
const localStorageKey = 'theme';

const builtinThemePath = appPath('style/theme');
const userThemePath = path.join(app.getPath('userData'), 'theme');

function get() {
  return localStorage.getItem(localStorageKey);
}

function getPath(theme, cb) {
  const themeFilename = theme + '.css';
  let themePath = path.join(builtinThemePath, themeFilename);

  fs.exists(themePath, exists => {
    if (exists) {
      cb(null, themePath);
    } else {
      themePath = path.join(userThemePath, themeFilename);

      fs.exists(themePath, exists => {
        if (exists) {
          cb(null, themePath);
        } else {
          cb(`no such theme, ${theme}`);
        }
      });
    }
  });
}

function set(themeId) {
  localStorage.setItem(localStorageKey, themeId);
  data.getIn([]).setIn(['theme', 'active'], themeId);
  eventEmitter.emit('change-active');
}

function setAvailableThemes() {
  async.parallel([
    (callback) => {
      setAvailableThemesForType('builtin', builtinThemePath, callback);
    },
    (callback) => {
      setAvailableThemesForType('user', userThemePath, callback);
    }
  ], () => {
    data.getIn([]).setIn(['theme', 'active'], get() || defaultThemeId);
    eventEmitter.emit('change-active');
  });

}

function setAvailableThemesForType(themeType, directory, callback1) {
  fs.readdir(directory, (err, filenames) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.info(`No theme directory ${directory}`);
      } else {
        console.error(`Failed to find available themes`, err);
      }

      callback1();
      return;
    }

    const availableThemes = filenames
      .filter(filename => filename.endsWith('.css'));

    async.map(availableThemes, processTheme, (err, themes) => {
      if (err) {
        console.error(`Failed to process themes`, err);
        return;
      }

      data.getIn([]).setIn(['theme', themeType], Immutable.fromJS(themes));
      callback1();
    });
  });

  function processTheme(filename, callback) {
    fs.readFile(path.join(directory, filename), (err, cssBuffer) => {
      if (err) {
        callback(err);
        return;
      }

      const cssString = cssBuffer.toString();
      const cssParsed = cssParse(cssString);
      const metaDataRule = cssParsed.stylesheet.rules.find((rule) => {
        return rule.type === 'rule' &&
          rule.selectors.find((selector) => {
            return selector === '.slack-wrapped-theme-meta';
          });
      }) || {
        declarations: []
      };
      const name = getRuleDeclarationValue(metaDataRule, 'name');
      const description = getRuleDeclarationValue(metaDataRule, 'description');

      callback(null, {
        id         : `${themeType}-${name}`,
        name       : trimQuotes(name),
        filename   : filename,
        description: trimQuotes(description),
        css        : cssString
      });
    });

    function getRuleDeclarationValue(rule, name) {
      const declaration = rule.declarations.find((declaration) => {
        return declaration.property === name;
      });

      return (declaration || {}).value;
    }

    function trimQuotes(string) {
      if (string.startsWith('\'')) {
        string = string.slice(1);
      }

      if (string.endsWith('\'')) {
        string = string.slice(0, -1);
      }

      return string;
    }
  }
}

function watchUserThemes() {
  fs.watch(userThemePath, setAvailableThemes);
}

function initialise() {
  // set(get());

  // watchUserThemes();

  setAvailableThemes();
}

exports.initialise = initialise;
exports.set = set;
exports.ee = eventEmitter;
