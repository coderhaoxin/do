'use strict'

const encode = encodeURIComponent
const decode = decodeURIComponent
const isArray = Array.isArray

function parse(str) {
  if (typeof str !== 'string') return {}

  str = str.trim()
  if (str === '') return {}
  if (str.charAt(0) === '?') str = str.slice(1)

  let obj = {}
  let key, value, parts
  let pairs = str.split('&')
  for (let i = 0; i < pairs.length; i++) {
    parts = pairs[i].split('=')
    key = decode(parts[0])
    value = decode(parts[1])

    if (key && value) {
      if (obj[key]) {
        obj[key] = isArray(obj[key]) ? obj[key].concat(value) : [obj[key], value]
      } else {
        obj[key] = value
      }
    }
  }

  return obj
}

function stringify(obj) {
  if (typeof obj !== 'object') return ''

  let pairs = []
  let key, value

  for (key in obj) {
    value = obj[key]

    if (!value) continue

    if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]))
      }
      continue
    }

    pairs.push(encode(key) + '=' + encode(obj[key]))
  }

  return pairs.join('&')
}

export { parse, stringify }
