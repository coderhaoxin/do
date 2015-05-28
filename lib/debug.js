'use strict'

var slice = [].slice
var flag = 0
var mode = ''
var write

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
    return logs(args)
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

function logs() {
  var args = slice.apply(arguments)

  switch (mode) {
    case 'console':
      console.info.apply(console, args)
      break
    case 'alert':
      alert(args.map(function(arg) {
        return stringify(arg)
      }))
      break
    case 'write':
      write(args.map(function(arg) {
        return stringify(arg)
      }))
      break
  }
}

function log(value, color) {
  if (!color) {
    flag = ++flag % colors.length
    color = colors[flag]
  }

  switch (mode) {
    case 'console':
      if (typeof value === 'object') {
        console.info('%o', value)
      } else {
        console.info('%c ' + value, color)
      }
      break
    case 'alert':
      alert(stringify(value))
      break
    case 'write':
      write(stringify(value))
      break
  }
}

function error(value) {
  var red = ';color: #ff0000'
  log(value, red)
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

  if (/debug=write/i.test(location.search)) {
    mode = 'write'
    var e = document.createElement('div')
    document.body.appendChild(e)

    write = function() {
      var args = slice.apply(arguments)
      args = args.map(function(arg) {
        return stringify(arg)
      })
      e.textContent += args
    }
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

function stringify(arg) {
  return typeof arg === 'string' ? arg : JSON.stringify(arg) + '\n'
}

function isFormatArgs(args) {
  return typeof args[0] === 'string' && args[0].indexOf('%') !== -1
}

export { debug, Debug }
