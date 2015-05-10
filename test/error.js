'use strict'

describe('# create error', function() {
  it('(string)', function() {
    var err = window.createError('invalid param')
    expect(err.message).toBe('invalid param')
  })

  it('(number)', function() {
    var err = window.createError(401)
    expect(err.status).toBe(401)
  })

  it('(number, string)', function() {
    var err = window.createError(401, 'not signin')
    expect(err.status).toBe(401)
    expect(err.message).toBe('not signin')
  })

  it('(string, number)', function() {
    var err = window.createError('not signin', 401)
    expect(err.status).toBe(401)
    expect(err.message).toBe('not signin')
  })

  it('(error)', function() {
    var err = window.createError(new Error('invalid param'))
    expect(err.message).toBe('invalid param')
  })

  it('(error, message)', function() {
    var err = window.createError(new Error('invalid param'), 'invalid param: email')
    expect(err.message).toBe('invalid param: email')
  })

  it('(error, props)', function() {
    var err = window.createError(new Error('invalid param'), {
      status: 400,
      code: 'invalid_param'
    })
    expect(err.message).toBe('invalid param')
    expect(err.status).toBe(400)
    expect(err.code).toBe('invalid_param')
  })
})
