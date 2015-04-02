'use strict';

describe('## cookie', function() {
  describe('# cookie(name, value)', function() {
    it('should set a cookie', function() {
      let cookie = window.cookie;
      cookie('name', 'tobi');
      expect(cookie('name')).toEqual('tobi');

      cookie('species', 'ferret');
      expect(cookie('species')).toEqual('ferret');
    });

    it('should escape', function() {
      window.cookie('name', 'tobi ferret');
      expect(document.cookie.includes('name=tobi%20ferret')).toEqual(true);
    });

    it('should unescape', function() {
      window.cookie('full name', 'tobi ferret');
      expect(window.cookie('full name')).toEqual('tobi ferret');
    });

    it('should ignore URIError', function() {
      let cookie = window.cookie;
      cookie('bad', '%');
      cookie('bad', null);
      expect(cookie('bad')).toEqual(undefined);
    });

    describe('when undefined', function() {
      it('should return undefined', function() {
        expect(window.cookie('whatever')).toEqual(undefined);
      });
    });
  });

  describe('# cookie(name, null)', function() {
    it('should clear the cookie', function() {
      let cookie = window.cookie;
      cookie('type', 'ferret');
      cookie('type', null);
      expect(cookie('type')).toEqual(undefined);
    });

    it('should not be returned in the cookie() object', function() {
      let cookie = window.cookie;
      cookie('full name', null);
      cookie('mydb', null);
      cookie('species', null);
      cookie('name', '0');
      let obj = cookie();
      expect(Object.keys(obj).length).toEqual(1);
      expect(obj.name).toEqual('0');
    });

    it('should ignore URIError and return null', function() {
      document.cookie = 'bad=%';
      expect(window.cookie('bad')).toEqual(undefined);
    });
  });

  describe('# cookie()', function() {
    it('should return all cookies', function() {
      let cookie = window.cookie;
      cookie('name', 'loki');
      cookie('species', 'ferret');
      let obj = cookie();
      expect(obj.name).toEqual('loki');
      expect(obj.species).toEqual('ferret');
    });

    it('should return all cookies and ignore URIErrors', function() {
      let cookie = window.cookie;
      cookie('name', 'loki');
      cookie('species', 'ferret');
      document.cookie = 'bad=%';
      var obj = cookie();
      expect(obj.name).toEqual('loki');
      expect(obj.species).toEqual('ferret');
      expect(obj.bad).toEqual(undefined);
    });
  });
});
