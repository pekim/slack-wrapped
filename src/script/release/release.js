'use strict';

const async = require('async');
const npm = require('npm');
const request = require('request');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const exec = require('child_process').exec;
const replace = require('replace');
const ncp = require('ncp').ncp;

const rootDir = '../../';
const packageJsonPath = path.join(rootDir, 'package.json');

const electronConfig = require(packageJsonPath).electron;

const nodeModulesDir = path.join('./', 'node_modules');
const builtAppDir = path.join('./', 'build');
const distDir = path.join('./', 'dist');
const cacheDir = path.join(distDir, 'cache');
const releaseDir = path.join(distDir, 'release');

const newVersion = process.argv[2];

const executableNames = {
  'darwin-x64': {
    electron: 'Electron.app',
    slack   : 'Slack Wrapped.app',
    helper  : darwinExecutableNameFixup
  },
  'linux-x64': {
    electron: 'electron',
    slack   : 'slack-wrapped'
  },
  'win32-x64': {
    electron: 'electron.exe',
    slack   : 'slack-wrapped.exe'
  }
};

const resourceAppPaths = {
  'darwin-x64': 'Electron.app/Contents/Resources/app',
  'linux-x64' : 'resources/app',
  'win32-x64' : 'resources/app'
};

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
    renameElectronExecutable,
    zipReleaseAsset
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
  exec(`unzip -q ${asset.localElectronAssetFilePath} -d ${asset.distDir}`, (err, stdout, stderr) => {
    if (stdout.length) {
      console.log(stdout);
    }
    if (stderr.length) {
      console.error(stderr);
    }

    callback(err, asset);
  });
}

function zipReleaseAsset(asset, callback) {
  exec(`zip -r -q --symlinks ${path.resolve(asset.releaseAssetPath)} .`, {
    cwd: path.resolve(asset.distDir)
  }, (err, stdout, stderr) => {
    if (stdout.length) {
      console.log(stdout);
    }
    if (stderr.length) {
      console.error(stderr);
    }

    if (!err) {
      console.log(`wrote ${asset.releaseAssetPath}`);
    }

    callback(err, asset);
  });
}

function renameElectronExecutable(asset, callback) {
  asset.electronExecutableName = executableNames[asset.simpleName].electron;
  asset.slackExecutableName = executableNames[asset.simpleName].slack;

  asset.electronExecutablePath = path.join(asset.distDir, asset.electronExecutableName);
  asset.slackExecutablePath = path.join(asset.distDir, asset.slackExecutableName);

  fs.renameSync(asset.electronExecutablePath, asset.slackExecutablePath);

  if (executableNames[asset.simpleName].helper) {
    executableNames[asset.simpleName].helper(asset, callback);
  } else {
    callback(null, asset);
  }
}

function darwinExecutableNameFixup(asset, callback) {
  replace({
    regex      : '<string>Electron</string>',
    replacement: '<string>Slack Wrapped</string>',
    paths      : [path.join(asset.slackExecutablePath, 'Contents/Info.plist')],
    recursive  : false,
    silent     : true
  });

  const electronHelperAppPath = path.join(asset.slackExecutablePath, 'Contents/Frameworks/Electron Helper.app');
  const slackHelperAppPath = path.join(asset.slackExecutablePath, 'Contents/Frameworks/Slack Wrapped Helper.app');
  fs.renameSync(electronHelperAppPath, slackHelperAppPath);

  replace({
    regex      : '<string>Electron Helper</string>',
    replacement: '<string>Slack Wrapped Helper</string>',
    paths      : [path.join(slackHelperAppPath, 'Contents/Info.plist')],
    recursive  : false,
    silent     : true
  });

  callback(null, asset);
}

function addAppToResources(asset, callback) {
  const resourceAppPath = path.join(asset.distDir, resourceAppPaths[asset.simpleName]);
  const nodeModulesDestPath = path.join(resourceAppPath, 'node_modules');

  async.series([
    done => ncp(builtAppDir, resourceAppPath, done),
    done => ncp(nodeModulesDir, nodeModulesDestPath, done)
  ], err => callback(err, asset));
}

function filterVariants(releaseTags, callback) {
  const assets = releaseTags.assets
    .filter(asset => {
      return electronConfig.variants.some(variant => {
        return asset.name === `electron-v${electronConfig.version}-${variant}.zip`;
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
