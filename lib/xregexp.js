'use strict';

class XRegExp {
  static create(...res) {
    var re = '^(?:' + res.map(r => r.source ? r.source : r).join('') + ')';
    return new RegExp(re, 'i');
  }
}

exports.XRegExp = XRegExp;
