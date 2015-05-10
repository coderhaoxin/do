'use strict'

var flag = 0
var mode = ''

var colors = [
  ';color: purple',
  ';color: green',
  ';color: blue',
  ';color: gray'
]

function debug() {
  if (!debugMode()) return
  if (!arguments.length) return

  var args = [].slice.apply(arguments)

  if (typeof args[0] === 'string' && args[0].indexOf('%') !== -1) {
    log('debug')
    console.info.apply(console, args)
    return
  }

  for (var i = 0; i < args.length; i++) {
    var arg = args[i]

    if (arg instanceof Error) {
      var err = {}
      if (arg.message) err.message = arg.message
      if (arg.status) err.status = arg.status
      if (arg.stack) err.stack = arg.stack
      if (arg.name) err.name = arg.name
      if (arg.code) err.code = arg.code

      error(err)
    } else {
      log(arg)
    }
  }
}

function log(v) {
  if (mode === 'alert') {
    return alert(v)
  }
  if (typeof v === 'object') {
    return console.info('%o', v)
  }

  flag = ++flag % colors.length
  var color = colors[flag]
  console.info('%c ' + getMetaMsg() + ' \n' + v, color)
}

function error(v) {
  if (mode === 'alert') {
    return alert(v)
  }
  if (typeof v === 'object') {
    return console.info('%o', v)
  }

  var red = ';color: #ff0000'
  // don't use `console.error`, this will confused with normal errors
  console.info('%c ' + getMetaMsg() + ' \n' + v, red)
}

function getMetaMsg() {
  var err = new Error()
  Error.captureStackTrace(err, debug)

  var filename = ''
  var result = ''
  var line = ''

  try {
    throw err
  } catch (e) {
    try {
      filename = (e.stack.split('\n')[1] || '').trim()
      var matches = filename.match(/\d+:\d+$/)
      if (matches && matches[0]) {
        line = matches[0].split(':')[0]
      }
    } finally {}
  } finally {
    if (filename && filename.indexOf('at') >= 0) {
      filename = filename.split('?')[0].split('/').pop()
      result += 'filename: ' + filename + ' '
    }
    if (line) {
      result += 'line: ' + line
    }
  }

  return result
}

function debugMode() {
  if (/debug=console/i.test(location.search)) {
    mode = 'console'
    return true
  }
  if (/debug=alert/i.test(location.search)) {
    mode = 'alert'
    return true
  }

  return false
}

export { debug }
