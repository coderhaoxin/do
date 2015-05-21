'use strict'

var slice = [].slice
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

  var args = slice.apply(arguments)

  if (isFormatArgs(args)) {
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
  console.info('%c ' + v, color)
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
  console.info('%c ' + v, red)
}

function isFormatArgs(args) {
  return typeof args[0] === 'string' && args[0].indexOf('%') !== -1
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

function Debug(prefix) {
  return function() {
    var args = slice.apply(arguments)

    if (isFormatArgs(args)) {
      args[0] = prefix + ' ' + args[0]
    } else {
      args = [prefix].concat(args)
    }
    debug.apply(null, args)
  }
}

export { debug, Debug }
