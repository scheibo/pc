'use strict';
var assert = require('assert');
var utils = require('./utils').utils;
var XRegExp = utils.XRegExp;

/** @const {number} */
const METRES_PER_MILE = 1609.344;
/** @const {number} */
const METRES_PER_KILOMETRE = 1000;
/** @const {number} */
const METRES_PER_YARD = 0.9144;
/** @const {number} */
const METRES_PER_MARATHON = 42194.988;

/** @type {!Map<number, !Event} */
const EVENTS = new Map();

/** @enum */
const Format = {
  SHORT: Symbol('SHORT'),
  LONG: Symbol('LONG')
};
Format.DEFAULT = Format.SHORT;

/** @enum */
const System = {
  METRIC: Symbol('METRIC'),
  IMPERIAL: Symbol('IMPERIAL')
};
System.DEFAULT = System.METRIC;

/** @const {!RegExp} */
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
  /**
   * @param {number} metres .
   * @param {!Format=} opt_format .
   * @param {!System=} opt_system .
   * @constructor
   */
  constructor(metres, opt_format, opt_system) {
    /** @private */
    this.metres_ = metres;
    /** @private */
    this.format_ = opt_format || Format.DEFAULT;
    /** @private */
    this.system_ = opt_system || System.DEFAULT;
  }

  /** @return {number} . */
  get metres() {
    return this.metres_;
  }

  /** @return {!Format} . */
  get format() {
    return this.format_;
  }

  /** @return {!System} . */
  get system() {
    return this.system_;
  }

  /**
   * @param {!Format=} opt_format .
   * @param {!System=} opt_system .
   * @return {string} .
   */
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
  /**
   * @param {string} str .
   * @param {!State=} opt_state .
   * @return {!Distance|undefined} .
   */
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

  /**
   * @param {string} units .
   * @return {string} .
   * @private
   */
  static format_(units) {
    return units.replace(/\W/g, '').length > 3 ? Format.LONG : Format.SHORT;
  }
}

class Event {
  /**
   * @param {string} name .
   * @param {number} metres .
   * @constructor
   */
  constructor(name, metres) {
    this.name_ = name;
    this.distance_ = new Distance(metres);
  }

  /** @return {string} . */
  get name() {
    return this.name_;
  }

  /** @return {!Distance} . */
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
Distance.System = System;
Distance.EVENTS = EVENTS;
Distance.MILE = METRES_PER_MILE;
Distance.MARATHON = METRES_PER_MARATHON;

exports.Distance = Distance;
