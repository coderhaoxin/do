'use strict'

class URL {
  constructor(url) {
    var a = document.createElement('a')
    a.href = url

    this.href = a.href
    this.host = a.host || location.host
    this.port = a.port
    this.hash = a.hash
    this.hostname = a.hostname || location.hostname
    this.pathname = a.pathname.charAt(0) !== '/' ? '/' + a.pathname : a.pathname
    this.protocol = !a.protocol || a.protocol === ':' ? location.protocol : a.protocol
    this.search = a.search
    this.query = a.search.slice(1)
  }

  format() {
    var result = ''

    if (this.host) {
      result += this.host

      if (this.protocol) {
        result = this.protocol + '//' + result
      }
    }
    if (this.pathname) {
      result += this.pathname
    }
    if (this.search) {
      result += this.search
    }
    if (this.hash) {
      result += this.hash
    }

    return result
  }

  normalize() {
    var path = this.pathname
    var items = []

    path.split('/').forEach((s) => {
      if (s === '') return
      if (s === '.') return
      if (s === '..') {
        if (items.length) {
          items.pop()
        }

        return
      }

      items.push(s)
    })

    this.pathname = '/' + items.join('/')
  }

  resolve(path) {
    if (path[0] === '/') {
      this.pathname = path
    } else {
      this.pathname = this.pathname + '/' + path
    }
    this.normalize()
    return this
  }

  join(path) {
    this.pathname = this.pathname + '/' + path
    this.normalize()
    return this
  }
}

/**
 * @param {String} from
 * @param {String} to
 */
function resolve(from, to) {
  return (new URL(from)).resolve(to).format()
}

/**
 * @param {String} from
 * @param {String} to
 */
function join(from, to) {
  return (new URL(from)).join(to).format()
}

export { resolve, join }
