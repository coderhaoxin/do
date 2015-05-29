'use strict'

var slice = [].slice
var flag = 0
var mode = ''

var colours = [
  'purple',
  'green',
  'blue',
  'gray'
]

var colors = [
  ';color: purple',
  ';color: green',
  ';color: blue',
  ';color: gray'
]

function debug() {
  if (!debugMode()) return

  var args = slice.apply(arguments)

  if (isFormatArgs(args)) {
    return logFormatArgs(args)
  }

  for (var arg of args) {
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

function logFormatArgs(args) {
  switch (mode) {
    case 'console':
      console.info.apply(console, args)
      break
    case 'alert':
      alert(args.map((arg) => {
        return stringify(arg)
      }).join(''))
      break
    case 'write':
      write(args)
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

/**
 * @param {String|Array} args
 */
function write(args) {
  if (Array.isArray(args)) {
    if (isFormatArgs(args)) {
      args.forEach((v, i) => {
        if (i > 0) {
          args[0] = args[0].replace(/\%[s|d|o]{1}/, stringify(v))
        }
      })
      args = args[0]
    } else {
      args = args.map((arg) => {
        return stringify(arg)
      }).join(' ')
    }
  }

  var pre = document.createElement('pre')
  flag = ++flag % colours.length
  var color = colours[flag]
  pre.style.color = color
  pre.textContent = args
  document.body.appendChild(pre)
}

function stringify(arg) {
  return typeof arg === 'string' ? arg : JSON.stringify(arg) + '\n'
}

function isFormatArgs(args) {
  return typeof args[0] === 'string' && args[0].indexOf('%') !== -1
}

export { debug, Debug }
