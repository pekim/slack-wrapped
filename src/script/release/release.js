'use strict';

const async = require('async');
const npm = require('npm');
const request = require('request');
const fs = require('fs');
const path = require('path');

const rootDir = '../../';
const packageJsonPath = path.join(rootDir, 'package.json');

const distDir = path.join('./', 'dist');
const cacheDir = path.join(distDir, 'cache');

const electronConfig = require(packageJsonPath).electron;

const newVersion = process.argv[2];

function bumpNpmVersion(done) {
  if (newVersion) {
    async.series([
      callback => npm.load({}, callback),
      callback => npm.commands.version([newVersion], callback)
    ], done);
  } else {
    setImmediate(done);
  }
}

function makeReleases(assets, callback) {
  console.log(assets);

  callback();
}

function filterVariants(releaseTags, callback) {
  const assets = releaseTags.assets
    .filter(asset => {
      return electronConfig.variants.some(variant => {
        return asset.name.includes(variant) &&
          !asset.name.includes('-symbols');
      });
    });

  callback(null, assets);
}

function fetchReleaseTags(done) {
  request({
    url    : `https://api.github.com/repos/atom/electron/releases/tags/v${electronConfig.version}`,
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

function mkdir(dir, done) {
  fs.mkdir(dir, err => {
    if (err && err.code !== 'EEXIST') {
      done(err);
    } else {
      done();
    }
  });
}

function createDirectories(done) {
  async.series([
    callback => mkdir(distDir, callback),
    callback => mkdir(cacheDir, callback)
  ], (err) => done(err));   // discard result array
}

async.waterfall([
  createDirectories,
  bumpNpmVersion,
  // fetchReleaseTags,
  // filterVariants,
  // makeReleases
], err => {
  console.error(err);
});
