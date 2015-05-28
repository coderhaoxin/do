'use strict'

function toTop(ms) {
  var length = document.body.scrollTop
  var count = (ms / 10) | 0
  var step = -Math.ceil(length / count)
  var duration = (ms / count) | 0

  var timer = setInterval(() => {
    scrollBy(0, step)
  }, duration)

  setTimeout(() => {
    clearInterval(timer)
  }, ms * 2)
}

export { toTop }
