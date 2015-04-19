'use strict';

// const webFrame = require('web-frame');
const webview = appRequire('webview/slack-webview');

let zoomFactor = 1;
const delta = 0.05;

function zoomIn() {
  zoomFactor += delta;
  setZoomFactor();
}

function zoomOut() {
  zoomFactor -= delta;
  setZoomFactor();
}

function zoomDefault() {
  zoomFactor = 1;
  setZoomFactor();
}

function setZoomFactor() {
  // webFrame.setZoomFactor(zoomFactor);
  webview.setZoomFactor(zoomFactor);
}

exports.in = zoomIn;
exports.out = zoomOut;
exports.default = zoomDefault;
