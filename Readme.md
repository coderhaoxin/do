## some small front-end libs

### assert

```js
assert(1 === 1, message)
assert.equal(1, 1, message)
assert.isError(new Error('error'))
assert.deepEqual([1, 2], [1, 2], message)
assert.notDeepEqual({name: 'test'}, {name: 'hello'}, message)
```

### cookie

* [cookie](lib/cookie.js)
  - `cookie(key, value, options)`

### debug

* enable `debug` mode

  - add querystring `debug=console` or `debug=alert`

```js
debug('log ...')
debug({name: 'debug'}, {info: 'log ...'})
debug(new Error('error'))
debug('data: %o', {name: 'debug'}, {info: 'log ...'})
```

### declaration

* [declaration](lib/declaration.js)
  - data-href: make it easy to use other tags as `a`

```html
<div data-href="/a/b/c.html"></div>
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

### fixed

* [fixed](lib/fixed.js)

```js
let bar = document.querySelector('#bar')
toTop(bar)
```

### qs

* [querystring](lib/qs.js)
  - `qs.parse(str)`
  - `qs.stringify(obj)`

### scroll

```
toTop(1000) // scroll to top (1000ms)
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
