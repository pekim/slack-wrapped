'use strict';

const BrowserWindow = require('browser-window');
const path = require('path');
const Tray = require('tray');

function initialise() {
  const baseIconPath = path.join(__dirname, '/../image/slack-sticker-64.png');
  const appIcon = new Tray(baseIconPath);

  const trayImageWindow = new BrowserWindow({
    x     : 4000,   // Position offscreen; does not seem to be effective.
    y     : 4000,
    width : 32,
    height: 32
  });
  trayImageWindow.hide();

  trayImageWindow.loadUrl('file://' + path.join(__dirname, '/../tray-image.html'));
  // trayImageWindow.openDevTools({detach: true});

  const ipc = require('ipc');
  ipc.on('unreadCount', function(event, arg) {
    const unreadCount = arg[0];
    const display = unreadCount > 0 ? 'block' : 'none';

    trayImageWindow.webContents.executeJavaScript(`
      document.querySelector('.number').style.display = '${display}';
      document.querySelector('.number').textContent = '${unreadCount}';
    `);

    trayImageWindow.show();

    setTimeout(() => {
      trayImageWindow.capturePage((image) => {
        appIcon.setImage(image);
        trayImageWindow.hide();
      });
    }, 100);
  });
}

exports.initialise = initialise;
