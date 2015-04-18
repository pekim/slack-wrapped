'use strict';

const remote = require('remote');
const BrowserWindow = remote.require('browser-window');

const notifications = require('./notifications');
const theme = require('./theme');

const browserWindow = BrowserWindow.getAllWindows()[0];
const slackWebview = document.querySelector('#slack');

function initialise() {
  browserWindow.on('focus', () => {
    slackWebview.focus();
  });

  notifications(slackWebview);

  slackWebview.addEventListener('did-start-loading', () => {
    slackWebview.setUserAgent(navigator.userAgent);
    slackWebview.openDevTools();
  });

  slackWebview.addEventListener('did-finish-load', () => {
    slackWebview.focus();
    theme.inject(slackWebview);
  });

  slackWebview.addEventListener('new-window', (event) => {
    event.preventDefault();
    require('shell').openExternal(event.url);
  });

  setInterval(() => {
    browserWindow.setTitle(slackWebview.getTitle());
  }, 500);
}

exports.initialise = initialise;
