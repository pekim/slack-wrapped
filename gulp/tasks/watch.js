'use strict';

var gulp = require('gulp');

var copy = require('./copy');
var babel = require('./babel');
var stylus = require('./stylus');

gulp.task('watch', function() {
  gulp.watch(copy.glob, ['copy']);
  gulp.watch(babel.glob, ['babel']);
  gulp.watch(stylus.glob, ['stylus']);
});
