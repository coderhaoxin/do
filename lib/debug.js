'use strict'

var isArray = Array.isArray
var slice = [].slice
var flag = 0
var mode = ''
var api = ''

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

function debug() {
  if (!debugMode()) return

  var args = slice.apply(arguments)

  if (isFormatArgs(args)) {
    return logFormatArgs(args)
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

function logFormatArgs(args) {
  switch (mode) {
    case 'console':
      console.trace.apply(console, args)
      break
    case 'alert':
      alert(args2string(args))
      break
    case 'page':
      log2page(args)
      break
    case 'report':
      log2fetch(args)
      break
  }
}

function log(value, color) {
  if (!color) {
    flag = ++flag % colors.length
    color = colors[flag]
  }
  value = stringify(value)

  switch (mode) {
    case 'console':
      if (typeof value === 'object') {
        console.trace('%o', value)
      } else {
        console.trace('%c ' + value, color)
      }
      break
    case 'alert':
      alert(value)
      break
    case 'page':
      log2page(value)
      break
    case 'report':
      log2fetch(value)
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

  if (/debug=page/i.test(location.search)) {
    mode = 'page'
    return true
  }

  if (/debug=report/i.test(location.search)) {
    mode = 'report'
    api = getReportApi()

    if (!api) {
      mode = 'alert'
    }

    return true
  }

  return false
}

/**
 * @param {String|Array} args
 */
function log2page(args) {
  args = args2string(args)

  var pre = document.createElement('pre')
  flag = ++flag % colours.length
  var color = colours[flag]
  pre.style.color = color
  pre.textContent = args
  document.body.appendChild(pre)
}

/**
 * @param {String|Array} args
 */
function log2fetch(args) {
  return fetch(api, {
    method: 'post',
    body: jsonStringify({
      message: args2string(args),
      location: location,
      time: Date.now()
    })
  })
}

function stringify(arg) {
  return typeof arg === 'string' ? arg : jsonStringify(arg) + '\n'
}

function isFormatArgs(args) {
  return typeof args[0] === 'string' && args[0].indexOf('%') !== -1
}

/**
 * @param {String|Array}
 */
function args2string(args) {
  if (isArray(args)) {
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

  return args
}

function getReportApi() {
  var search = location.search
  if (search.indexOf('?') === 0) {
    search = search.slice(1)
  }

  var url = ''

  search.split('&').forEach((s) => {
    if (s.indexOf('__api__=') === 0) {
      url = s.slice(8)
    }
  })

  url = decodeURIComponent(url)

  return url
}

function jsonStringify(obj, spaces) {
  return JSON.stringify(obj, serializer(), spaces)
}

function serializer() {
  var stack = []
  var keys = []

  var cycleReplacer = (key, value) => {
    if (stack[0] === value) return '[Circular ~]'
    return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']'
  }

  return (key, value) => {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      if (~thisPos) {
        stack.splice(thisPos + 1)
      } else {
        stack.push(this)
      }
      if (~thisPos) {
        keys.splice(thisPos, Infinity, key)
      } else {
        keys.push(key)
      }
      if (~stack.indexOf(value)) {
        value = cycleReplacer.call(this, key, value)
      }
    } else {
      stack.push(value)
    }

    return value
  }
}

export { Debug }
