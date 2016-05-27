'use strict';

var utils = {};

/** @const {number} */
const PRECISION = 3;

class XRegExp {
  /**
   * @param {!Array.<!(RegExp|string)>} res .
   * @return {!RegExp} .
   */
  static create(...res) {
    var re = '^(?:' + res.map(r => r.source ? r.source : r).join('') + ')';
    return new RegExp(re, 'i');
  }
}
utils.XRegExp = XRegExp;

/**
 * @param {number} value .
 * @param {number=} opt_precision .
 * @return {string} .
 */
utils.toDisplay = function(value, opt_precision) {
  var precision = opt_precision || PRECISION;

  if (Math.floor(value) === value) {
    return value;
  }

  return value.toFixed(precision)
      .replace(/0*$/, '')
      .replace(/\.$/, '');
};

exports.utils = utils;
