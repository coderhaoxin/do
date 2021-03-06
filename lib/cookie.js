'use strict'

function cookie(name, value, options) {
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options)
    case 1:
      return get(name)
    default:
      return all()
  }
}

function set(name, value, options) {
  options = options || {}
  let str = encode(name) + '=' + encode(value)

  if (!value) options.maxage = -1

  let maxage = options.maxage || options.maxAge
  if (maxage) str += '; Max-Age=' + maxage
  if (options.path) str += '; path=' + options.path
  if (options.domain) str += '; domain=' + options.domain
  if (options.expires) str += '; expires=' + options.expires.toUTCString()
  if (options.secure) str += '; secure'

  document.cookie = str
}

function all() {
  return parse(document.cookie)
}

function get(name) {
  return all()[name]
}

function parse(str) {
  let obj = {}
  let pairs = str.split(/ *; */)
  let pair
  if (pairs[0] === '') return obj
  for (let i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=')
    obj[decode(pair[0])] = decode(pair[1])
  }
  return obj
}

function encode(value) {
  try {
    return encodeURIComponent(value)
  } catch (e) {
    return ''
  }
}

function decode(value) {
  try {
    return decodeURIComponent(value)
  } catch (e) {
    return ''
  }
}

/**
 * export
 */

export default cookie
