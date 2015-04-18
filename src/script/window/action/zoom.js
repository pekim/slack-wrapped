'use strict';

const webFrame = require('web-frame');
const webview = appRequire('webview/slack-webview');

const delta = 0.05;

function zoomIn() {
  setZoomFactor(webFrame.getZoomFactor() + delta);
}

function zoomOut() {
  setZoomFactor(webFrame.getZoomFactor() - delta);
}

function zoomDefault() {
  setZoomFactor(1);
}

function setZoomFactor(zoomFactor) {
  webFrame.setZoomFactor(zoomFactor);
  webview.setZoomFactor(zoomFactor);
}

exports.in = zoomIn;
exports.out = zoomOut;
exports.default = zoomDefault;
