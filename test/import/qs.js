'use strict';

import { parse, stringify } from '../../lib/qs';

window.qs = {
  stringify: stringify,
  parse: parse
};
