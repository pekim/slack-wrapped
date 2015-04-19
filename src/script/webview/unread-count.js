'use strict';

const ipc = require('ipc');

module.exports = function(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'unreadCount') {
      ipc.send('unreadCount', event.args);
    }
  });
};
