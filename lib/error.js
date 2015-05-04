'use strict';

function createError() {
  // different to server error: status not confined to HTTP statusCode
  var error, status, message, props = {};

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];

    if (arg instanceof Error) {
      error = arg;
      continue;
    }

    switch (typeof arg) {
      case 'string':
        message = arg;
        break;
      case 'number':
        status = arg;
        break;
      case 'object':
        props = arg;
        break;
    }
  }

  if (!error) {
    error = new Error(message || '');
    Error.captureStackTrace(error, createError);
  }

  for (var k in props) {
    error[k] = props[k];
  }

  if (status) error.status = status;
  if (message) error.message = message;

  return error;
}

export { createError };
