'use strict'

const es6moduleTranspiler = require('gulp-es6-module-transpiler')
const babel = require('gulp-babel')
const seq = require('run-sequence')
const gulp = require('gulp')

gulp.task('module', function() {
  return gulp.src('test/import/*.js')
    .pipe(es6moduleTranspiler({
      formatter: 'bundle'
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('test/src/'))
})

gulp.task('babel', function() {
  return gulp.src('test/src/**/*.js')
    .pipe(babel({
      loose: ['es6.modules']
    }))
    .pipe(gulp.dest('test/dest/'))
})

gulp.task('default', function() {
  seq('module', 'babel')
})
