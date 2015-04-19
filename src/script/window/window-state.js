'use strict';

const BrowserWindow = require('remote').require('browser-window');

const KEY = 'windowState';

function restore() {
  const browserWindow = BrowserWindow.getAllWindows()[0];
  const windowSize = JSON.parse(localStorage.getItem(KEY));

  browserWindow.show();

  if (windowSize) {
    browserWindow.setPosition(...windowSize.position);
    browserWindow.setSize(...windowSize.size);

    if (windowSize.isMaximized) {
      browserWindow.maximize();
    }
  } else {
    browserWindow.setSize(800, 600);
    browserWindow.center();
  }
}

function saveRegularly() {
  setInterval(save, 10 * 1000);
}

function save() {
  const browserWindow = BrowserWindow.getAllWindows()[0];

  localStorage.setItem(KEY, JSON.stringify({
    position   : browserWindow.getPosition(),
    size       : browserWindow.getSize(),
    isMaximized: browserWindow.isMaximized()
  }));
}

exports.restore = restore;
exports.saveRegularly = saveRegularly;
