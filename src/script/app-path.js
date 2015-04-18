'use strict';

const path = require('path');

module.exports = function(filepath) {
  const rootDir = path.dirname(require.main.filename);

  return path.join(rootDir, filepath);
};
