'use strict'

function toTop(ms) {
  let length = document.body.scrollTop
  let count = (ms / 10) | 0
  let step = -Math.ceil(length / count)
  let duration = (ms / count) | 0

  let timer = setInterval(() => {
    scrollBy(0, step)
  }, duration)

  setTimeout(() => {
    clearInterval(timer)
  }, ms * 2)
}

export { toTop }
