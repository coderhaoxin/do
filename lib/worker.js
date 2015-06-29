'use strict'

class Single {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('invalid worker')
    }

    this.worker = fn
    this.running = false
  }
  run() {
    if (this.running) return

    var args = [].slice.apply(arguments)
    this.running = true
    this.worker.apply(this, args)
  }
  done() {
    this.running = false
  }
}

/**
 * @param {Function} fn (return Promise)
 */
function single(fn) {
  var running = false

  return (...args) => {
    if (running) return

    running = true
    fn(...args)
      .then(() => {
        running = false
      })
      .catch(() => {
        running = false
      })
  }
}

export { Single, single }
