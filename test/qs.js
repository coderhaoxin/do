'use strict';

describe('## qs', function() {
  let o = {
      name: 'hello',
      word: 'world',
    },
    s = 'name=hello&word=world';

  describe('# parse', function() {
    it('success', function() {
      let obj = window.qs.parse(s);
      expect(obj).toEqual(o);
    });

    it('not string', function() {
      let obj = window.qs.parse(null);
      expect(obj).toEqual({});
    });

    it('parse ""', function() {
      let obj = window.qs.parse('');
      expect(obj).toEqual({});
    });

    it('parse "?"', function() {
      let obj = window.qs.parse('?');
      expect(obj).toEqual({});
    });

    it('ignore ""', function() {
      let str = 'name=hello&word=world&ignore=';
      let obj = window.qs.parse(str);
      expect(obj).toEqual(o);
    });

    it('success', function() {
      let str = 'name=hello&word=world&name=hello2&name=hello3';
      let obj = window.qs.parse(str);
      expect(obj).toEqual({
        name: ['hello', 'hello2', 'hello3'],
        word: 'world'
      });
    });
  });

  describe('# stringify', function() {
    it('success', function() {
      let str = window.qs.stringify(o);
      expect(str).toEqual(s);
    });

    it('not object', function() {
      let str = window.qs.stringify('');
      expect(str).toEqual('');
    });

    it('ignore null', function() {
      o.ignore = null;
      let str = window.qs.stringify(o);
      expect(str).toEqual(s);
    });

    it('array', function() {
      o.arr = ['a', 'b'];
      let str = window.qs.stringify(o);
      // &arr[0]=a&arr[1]=b
      expect(str).toEqual(s + '&arr%5B0%5D=a&arr%5B1%5D=b');
    });
  });
});
