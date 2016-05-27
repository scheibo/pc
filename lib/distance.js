'use strict';
var assert = require('assert');
var utils = require('./utils').utils;
var System = require('./system').System;
var XRegExp = utils.XRegExp;

const METRES_PER_MILE = 1609.344;
const METRES_PER_KILOMETRE = 1000;
const METRES_PER_YARD = 0.9144;

const METRES_PER_MARATHON = 42194.988;
const EVENTS = new Map();

const Format = {
  SHORT: Symbol('SHORT'),
  LONG: Symbol('LONG')
};

const DEFAULT_FORMAT = Format.SHORT;
const DEFAULT_SYSTEM = System.METRIC;

const REGEXP = XRegExp.create(
    /(\s*half(?:\s+marathon\s*)?)|/, /* 1 */
    /(\s*marathon\s*)|/, /* 2 */
    /\s*((?:\d|,)+(?:\.\d+)?)\s*/, /* 3 */
    '(?:',
      /(k(?:m|(?:ilo(?:met(?:re|er))?))?)|/, /* 4 */
      /(y(?:(?:ar)?d)?)|/, /* 5 */
      /(mi(?:\.?|le)?)|/, /* 6 */
      /(m(?:et(?:re|er))?)/, /* 7 */
    ')',
    /\s*(?:'?s)?\s*/
);

class Distance {
  constructor(metres, opt_format, opt_system) {
    this.metres_ = metres;
    this.format_ = opt_format || DEFAULT_FORMAT;
    this.system_ = opt_system || DEFAULT_SYSTEM;
  }

  get metres() {
    return this.metres_;
  }

  get system() {
    return this.system_;
  }

  get format() {
    return this.format_;
  }

  toString(opt_format, opt_system) {
    var e = EVENTS.get(this.metres_);
    if (e) {
      return e.name;
    }

    var format = opt_format || this.format_;
    var system = opt_system || this.system_;

    var value;
    var units;
    if (system === System.IMPERIAL) {
      if (this.metres_ < METRES_PER_MILE) {
        value = this.metres_ / METRES_PER_YARD;
        units = format === Format.SHORT ? 'y' : ' yard';
      } else {
        value = this.metres_ / METRES_PER_MILE;
        units = format === Format.SHORT ? 'mi' : ' mile';
      }
    } else {
      if (this.metres_ < METRES_PER_KILOMETRE) {
        value = this.metres_;
        units = format === Format.SHORT ? 'm' : ' metre';
      } else {
        value = this.metres_ / METRES_PER_KILOMETRE;
        units = format === Format.SHORT ? 'km' : ' kilometre';
      }
    }

    value = utils.toDisplay(value);
    units = (format === Format.LONG && parseFloat(value) !== 1 ?
        units + 's' : units);
    return value + units;
  }

  // TODO(kjs): state
  static fromString(str, opt_state) {
    var match = str.match(REGEXP);
    if (!match || !match[0]) {
      return undefined;
    }

    if (match[1]) {
      return new Distance(METRES_PER_MARATHON / 2);
    } else if (match[2]) {
      return new Distance(METRES_PER_MARATHON);
    }

    assert(match[3]);
    var number = parseFloat(match[3]);
    if (match[4]) {
      return new Distance(number * METRES_PER_KILOMETRE,
                          Distance.format_(match[4]),
                          System.METRIC);
    } else if (match[5]) {
      return new Distance(number * METRES_PER_YARD,
                          Distance.format_(match[5]),
                          System.IMPERIAL);
    } else if (match[6]) {
      return new Distance(number * METRES_PER_MILE,
                          Distance.format_(match[6]),
                          System.IMPERIAL);
    }

    assert(match[7]);
    return new Distance(number,
                        Distance.format_(match[7]),
                        System.METRIC);
  }

  static format_(units) {
    return units.replace(/\W/g, '').length > 3 ? Format.LONG : Format.SHORT;
  }
}

class Event {
  constructor(name, metres) {
    this.name_ = name;
    this.distance_ = new Distance(metres);
  }

  get name() {
    return this.name_;
  }

  get distance() {
    return this.distance_;
  }
}

EVENTS.set(100, new Event('100m', 100));
EVENTS.set(200, new Event('200m', 200));
EVENTS.set(400, new Event('400m', 400));
EVENTS.set(800, new Event('800m', 800));
EVENTS.set(1500, new Event('1500m', 1500));
EVENTS.set(METRES_PER_MILE, new Event('Mile', METRES_PER_MILE));
EVENTS.set(3000, new Event('3000m', 3000));
EVENTS.set(2 * METRES_PER_MILE, new Event('2 mile', 2 * METRES_PER_MILE));
EVENTS.set(5000, new Event('5000m', 5000));
EVENTS.set(5 * METRES_PER_MILE, new Event('5 mile', 5 * METRES_PER_MILE));
EVENTS.set(10000, new Event('10,000m', 10000));
EVENTS.set(10 * METRES_PER_MILE, new Event('10 mile', 10 * METRES_PER_MILE));
EVENTS.set(METRES_PER_MARATHON / 2,
           new Event('Half Marathon', METRES_PER_MARATHON / 2));
EVENTS.set(METRES_PER_MARATHON, new Event('Marathon', METRES_PER_MARATHON));

Distance.Format = Format;
Distance.EVENTS = EVENTS;
Distance.DEFAULT_FORMAT = DEFAULT_FORMAT;
Distance.DEFAULT_SYSTEM = DEFAULT_SYSTEM;

exports.Distance = Distance;
