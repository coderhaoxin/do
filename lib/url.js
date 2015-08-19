'use strict'

class Url {
  constructor(url) {
    let U = window.URL || window.webkitURL
    let u = new U(url)

    this.href = u.href
    this.host = u.host || location.host
    this.port = u.port
    this.hash = u.hash
    this.hostname = u.hostname || location.hostname
    this.pathname = u.pathname
    this.protocol = u.protocol
    this.search = u.search
    this.query = u.search.slice(1)
  }

  format() {
    let result = ''

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
    let path = this.pathname
    let items = []

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
    if (!path) {
      return this
    }

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
 * @param {String} to (optional)
 */
function resolve(from, to) {
  return (new Url(from)).resolve(to).format()
}

/**
 * @param {String} from
 * @param {String} to
 */
function join(from, to) {
  return (new Url(from)).join(to).format()
}

export { resolve, join }
