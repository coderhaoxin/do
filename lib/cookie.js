'use strict';

function cookie(name, value, options) {
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
}

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (!value) options.maxage = -1;

  var maxage = options.maxage || options.maxAge;
  if (maxage) str += '; Max-Age=' + maxage;
  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

function all() {
  return parse(document.cookie);
}

function get(name) {
  return all()[name];
}

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' === pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

function encode(value) {
  try {
    return encodeURIComponent(value);
  } catch (e) {}
}

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {}
}

export { cookie };
