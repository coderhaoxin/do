'use strict'

function parse() {
  let body = document.querySelector('body')
  getNodes(body)
}

function getNodes(node) {
  let nodes = node.childNodes
  if (nodes && nodes.length) {
    for (let i = 0; i < nodes.length; i++) {
      getAttrs(nodes[i])
      getNodes(nodes[i])
    }
  }
}

function getAttrs(node) {
  let attrs = node.attributes
  if (attrs && attrs.length) {
    let k, v
    for (let i = 0; i < attrs.length; i++) {
      k = attrs[i] && attrs[i].name
      if (k === 'data-href') {
        v = node.getAttribute(k)
        handle(node, v)
      }
    }
  }
}

function handle(node, href) {
  node.addEventListener('click', (e) => {
    e.preventDefault()
    location.href = href
  })
}

export { parse }
