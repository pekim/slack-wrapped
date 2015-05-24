'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var config = require('../util/config');

var packageJson = 'package.json';

var glob = [
  config.path.source + 'font/**',
  config.path.source + 'image/**',
  config.path.source + '**/*.css',
  config.path.source + '**/*.html',
  config.path.source + '**/dictionaries/*'
];

gulp.task('copy', function () {
  return merge(
      gulp.src(packageJson),
      gulp.src(glob, {base: config.path.source})
    )
    .pipe(gulp.dest(config.path.dest));
});

exports.glob = glob.concat([packageJson]);
