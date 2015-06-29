'use strict'

describe('# create error', function() {
  it('(string)', function() {
    let err = window.createError('invalid param')
    expect(err.message).toEqual('invalid param')
  })

  it('(number)', function() {
    let err = window.createError(401)
    expect(err.status).toEqual(401)
  })

  it('(number, string)', function() {
    let err = window.createError(401, 'not signin')
    expect(err.status).toEqual(401)
    expect(err.message).toEqual('not signin')
  })

  it('(string, number)', function() {
    let err = window.createError('not signin', 401)
    expect(err.status).toEqual(401)
    expect(err.message).toEqual('not signin')
  })

  it('(error)', function() {
    let err = window.createError(new Error('invalid param'))
    expect(err.message).toEqual('invalid param')
  })

  it('(error, message)', function() {
    let err = window.createError(new Error('invalid param'), 'invalid param: email')
    expect(err.message).toEqual('invalid param: email')
  })

  it('(error, props)', function() {
    let err = window.createError(new Error('invalid param'), {
      status: 400,
      code: 'invalid_param'
    })
    expect(err.message).toEqual('invalid param')
    expect(err.status).toEqual(400)
    expect(err.code).toEqual('invalid_param')
  })
})
