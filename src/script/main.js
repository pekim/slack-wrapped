'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');

const slackBrand = require('./slack-brand');

// Keep a global reference of the window object, otherwise will be GCed.
let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    icon: slackBrand.stickerImagePath
  });
  mainWindow.hide();

  mainWindow.loadUrl('file://' + __dirname + '/../index.html');

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
