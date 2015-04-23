'use strict';

const notifier = require('node-notifier');
const slackBrand = appRequire('slack-brand');

module.exports = function(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'notify') {
      const options = event.args[0];

      options.icon = slackBrand.stickerImagePath;
      options.hint = 'int:transient:1';

      notifier.notify(options);
    }
  });
};
