'use strict'

describe('# uuid', function() {
  it('success', function() {
    let uuids = []

    for (let i = 0; i < 10000; i++) {
      let u = window.uuid()
      if (uuids.indexOf(u) !== -1) {
        throw new Error('uuid not unique')
      }
      uuids.push(u)
    }
  })
})
