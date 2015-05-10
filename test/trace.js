'use strict'

describe('## trace', function() {
  describe('# trace', function() {
    it('should exist', function() {
      expect(typeof window.trace).toEqual('object')
      expect(typeof window.trace.handle).toEqual('function')
    })
  })

  describe('# register event handler', function() {
    it('success', function() {
      window.trace.registerEvent('log', function(data) {
        this.logFlag = (this.logFlag | 0) + data
      })
    })

    it('throw error', function() {
      try {
        window.trace.registerEvent(123)
        window.trace.registerEvent('log', 123)
      } catch (e) {
        // todo
      }
    })

  })

  describe('# register error handler', function() {
    it('success', function() {
      window.trace.registerError(function(error) {
        if (error.message === '400 error') {
          return true
        }
      }, function() {
        this.errFlag = (this.errFlag | 0) + 1
      })
    })

    it('throw error', function() {
      try {
        window.trace.registerError(123)
        window.trace.registerError(function() {}, 123)
      } catch (e) {
        // todo
      }
    })
  })

  describe('# handle', function() {
    it('event', function() {
      window.trace.handle('log', 1)
      window.trace.handle('log', 2)
      try {
        window.trace.handle('err', 3)
      } catch (e) {
        expect(e.message).toEqual('unknown event')
      }

      expect(window.trace.logFlag).toEqual(3)
    })

    it('error', function() {
      window.trace.handle(new Error('400 error'))
      window.trace.handle(new Error('400 error'))
      window.trace.handle(new Error('401 error'))

      expect(window.trace.errFlag).toEqual(2)
    })
  })
})
