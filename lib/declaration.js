'use strict'

function parse() {
  var body = document.querySelector('body')
  getNodes(body)
}

function getNodes(node) {
  var nodes = node.childNodes
  if (nodes && nodes.length) {
    for (var i = 0; i < nodes.length; i++) {
      getAttrs(nodes[i])
      getNodes(nodes[i])
    }
  }
}

function getAttrs(node) {
  var attrs = node.attributes
  if (attrs && attrs.length) {
    var k, v
    for (var i = 0; i < attrs.length; i++) {
      k = attrs[i] && attrs[i].name
      if (k === 'data-href') {
        v = node.getAttribute(k)
        handle(node, v)
      }
    }
  }
}

function handle(node, href) {
  node.addEventListener('click', function(e) {
    e.preventDefault()
    location.href = href
  })
}

export { parse }
