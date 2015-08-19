'use strict'

/**
 * @param {Node} node
 * @param {Number} offsetTop
 * @param {String} event
 */
function toTop(node, offsetTop, event) {
  if (!(node && node.style)) return

  if (typeof offsetTop === 'string') {
    event = offsetTop
    offsetTop = undefined
  }

  offsetTop = offsetTop || node.offsetTop
  let originPosition = node.style.position

  if (event) {
    window[event] = worker
  } else if ('ontouchmove' in document.documentElement) {
    window.ontouchstart = worker
    window.ontouchmove = worker
    window.ontouchend = worker
  } else {
    window.onscroll = worker
  }

  function worker() {
    let scrollY = window.scrollY

    if (scrollY > offsetTop) {
      if (!originPosition) {
        node.style.position = 'fixed'
      }
      node.style.top = '0'
    } else {
      node.style.position = originPosition
      node.style.top = (offsetTop - scrollY) + 'px'
    }
  }
}

export { toTop }
