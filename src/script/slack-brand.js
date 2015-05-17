'use strict';

const path = require('path');

exports.notAffiliatedText = 'not created by, affiliated with, or supported by Slack Technologies, Inc.';

exports.getStickerImagePath = size => {
  return path.join(__dirname, `/../image/slack-sticker-${size}.png`);
};
