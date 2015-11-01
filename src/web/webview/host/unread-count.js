'use strict';

const fs = require('fs');
const path = require('path');
const ipc = require('ipc');

const TrayImage = appRequire('tray/tray-image');

const scriptPath = path.join(__dirname, 'slack-unread-count-monitor.js');

function listen(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'unreadCount') {
      const unreadCount = event.args[0];
      const trayImage = new TrayImage(64, unreadCount);

      trayImage.getData((imageData) => {
        ipc.send('trayImage', imageData);
      });
    }
  });
}

function inject(webview) {
  fs.readFile(scriptPath, (err, script) => {
    if (err) {
      console.error(`failed to load theme '${scriptPath}'`, err);
      return;
    }

    webview.executeJavaScript(script.toString());
  });
}

exports.listen = listen;
exports.inject = inject;
