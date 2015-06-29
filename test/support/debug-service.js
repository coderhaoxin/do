'use strict'

const http = require('http')
const util = require('util')

const server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,Origin,X-Requested-With')

  let data = []
  req.setEncoding('utf8')
  req.on('data', function(chunk) {
    data.push(chunk)
  })
  req.on('end', function() {
    if (data.length) {
      data = Buffer.concat(data)
      console.log(util.inspect(data))
    }
  })

  res.end('ok')
})

server.listen(3000)
