'use strict'

const isArray = Array.isArray
const slice = [].slice

let flag = 0

const colours = [
  'purple',
  'green',
  'blue',
  'gray'
]

const colors = [
  ';color: purple',
  ';color: green',
  ';color: blue',
  ';color: gray'
]

function Debug(prefix) {
  return function() {
    let args = slice.apply(arguments)

    if (isFormatArgs(args)) {
      args[0] = prefix + ' ' + args[0]
    } else {
      args = [prefix].concat(args)
    }
    debug.apply(null, args)
  }
}

function debug() {
  if (!debugMode()) return

  let args = slice.apply(arguments)

  if (isFormatArgs(args)) {
    return console.trace.apply(console, args)
  }

  for (let arg of args) {
    if (arg instanceof Error) {
      let err = {}
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

function log(value, color) {
  if (!color) {
    flag = ++flag % colors.length
    color = colors[flag]
  }
  value = stringify(value)

  if (typeof value === 'object') {
    console.trace('%o', value)
  } else {
    console.trace('%c ' + value, color)
  }
}

function error(value) {
  let red = ';color: #ff0000'
  log(value, red)
}

function debugMode() {
  return /debug=console/i.test(location.search) || window.DEBUG === true
}

function stringify(arg) {
  return typeof arg === 'string' ? arg : JSON.stringify(arg) + '\n'
}

function isFormatArgs(args) {
  return typeof args[0] === 'string' && args[0].indexOf('%') !== -1
}

/**
 * export
 */

export default Debug
