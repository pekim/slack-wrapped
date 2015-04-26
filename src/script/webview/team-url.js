'use strict';

const initialUrl = require('./initial-url');

function listen(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'teamUrl') {
      initialUrl.set(event.args[0]);
    }
  });
}

exports.listen = listen;
