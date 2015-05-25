'use strict'

function toTop(node) {
  if (!(node && node.style)) return

  var offsetTop = node.offsetTop + node.offsetHeight

  window.onscroll = function() {
    var scrollY = window.scrollY

    if (scrollY > offsetTop) {
      node.style.position = 'fixed'
      node.style.top = '0'
    } else {
      node.style.position = ''
      node.style.top = ''
    }
  }
}

export { toTop }
