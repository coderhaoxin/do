'use strict'

const pack = require('gulp-webpack')
const babel = require('gulp-babel')
const react = require('gulp-react')
const seq = require('run-sequence')
const gulp = require('gulp')

gulp.task('pack', function() {
  return gulp.src('build/import/*.js')
    .pipe(pack({
      output: {
        filename: 'index.js'
      }
    }))
    .pipe(gulp.dest('build/dist/'))
})

gulp.task('react', function() {
  return gulp.src('lib/*.js')
    .pipe(react({
      harmony: true,
      es6module: true
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/react/'))
})

gulp.task('babel', function() {
  return gulp.src('build/react/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/lib'))
})

gulp.task('import', function() {
  return gulp.src('import/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/import'))
})

gulp.task('default', function() {
  seq('react', 'babel', 'import', 'pack')
})
