'use strict';

require('babel/polyfill');
require('../app-require').init();

const remote = require('remote');
const BrowserWindow = remote.require('browser-window');
const notifier = require('node-notifier');
const slackBrand = appRequire('slack-brand');
// const globalKeyListeners = appRequire('window/global-key-listeners');
const contextMenu = appRequire('window/action/context-menu');
const windowState = appRequire('window/window-state');

const browserWindow = BrowserWindow.getAllWindows()[0];
const slackWebview = document.querySelector('#slack');

windowState.restore();
windowState.saveRegularly();

// globalKeyListeners.register();
contextMenu.initialise();

browserWindow.on('focus', () => {
  slackWebview.focus();
});

slackWebview.addEventListener('ipc-message', function(event) {
  if (event.channel === 'notify') {
    const options = event.args[0];

    options.icon = slackBrand.stickerImagePath;
    notifier.notify(options);
  }
});

slackWebview.addEventListener('did-start-loading', () => {
  slackWebview.setUserAgent(navigator.userAgent);
  slackWebview.openDevTools();
});

slackWebview.addEventListener('did-finish-load', () => {
  slackWebview.focus();

  slackWebview.insertCSS(`
    #messages_container {
      background-color: #202020 !important;
    }

    .day_divider {
      background-color: #202020 !important;
      color: hsl(0, 0%, 95%) !important;
    }

    .day_divider_label {
      color: #202020 !important;
    }

    .message {
      color: hsl(0, 0%, 95%) !important;
    }

    .message.divider {
      border-top: none !important;
    }

    .message.first,
    .message.first.divider {
      margin-top: none !important;
    }

    .message .timestamp {
      display: block !important;
      color: hsl(0, 0%, 45%) !important;
    }

    #footer {
      background-color: #202020 !important;
    }
  `);
});

slackWebview.addEventListener('new-window', (event) => {
  event.preventDefault();
  require('shell').openExternal(event.url);
});

setInterval(() => {
  browserWindow.setTitle(slackWebview.getTitle());
}, 500);
