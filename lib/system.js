'use strict';

/** @enum */
const System = {
  METRIC: Symbol('METRIC'),
  IMPERIAL: Symbol('IMPERIAL')
};
System.DEFAULT = System.METRIC;

exports.System = System;
