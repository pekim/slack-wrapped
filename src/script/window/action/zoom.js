'use strict';

const webFrame = require('web-frame');

const delta = 0.05;

function zoomIn() {
  webFrame.setZoomFactor(webFrame.getZoomFactor() + delta);
}

function zoomOut() {
  webFrame.setZoomFactor(webFrame.getZoomFactor() - delta);
}

function zoomDefault() {
  webFrame.setZoomFactor(1);
}

exports.in = zoomIn;
exports.out = zoomOut;
exports.default = zoomDefault;
