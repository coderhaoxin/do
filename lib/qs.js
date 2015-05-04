'use strict';

var encode = encodeURIComponent;
var decode = decodeURIComponent;

function parse(str) {
  if (typeof str !== 'string') return {};

  str = str.trim();
  if ('' === str) return {};
  if ('?' === str.charAt(0)) str = str.slice(1);

  var obj = {};
  var key, value, parts;
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    parts = pairs[i].split('=');
    key = decode(parts[0]);
    value = decode(parts[1]);

    if (key && value) {
      if (obj[key]) {
        obj[key] = Array.isArray(obj[key]) ? obj[key].concat(value) : [obj[key], value];
      } else {
        obj[key] = value;
      }
    }
  }

  return obj;
}

function stringify(obj) {
  if (typeof obj !== 'object') return '';

  var pairs = [];
  var key, value;

  for (key in obj) {
    value = obj[key];

    if (!value) continue;

    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
}

export { parse, stringify };
