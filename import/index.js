'use strict'

import { parse, stringify } from '../lib/qs'
import { createError } from '../lib/error'
import { resolve, join } from '../lib/url'
import * as strkit from '../lib/string'
import { assert } from '../lib/assert'
import { cookie } from '../lib/cookie'
import { Debug } from '../lib/debug'
import { toTop } from '../lib/fixed'
import { trace } from '../lib/trace'
import { uuid } from '../lib/uuid'

window.createError = createError
window.strkit = strkit
window.assert = assert
window.cookie = cookie
window.Debug = Debug
window.toTop = toTop
window.trace = trace
window.uuid = uuid

window.qs = {
  stringify: stringify,
  parse: parse
}
window.url = {
  resolve: resolve,
  join: join
}
