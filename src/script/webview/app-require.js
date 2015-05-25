'use strict';

const appPath = require('./app-path');

exports.init = function() {
  const appDir = appPath('/');

  global.appRootRequire = function(moduleId) {
    return require(appDir + moduleId);
  };

  global.appRequire = function(moduleId) {
    return require(appDir + 'script/' + moduleId);
  };
};
