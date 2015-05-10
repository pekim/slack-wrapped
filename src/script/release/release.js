'use strict';

const async = require('async');
const npm = require('npm');
const request = require('request');
const findit = require('findit');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Zip = require('adm-zip');

const rootDir = '../../';
const packageJsonPath = path.join(rootDir, 'package.json');

const electronConfig = require(packageJsonPath).electron;

const distDir = path.join('./', 'dist');
const cacheDir = path.join(distDir, 'cache');
const releaseDir = path.join(distDir, electronConfig.version);

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

function makeReleaseAssets(assets, callback) {
  async.each(assets, makeReleaseAsset, callback);
}

function makeReleaseAsset(asset, callback) {
  async.waterfall([
    done => done(null, asset),
    ensureElectronReleaseAssetExists,
    unzipElectronReleaseAsset,
    addAppToResources,
    // zipReleaseAsset
  ], callback);
}

function ensureElectronReleaseAssetExists(asset, callback) {
  fs.stat(asset.localElectronAssetFilePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fetchElectronReleaseAsset(asset, callback);
      } else {
        callback(err);
      }
    } else {
      callback(null, asset);
    }
  });
}

function fetchElectronReleaseAsset(asset, callback) {
  const progressInterval = 1024 * 1024;
  const fileStream = fs.createWriteStream(asset.localElectronAssetFilePath);
  let bytesSinceLastProgressIndicator = 0;

  request
    .get(asset.browser_download_url)
    .on('data', function(chunk) {
      bytesSinceLastProgressIndicator += chunk.length;

      while (bytesSinceLastProgressIndicator > progressInterval) {
        process.stdout.write('.');
        bytesSinceLastProgressIndicator -= progressInterval;
      }
    })
    .on('error', function(err) {
      callback(err);
    })
    .pipe(fileStream)
    .on('finish', function() {
      console.log(`\nfetched ${asset.localElectronAssetFilePath}`);
      callback(null, asset);
    });
}

function unzipElectronReleaseAsset(asset, callback) {
  const zip = new Zip(asset.localElectronAssetFilePath);

  zip.extractAllTo(asset.distDir);

  callback(null, asset);
}

function zipReleaseAsset(asset, callback) {
  const zip = new Zip();

  zip.addLocalFolder(asset.distDir, '.');
  zip.writeZip(asset.releaseAssetPath);

  callback();
}

function addAppToResources(asset, callback) {
  const finder = findit(asset.distDir);

  finder.on('directory', (dir/*, stat, stop*/) => {
    if (path.basename(dir).toLowerCase() === 'resources') {
      console.log(asset.simpleName, dir)
    }
  });

  finder.on('end', () => callback);
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

function supplementVariants(assets, callback) {
  assets.forEach(asset => {
    asset.simpleName = electronConfig.variants.filter(variant => {
      return asset.name.includes(variant);
    })[0];

    asset.localElectronAssetFilePath = path.join(cacheDir, asset.name);
    asset.distDir = path.join(releaseDir, asset.simpleName);
    asset.releaseAssetPath = path.join(releaseDir, asset.simpleName + '.zip');
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

function cleanDirectories(done) {
  async.series([
    callback => rimraf(releaseDir, callback)
  ], (err) => done(err));   // discard result array
}

function createDirectories(done) {
  async.series([
    callback => mkdir(distDir, callback),
    callback => mkdir(cacheDir, callback),
    callback => mkdir(releaseDir, callback)
  ], (err) => done(err));   // discard result array
}

async.waterfall([
  cleanDirectories,
  createDirectories,
  bumpNpmVersion,
  fetchReleaseTags,
  filterVariants,
  supplementVariants,
  makeReleaseAssets
], err => {
  if (err) {
    console.error(err);
  }
});
