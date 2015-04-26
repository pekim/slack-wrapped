'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var config = require('../util/config');

var glob = 'src/script/**/*.js';

gulp.task('babel', function () {
  return gulp.src(glob, {base: config.path.source})
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('map'))
    .pipe(gulp.dest(config.path.dest));
});

exports.glob = glob;
