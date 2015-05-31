'use strict';

const webFrame = require('web-frame');
const webview = appRequire('webview/slack-webview');

const localStorageKey = 'zoomFactor';

let zoomFactor = parseFloat(localStorage.getItem(localStorageKey) || 1);
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
  console.log('szf', zoomFactor)
  localStorage.setItem(localStorageKey, zoomFactor);

  webFrame.setZoomFactor(zoomFactor);
  webview.setZoomFactor(zoomFactor);
}

exports.in = zoomIn;
exports.out = zoomOut;
exports.default = zoomDefault;
exports.initialise = setZoomFactor;
