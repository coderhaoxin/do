'use strict'

describe('## url', function() {
  describe('# resolve', function() {
    it('', function() {
      let cases = [{
        from: 'http://github.com/api?name=hello',
        to: '/status',
        expect: 'http://github.com/status?name=hello'
      }, {
        from: 'http://github.com/api#hello',
        to: '/status',
        expect: 'http://github.com/status#hello'
      }, {
        from: 'http://github.com/api',
        to: '/status',
        expect: 'http://github.com/status'
      }, {
        from: 'http://github.com/api',
        to: 'status',
        expect: 'http://github.com/api/status'
      }]

      cases.forEach(function(c) {
        expect(window.url.resolve(c.from, c.to)).toEqual(c.expect)
      })
    })
  })

  describe('# join', function() {
    it('basic', function() {
      let cases = [{
        from: 'http://github.com/api?name=hello',
        to: '/status',
        expect: 'http://github.com/api/status?name=hello'
      }, {
        from: 'http://github.com/api#hello',
        to: '/status',
        expect: 'http://github.com/api/status#hello'
      }, {
        from: 'http://github.com/api',
        to: '/status',
        expect: 'http://github.com/api/status'
      }, {
        from: 'http://github.com/api',
        to: 'status',
        expect: 'http://github.com/api/status'
      }]

      cases.forEach(function(c) {
        expect(window.url.join(c.from, c.to)).toEqual(c.expect)
      })
    })
  })
})
