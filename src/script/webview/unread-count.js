'use strict';

const fs = require('fs');
const path = require('path');
const ipc = require('ipc');

const scriptPath = path.join(__dirname, 'slack-unread-count-monitor.js');

function listen(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'unreadCount') {
      ipc.send('unreadCount', event.args);
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
