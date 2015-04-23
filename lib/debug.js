(function() {
  'use strict';

  if (!window.debug) {
    window.debug = debug;
  }

  var flag = 0;

  function debug() {
    if (noDebug()) return;

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];

      if (arg instanceof Error) {
        // error
        error(arguments[i]);

        if (arguments[i].message) error(arguments[i].message);
        if (arguments[i].status) error(arguments[i].status);
        if (arguments[i].name) error(arguments[i].name);
        if (arguments[i].code) error(arguments[i].code);

        error(arguments[i].stack);
      } else if (typeof arg === 'object') {
        // object
        arg = JSON.stringify(arg);
        log(arg);
      } else {
        log(arg);
      }
    }
  }

  function log(s) {
    flag = (flag + 1) % 2;
    var colors = [';color: #00ff00', ';color: #0000ff']; // green, blue
    console.log('%c ' + getLineNumber() + ' \n' + s, colors[flag]);
  }

  function error(s) {
    var red = ';color: #ff0000';
    // don't use `console.error`, this will confused with normal errors
    console.log('%c ' + getLineNumber() + ' \n' + s, red);
  }

  function getLineNumber() {
    var err = new Error();
    Error.captureStackTrace(err, debug);

    var line = '',
      file = '',
      result;

    try {
      throw err;
    } catch (e) {
      try {
        file = (e.stack.split('\n')[1] || '').trim();

        var matches = e.stack.match(/\d+:\d+$/);
        if (matches && matches[0]) {
          line = matches[0].split(':')[0];
        }
      } finally {}
    } finally {
      if (file && file.indexOf('at') >= 0) {
        result = 'debug ' + file;
      } else if (line) {
        result = 'debug at line: ' + line;
      }
    }

    return result;
  }

  function noDebug() {
    return !window.DEBUG && /debug/i.test(window.location.search) === false;
  }
}());
