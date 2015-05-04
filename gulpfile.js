'use strict';

let es6moduleTranspiler = require('gulp-es6-module-transpiler');
let gulp = require('gulp');

gulp.task('module', function() {
  return gulp.src('test/import/*.js')
    .pipe(es6moduleTranspiler({
      formatter: 'bundle'
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('test/dest/'));
});

gulp.task('default', ['module']);
