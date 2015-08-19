'use strict'

const pack = require('gulp-webpack')
const babel = require('gulp-babel')
const seq = require('run-sequence')
const gulp = require('gulp')

gulp.task('pack', function() {
  return gulp.src('build/import/*.js')
    .pipe(pack({
      output: {
        filename: 'index.js'
      }
    }))
    .pipe(gulp.dest('build/dest/'))
})

gulp.task('babel', function() {
  return gulp.src('lib/*.js')
    .pipe(babel({
      loose: 'all',
      stage: 0
    }))
    .pipe(gulp.dest('build/lib'))
})

gulp.task('import', function() {
  return gulp.src('import/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/import'))
})

gulp.task('default', function() {
  seq('babel', 'import', 'pack')
})
