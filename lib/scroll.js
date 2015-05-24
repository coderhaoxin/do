'use strict'

function toTop(ms) {
  var length = document.body.scrollTop
  var count = (ms / 10) | 0
  var step = -Math.ceil(length / count)
  var duration = (ms / count) | 0

  var timer = setInterval(function() {
    scrollBy(0, step)
  }, duration)

  setTimeout(function() {
    clearInterval(timer)
  }, ms * 2)
}

export { toTop }
