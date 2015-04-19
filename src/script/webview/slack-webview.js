'use strict';

const remote = require('remote');
const BrowserWindow = remote.require('browser-window');

const notifications = require('./notifications');
const unreadCount = require('./unread-count');
const theme = require('./theme');

const browserWindow = BrowserWindow.getAllWindows()[0];
const slackWebview = document.querySelector('#slack');

function initialise() {
  browserWindow.on('focus', () => {
    slackWebview.focus();
  });

  notifications(slackWebview);
  unreadCount.listen(slackWebview);

  slackWebview.addEventListener('did-start-loading', () => {
    slackWebview.setUserAgent(navigator.userAgent);
  });

  slackWebview.addEventListener('did-finish-load', () => {
    slackWebview.focus();
    theme.inject(slackWebview);
    unreadCount.inject(slackWebview);
  });

  slackWebview.addEventListener('new-window', (event) => {
    event.preventDefault();
    require('shell').openExternal(event.url);
  });

  setInterval(() => {
    browserWindow.setTitle(slackWebview.getTitle());
  }, 500);
}

function setZoomFactor(zoomFactor) {
  slackWebview.executeJavaScript(`document.body.style.zoom = ${zoomFactor};`);
}

function openDevTools() {
  slackWebview.openDevTools();
}

exports.initialise = initialise;
exports.openDevTools = openDevTools;
exports.setZoomFactor = setZoomFactor;
