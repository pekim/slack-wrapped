'use strict';

const data = appRequire('data/data');

function close() {
  data.getIn(['popup']).set('showAbout', false);
}

function toggleAbout() {
  data.getIn(['popup']).update('showAbout', showAbout => !showAbout);
}

exports.close = close;
exports.toggleAbout = toggleAbout;
