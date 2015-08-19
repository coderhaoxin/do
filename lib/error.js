'use strict'

function createError() {
  // different to server error: status not confined to HTTP statusCode
  let error, status, message
  let props = {}

  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]

    if (arg instanceof Error) {
      error = arg
      continue
    }

    switch (typeof arg) {
      case 'string':
        message = arg
        break
      case 'number':
        status = arg
        break
      case 'object':
        props = arg
        break
    }
  }

  if (!error) {
    error = new Error(message || '')
    Error.captureStackTrace(error, createError)
  }

  for (let k in props) {
    error[k] = props[k]
  }

  if (status) error.status = status
  if (message) error.message = message

  return error
}

/**
 * export
 */

export default createError
