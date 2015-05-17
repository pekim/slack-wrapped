'use strict';

const path = require('path');
const app = require('app');
const BrowserWindow = require('browser-window');

const slackBrand = require('./slack-brand');
const tray = require('./tray/tray');

// Keep a global reference of the window object, otherwise will be GCed.
let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    icon: slackBrand.getStickerImagePath(128)
  });

  mainWindow.hide();
  mainWindow.loadUrl('file://' + path.join(__dirname, '/../index.html'));

  mainWindow.on('closed', function() {
    // Dereference the window object.
    mainWindow = null;
  });

  tray.initialise();
});
