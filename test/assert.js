'use strict'

describe('## assert', function() {
  describe('# assert', function() {
    it('ok', function() {
      window.assert(true)
    })

    it('throw', function() {
      try {
        window.assert(false, 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })
  })

  describe('# equal', function() {
    it('ok', function() {
      window.assert.equal(1, 1)
    })

    it('throw', function() {
      try {
        window.assert.equal(1, '1', 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })
  })

  describe('# isError', function() {
    it('ok', function() {
      window.assert.isError(new Error('is error'))
    })

    it('false', function() {
      try {
        window.assert.isError('not error', 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })
  })

  describe('# deepEqual', function() {
    it('ok - number', function() {
      window.assert.deepEqual(1, 1)
    })

    it('ok - string', function() {
      window.assert.deepEqual('1', '1')
    })

    it('ok - date', function() {
      var d = new Date()
      window.assert.deepEqual(d, d)
    })

    it('ok - regexp', function() {
      var e = /^foo(bar)?$/
      window.assert.deepEqual(e, e)
    })

    it('ok - array', function() {
      window.assert.deepEqual([1, 2, 3], [1, 2, 3])
    })

    it('ok - object', function() {
      window.assert.deepEqual([1, 2, 3], [1, 2, 3])
    })

    it('ok - object, array', function() {
      window.assert.deepEqual([{
          name: 'test'
        },
        2, 3
      ], [{
          name: 'test'
        },
        2, 3
      ])
      window.assert.deepEqual({
        name: 'test',
        keys: [1, 2, 3]
      }, {
        name: 'test',
        keys: [1, 2, 3]
      })
    })

    it('throw - number', function() {
      try {
        window.assert.deepEqual(1, 2, 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })

    it('throw - string', function() {
      try {
        window.assert.deepEqual('1', '2', 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })

    it('throw - date', function() {
      try {
        window.assert.deepEqual(new Date(), new Date(123456), 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })

    it('throw - regexp', function() {
      try {
        window.assert.deepEqual(/^foo(bar)?$/, /^bar(foo)?$/, 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })

    it('throw - object, array', function() {
      try {
        window.assert.deepEqual({
          name: 'test',
          keys: [1, 2, 3]
        }, {
          name: 'test',
          keys: [1, 2, 3, 4]
        }, 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })
  })

  describe('# notDeepEqual', function() {
    it('ok', function() {
      window.assert.notDeepEqual({
        name: 'test',
        keys: [1, 2, 3]
      }, {
        name: 'test',
        keys: [1, 2, 3, 4]
      })
    })

    it('throw', function() {
      try {
        window.assert.notDeepEqual({
          name: 'test',
          keys: [1, 2, 3]
        }, {
          name: 'test',
          keys: [1, 2, 3]
        }, 'should throw')
        throwError()
      } catch (e) {
        expect(e.message).toEqual('should throw')
      }
    })
  })
})

function throwError() {
  throw new Error('invalid')
}
