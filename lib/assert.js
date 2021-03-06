'use strict'

import createError from './error'

function assert(ok, message) {
  if (!ok) {
    throw createError(message)
  }
}

assert.equal = (actual, expected, message) => {
  // default: strict equal
  assert(actual === expected, message)
}

assert.isError = (error, message) => {
  assert(error instanceof Error, message)
}

assert.deepEqual = (actual, expected, message) => {
  assert(_deepEqual(actual, expected), message)
}

assert.notDeepEqual = (actual, expected, message) => {
  assert(!_deepEqual(actual, expected), message)
}

/**
 * utils
 */
function _deepEqual(actual, expected) {
  if (actual === expected) return true

  if (isDate(actual) && isDate(expected)) {
    return actual.getTime() === expected.getTime()
  }

  if (isRegExp(actual) && isRegExp(expected)) {
    return regExpEqual(actual, expected)
  }

  if (isObject(actual) && isObject(expected)) {
    return objectEqual(actual, expected)
  }

  return actual === expected
}

function regExpEqual(actual, expected) {
  return actual.source === expected.source &&
    actual.global === expected.global &&
    actual.multiline === expected.multiline &&
    actual.lastIndex === expected.lastIndex &&
    actual.ignoreCase === expected.ignoreCase
}

function objectEqual(a, b) {
  if (!a || !b) return false

  let ka = Object.keys(a).sort()
  let kb = Object.keys(b).sort()

  if (ka.length !== kb.length) return false

  for (let i = 0; i < ka.length; i++) {
    let k = ka[i]

    if (isObject(a[k]) && isObject(b[k]) && objectEqual(a[k], b[k])) continue

    if (a[k] !== b[k]) return false
  }

  return true
}

function isObject(object) {
  // object or array, not null, not undefined
  return !!object && typeof object === 'object'
}

function isDate(date) {
  return date instanceof Date
}

function isRegExp(regexp) {
  return regexp instanceof RegExp
}

export default assert
