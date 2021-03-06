'use strict'

module.exports = function(config) {
  config.set({
    basePath: '..',

    files: [
      'test/*.js',
      'build/dest/*.js'
    ],

    preprocessors: {
      'lib/*.js': 'coverage'
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher'
    ],

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    }
  })
}
