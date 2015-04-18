'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var ignore = require('gulp-ignore');
var config = require('../util/config');

var glob = config.path.source + 'style/**/*.styl';

gulp.task('stylus', function () {
  return gulp.src(glob, {base: config.path.source})
    .pipe(stylus({use: [nib()]}))
    .pipe(ignore('**/_*.css'))
    .pipe(gulp.dest(config.path.dest));
});

exports.glob = glob;
