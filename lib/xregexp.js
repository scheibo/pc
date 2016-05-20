'use strict';

class XRegExp {
  static create(...res) {
    return new RegExp(res.map(r => r.source).join(''));
  }
}

exports.XRegExp = XRegExp;
