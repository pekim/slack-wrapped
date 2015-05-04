'use strict';

const data = appRequire('data/data');
const slackWebview = appRequire('webview/slack-webview');

function close() {
  data.getIn(['popup']).withMutations((popups) => {
    dataClose(popups);
  });

  slackWebview.focus();
}

function dataClose(popups) {
  for (let key of popups.keySeq()) {
    popups.set(key, false);
  }
}

function toggle(name) {
  data.getIn(['popup']).withMutations((popups) => {
    const propertyName = `show${name}`;
    const show = !popups.get(propertyName);

    dataClose(popups);

    if (!show) {
      slackWebview.focus();
    }

    popups.set(propertyName, show);
  });
}

function toggleAbout() {
  toggle('About');
}

function toggleTheme() {
  toggle('Theme');
}

exports.close = close;
exports.toggleAbout = toggleAbout;
exports.toggleTheme = toggleTheme;
