'use strict'

import { Single, single, Once } from '../lib/worker'
import { dataURL2Blob, resize } from '../lib/image'
import { parse, stringify } from '../lib/qs'
import { resolve, join } from '../lib/url'
import MiniDebug from '../lib/debug-mini'
import * as strkit from '../lib/string'
import createError from '../lib/error'
import { toTop } from '../lib/fixed'
import { trace } from '../lib/trace'
import assert from '../lib/assert'
import cookie from '../lib/cookie'
import Debug from '../lib/debug'
import uuid from '../lib/uuid'

window.dataURL2Blob = dataURL2Blob
window.createError = createError
window.MiniDebug = MiniDebug
window.strkit = strkit
window.assert = assert
window.cookie = cookie
window.resize = resize
window.Single = Single
window.single = single
window.Debug = Debug
window.toTop = toTop
window.trace = trace
window.uuid = uuid
window.Once = Once

window.qs = {
  stringify: stringify,
  parse: parse
}
window.url = {
  resolve: resolve,
  join: join
}
