'use strict';

const BrowserWindow = require('remote').require('browser-window');

function toggleFullScreen() {
  const browserWindow = BrowserWindow.getFocusedWindow();

  browserWindow.setFullScreen(!browserWindow.isFullScreen());
}

module.exports = toggleFullScreen;
