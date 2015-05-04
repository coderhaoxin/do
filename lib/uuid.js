'use strict';

// RFC 4122 v4 UUID
function uuid() {
  var length = 16;
  var hexDigits = '0123456789abcdef';
  var s = parseInt(String(Math.random()).slice(2))
    .toString('16').split('')
    .slice(0, length);

  s[length - 3] = hexDigits.substr((s[length - 3] & 0x3) | 0x8, 1);

  return s.join('');
}

export { uuid };
