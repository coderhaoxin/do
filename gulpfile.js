'use strict'

const es6moduleTranspiler = require('gulp-es6-module-transpiler')
const react = require('gulp-react')
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

gulp.task('react', function() {
  return gulp.src('test/src/**/*.js')
    .pipe(react({
      harmony: true,
      es6module: true
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('test/dest/'))
})

gulp.task('default', function() {
  seq('module', 'react')
})
