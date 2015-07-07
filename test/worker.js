'use strict'

describe('## worker', function() {
  describe('# single', function() {
    it('success', function(done) {
      let total = 0
      function add(a, b) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            total += b
            resolve()
          }, 10)
        })
      }

      add = window.single(add)

      add(1, 2)
      add(1, 2)
      add(1, 2)

      setTimeout(function() {
        add(1, 2)
      }, 200)

      setTimeout(function() {
        expect(total).toEqual(4)
        done()
      }, 500)
    })
  })

  describe('# Single', function() {
    it('success', function(done) {
      let total = 0
      function add(a, b) {
        return new Promise(function(resolve) {
          setTimeout(function() {
            total += b
            resolve()
          }, 10)
        })
      }

      let worker = new window.Single(add)

      worker.run(1, 2)
      worker.run(1, 2)
      worker.run(1, 2)

      setTimeout(function() {
        worker.done()
        worker.run(1, 2)
      }, 200)

      setTimeout(function() {
        worker.done()
        expect(total).toEqual(4)
        done()
      }, 500)
    })
  })

  describe('# Once', function() {
    it('success', function() {
      let total = 0
      function add(a, b) {
        total += b
      }

      let worker = new window.Once(add)

      worker.run(1, 2)
      worker.run(1, 2)
      worker.run(1, 2)

      expect(total).toEqual(2)
    })
  })
})
