'use strict';

const data = appRequire('data/data');
const slackWebview = appRequire('webview/slack-webview');

function close() {
  data.getIn(['popup']).set('showAbout', false);
  slackWebview.focus();
}

function toggleAbout() {
  data.getIn(['popup']).update('showAbout', showAbout => {
    const newShowAbout = !showAbout;

    if (!newShowAbout) {
      slackWebview.focus();
    }

    return newShowAbout;
  });
}

exports.close = close;
exports.toggleAbout = toggleAbout;
