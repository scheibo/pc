'use strict';
var XRegExp = require('./xregexp').XRegExp;
var System = require('./system').System;

const METRES_PER_MILE = 1609.344;
const METRES_PER_KILOMETRE = 1000;
const YARDS_PER_METRE = 1.09361;
const YARDS_PER_MILE = 1760;

const DEFAULT_SYSTEM = System.METRIC;

class Distance {
  constructor(metres, opt_system) {
    this.metres_ = metres;
    this.system_ = opt_system || DEFAULT_SYSTEM;
  }

  get metres() {
    return this.metres_;
  }

  get system() {
    return this.system_;
  }

  toString(opt_system) {
    var system = opt_system || this.system_;
  }

  // TODO(kjs): state
  static fromString(str, opt_state) {
  }
}

exports.Distance = Distance;
