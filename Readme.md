some small front-end libs

* [cookie](lib/cookie.js)
  - `cookie(key, value, options)`

* [querystring](lib/qs.js)
  - `qs.parse(str)`
  - `qs.stringify(obj)`

* [declaration](lib/declaration.js)
  - data-href: make it easy to use other tags as `a`

```html
<div data-href="/a/b/c.html"></div>
```

### debug

* enable `debug` mode

  - set `window.DEBUG = true`
  - or add querystring `debug=true`

```js
debug('log ...')
debug({name: 'debug'}, {info: 'log ...'})
debug(new Error('error'))
```

### error

```js
let err1 = createError('invalid username', {
  code: 'invalid_param'
})

let err2 = createError(400, 'invalid username')

let err3 = createError('invalid username', 400)

let err4 = createError(new Error('invalid username'), {
  code: 'invalid_param'
})
```

### assert

```js
assert(1 === 1, message)
assert.equal(1, 1, message)
assert.isError(new Error('error'))
assert.deepEqual([1, 2], [1, 2], message)
assert.notDeepEqual({name: 'test'}, {name: 'hello'}, message)
```

### trace

* registerError(filter, handler)
* registerEvent(name, handler)

```js
trace.registerError(function(error) {
  if (error.status === 400) return true
}, function(error) {
  // do something
})

trace.registerEvent('log', function(data) {
  // do something
})

trace.handle('log', {
  info: 'a bug'
})

trace.handle(new Error('oh, god'))
```

### uuid

```js
let u = uuid()
```

### License
MIT
