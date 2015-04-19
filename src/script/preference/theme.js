'use strict';

const app = require('remote').require('app');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Immutable = require('immutable');
const data = appRequire('data/data');
const appPath = appRequire('app-path');
const availableCommands = appRequire('command/available-commands');

const localStorageKey = 'theme';
const preferenceKey = 'theme';

const builtinThemePath = appPath('style/theme');
const userThemePath = path.join(app.getPath('userData'), 'theme');

function get() {
  return localStorage.getItem(localStorageKey) || 'light';
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

function set(themeName) {
  getPath(themeName, (err, themePath) => {
    if (themePath) {
      data.getIn(['preferences']).set(preferenceKey, themePath);
      localStorage.setItem(localStorageKey, themeName);
    } else {
      console.warn(err);
    }
  });
}

function setAvailableThemes() {
  async.parallel([
    readdir(builtinThemePath),
    readdir(userThemePath)
  ], (err, results) => {
    if (err) {
      console.error(`Failed to find available themes`, err);
      return;
    }

    const filenames = results[0].concat.apply(results[0], results[1]);
    const availableThemes = filenames
      .filter(filename => filename.endsWith('.css'))
      .map(filename => filename.slice(0, -'.css'.length));

    data.getIn([]).set('themes', Immutable.fromJS(availableThemes));
    availableCommands.update();
  });

  function readdir(dirpath) {
    return function(callback) {
      fs.readdir(dirpath, callback);
    };
  }
}

function watchUserThemes() {
  fs.watch(userThemePath, setAvailableThemes);
}

function initialiase() {
  set(get());

  setAvailableThemes();
  watchUserThemes();
}

initialiase();

exports.set = set;
