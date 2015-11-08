const slackBrand = appRequire('slack-brand');

module.exports = function(webview) {
  webview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'notify') {
      const title = event.args[0];
      const options = event.args[1] || {};

      options.icon = slackBrand.getStickerImagePath(64);

      /* eslint-disable no-new */
      new Notification(title, options);
    }
  });
};
