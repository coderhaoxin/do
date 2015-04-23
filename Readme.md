some small front-end libs

* [cookie](lib/cookie.js)
  - `cookie(key, value, options)`

* [querystring](lib/qs.js)
  - `qs.parse(str)`
  - `qs.stringify(obj)`
  - `qs.get(key)`

* [declaration](lib/declaration.js)
  - data-href: make it easy to use other tags as `a`

```html
<div data-href="/a/b/c.html"></div>
```

### debug

```js
debug('log ...');
debug({name: 'debug'}, {info: 'log ...'});
debug(new Error('error'));
```

### error

```js
var err1 = createError('invalid username', {
  code: 'invalid_param'
});

var err2 = createError(400, 'invalid username');

var err3 = createError('invalid username', 400);

var err4 = createError(new Error('invalid username'), {
  code: 'invalid_param'
});
```

### assert

```js
assert(1 === 1, message);
assert.equal(1, 1, message);
assert.isError(new Error('error'));
assert.deepEqual([1, 2], [1, 2], message);
assert.notDeepEqual({name: 'test'}, {name: 'hello'}, message);
```

### trace

* registerError(filter, handler)
* registerEvent(name, handler)

```js
trace.registerError(function(error) {
  if (error.status === 400) return true;
}, function(error) {
  // do something
});

trace.registerEvent('log', function(data) {
  // do something
});

trace.handle('log', {
  info: 'a bug'
});

trace.handle(new Error('oh, god'));
```

### License
MIT
