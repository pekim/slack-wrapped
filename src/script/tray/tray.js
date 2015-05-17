'use strict';

const Tray = require('tray');
const nativeImage = require('native-image');

const slackBrand = require('../slack-brand');

function initialise() {
  const appIcon = new Tray(slackBrand.getStickerImagePath(64));

  appIcon.setToolTip('Slack Wrapped');

  const ipc = require('ipc');
  ipc.on('trayImage', (event, arg) => {
    const imageData = arg;
    const image = nativeImage.createFromDataUrl(imageData);

    appIcon.setImage(image);
  });
}

exports.initialise = initialise;
