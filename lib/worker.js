'use strict'

class Single {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('invalid worker')
    }

    this.worker = fn
    this.running = false
  }
  run(...args) {
    if (this.running) return

    this.running = true
    this.worker.apply(this, args)
  }
  done() {
    this.running = false
  }
}

class Once {
  constructor(fn) {
    this.worker = fn
    this.done = false
  }
  run(...args) {
    if (this.done) return

    this.done = true
    this.worker.apply(this, args)
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

export { Single, single, Once }
