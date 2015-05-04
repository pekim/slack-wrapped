'use strict';

const remote = require('remote');
const BrowserWindow = remote.require('browser-window');
const shell = require('shell');

const notifications = require('./notifications');
const unreadCount = require('./unread-count');
const teamUrl = require('./team-url');
const theme = require('./theme');
const ContextMenu = appRequire('window/action/context-menu');
const preferenceTheme = appRequire('preference/theme');

const browserWindow = BrowserWindow.getAllWindows()[0];

const contextMenu = new ContextMenu();
let slackWebview;

function initialise(webview) {
  slackWebview = webview;

  slackWebview.addEventListener('ipc-message', function(event) {
    if (event.channel === 'contextmenu') {
      const {targetUrl, x, y} = event.args[0];

      contextMenu.open({
        url                  : targetUrl,
        webviewInspectElement: () => slackWebview.inspectElement(x, y),
        webviewOpenDevTools  : () => slackWebview.openDevTools()
      });
    }
  });

  browserWindow.on('focus', () => {
    focus();
  });

  notifications(slackWebview);
  unreadCount.listen(slackWebview);
  teamUrl.listen(slackWebview);

  slackWebview.addEventListener('did-start-loading', () => {
    slackWebview.setUserAgent(navigator.userAgent);
  });

  slackWebview.addEventListener('did-finish-load', () => {
    focus();
    theme.inject(slackWebview);
    unreadCount.inject(slackWebview);

    preferenceTheme.ee.on('change-active', () => {
      theme.inject(slackWebview);
    });
  });

  slackWebview.addEventListener('new-window', (event) => {
    event.preventDefault();
    shell.openExternal(event.url);
  });

  setInterval(() => {
    browserWindow.setTitle(slackWebview.getTitle());
  }, 500);
}

function setZoomFactor(zoomFactor) {
  slackWebview.executeJavaScript(`document.body.style.zoom = ${zoomFactor};`);
}

function focus() {
  slackWebview.focus();
}

exports.initialise = initialise;
exports.setZoomFactor = setZoomFactor;
exports.focus = focus;
