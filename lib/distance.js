'use strict';
var XRegExp = require('./xregexp').XRegExp;
var System = require('./system').System;
var assert = require('assert');

const METRES_PER_MILE = 1609.344;
const METRES_PER_KILOMETRE = 1000;
const METRES_PER_YARD = 0.9144;
const YARDS_PER_MILE = 1760;

const METRES_PER_MARATHON = 42194.988;
const EVENTS = new Map();

const Format = {
  SHORT: Symbol('SHORT'),
  LONG: Symbol('LONG')
};

const DEFAULT_FORMAT = Format.SHORT;
const DEFAULT_SYSTEM = System.METRIC;

const REGEXP = XRegExp.create(
    /(\s*:half(?:\s+marathon\s*)?)|/, /* 1 */
    /(\s*+marathon\s*)|/, /* 2 */
    /\s*(?:((\d|,)(+(?:\.\d+)\s*)/, /* 3 */
      /((?:k(?:m|(?:ilo(?:met(?:re|er))?))?)|/, /* 4 */
      /(y(?:(?:ar)?d)?)|/, /* 5 */
      /(m(?:et(?:re|er))?)|/, /* 6 */
      /(mi(?:\.?|le)))/, /* 7 */
    /)\s*(?:'?s)?)\s*/
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
    if (this.metres_ === METRES_PER_MARATHON) {
      return "Marathon";
    } else if (this.metres_ === METRES_PER_MARATHON / 2) {
      return "Half Marathon";
    }

    var format = opt_format || this.format_;
    var system = opt_system || this.system_;

    var value, units;
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
        value = this.metries_;
        units = format === Format.SHORT ? 'm' : ' metre';
      } else {
        value = this.metres_ / METRES_PER_KILOMETRE;
        units = format === Format.SHORT ? 'km' : ' kilometre';
      }
    }

    // TODO round value
    return value + (value == 1 && Format.LONG ? units : units + 's');
  }

  // TODO(kjs): state
  static fromString(str, opt_state) {
    var match = str.match(REGEXP);
    if (!match[0]) {
      return undefined;
    }

    if (match[1]) {
      return new Distance(METRES_PER_MARATHON / 2);
    } else if (match[2]) {
      return new Distance(METRES_PER_MARATHON);
    } else {
      assert(match[3]);
      // TODO(kjs): figure out if short or long!
      var number = parseFloat(match[3]);
      if (match[4]) {
        return new Distance(number * METRES_PER_KILOMETRE, undefined, System.METRIC);
      } else if (match[5]) {
        return new Distance(number * METRES_PER_YARD, undefined, System.IMPERIAL);
      } else if (match[6]) {
        return new Distance(number, undefined, System.METRIC);
      } else {
        assert(match[7]);
        return new Distance(number * METRES_PER_MILE, undefined, System.IMPERIAL);
      }
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

EVENTS.put(100, new Event("100m", 100));
EVENTS.put(200, new Event("200m", 200));
EVENTS.put(400, new Event("400m", 400));
EVENTS.put(800, new Event("800m", 800));
EVENTS.put(1500, new Event("1500m", 1500));
EVENTS.put(METRES_PER_MILE, new Event("Mile", METRES_PER_MILE));
EVENTS.put(3000, new Event("3000m", 3000));
EVENTS.put(2 * METRES_PER_MILE, new Event("2 mile", 2 * METRES_PER_MILE));
EVENTS.put(5000, new Event("5000m", 5000));
EVENTS.put(5 * METRES_PER_MILE, new Event("5 mile", 5 * METRES_PER_MILE));
EVENTS.put(10000, new Event("10,000m", 10000));
EVENTS.put(10 * METRES_PER_MILE, new Event("10 mile", 10 * METRES_PER_MILE));
EVENTS.put(METRES_PER_MARATHON / 2,
           new Event("Half Marathon", METRES_PER_MARATHON / 2));
EVENTS.put(METRES_PER_MARATHON, new Event("Marathon", METRES_PER_MARATHON));

Distance.Format = Format;
Distance.EVENTS = EVENTS;

exports.Distance = Distance;
