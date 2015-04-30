'use strict';

const async = require('async');
const npm = require('npm');
const request = require('request');

const electronConfig = require('../../package.json').electron;

const newVersion = process.argv[2];

// console.log(newVersion);
// console.log(electronConfig);

function bumpNpmVersion(done) {
  async.series([
    callback => npm.load({}, callback),
    // callback => npm.commands.version([newVersion], callback)
  ], done);
}

function makeReleases(releaseTags, callback) {
  const assets = releaseTags.assets
    .filter(asset => asset.name.includes('linux-x64.zip'));
  console.log(assets.length);

  callback();
}

function fetchReleaseTags(_, done) {
  request({
    url    : 'https://api.github.com/repos/atom/electron/releases/tags/v0.25.1',
    headers: {
      'User-Agent': 'pekim'
    }
  }, (err, response, body) => {
    if (err) {
      done(err);
    } else if (response.statusCode < 300) {
      done(null, JSON.parse(body));
    } else {
      done(body);
    }
  });
}

async.waterfall([
  bumpNpmVersion,
  fetchReleaseTags,
  makeReleases
], err => {
  console.error(err);
});

// https://api.github.com/repos/atom/electron/releases/tags/v0.25.1
