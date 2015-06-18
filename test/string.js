'use strict'

describe('## string', function() {
  describe('# removeTag', function() {
    it('success', function() {
      let html = '<span>hello <a>world</a></span><me>'
      expect(window.strkit.removeTag(html)).toEqual('hello world')
    })
  })

  describe('# tagWord', function() {
    it('success', function() {
      let text = 'hello, my name is go'
      expect(window.strkit.tagWord(text, ['name', 'go'], 'a')).toEqual('hello, my <a>name</a> is <a>go</a>')
    })

    it('success', function() {
      let text = 'hello, my name is go'
      expect(window.strkit.tagWord(text, 'name', 'a')).toEqual('hello, my <a>name</a> is go')
    })
  })
})
