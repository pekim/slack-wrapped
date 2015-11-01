'use strict';

const path = require('path');

module.exports = function(filepath) {
  const rootDir = path.dirname(path.join(__filename, '../..'));

  return path.join(rootDir, filepath);
};
