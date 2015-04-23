(function() {
  'use strict';

  if (!window.trace) {
    window.trace = new Trace();
  }

  function Trace() {
    if (!(this instanceof Trace)) return new Trace();

    this.eventHandlers = {};
    this.errorHandlers = [];

    var self = this;

    window.onerror = function(message, url, line, column, error) {
      message = message || 'unknown error';

      if (!(error instanceof Error)) {
        error = new Error(message);
      }

      if (url) error.url = url;
      if (line) error.line = line;
      if (column) error.column = column;

      self.handleError(error);
    };
  }

  /**
   * @param {Error|event} e
   * @param {Object} data
   */
  Trace.prototype.handle = function(e, data) {
    if (e instanceof Error) {
      return this.handleError(e);
    }

    this.handleEvent(e, data);
  };

  Trace.prototype.handleError = function(error) {
    for (var i = 0; i < this.errorHandlers.length; i++) {
      var handler = this.errorHandlers[i];

      if (handler.filter.call(this, error)) {
        handler.handler.call(this, error);
      }
    }
  };

  Trace.prototype.handleEvent = function(name, data) {
    if (this.eventHandlers[name]) {
      return this.eventHandlers[name].call(this, data);
    }

    throw new Error('unknown event');
  };

  Trace.prototype.registerEvent = function(name, handler) {
    checkType(name, 'string');
    checkType(handler, 'function');

    this.eventHandlers[name] = handler;
  };

  Trace.prototype.registerError = function(filter, handler) {
    checkType(handler, 'function');
    checkType(handler, 'function');

    this.errorHandlers.push({
      filter: filter,
      handler: handler
    });
  };

  function checkType(param, type) {
    if (typeof param !== type) {
      throw new TypeError(type + 'required');
    }
  }
}());
