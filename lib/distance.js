'use strict';
var XRegExp = require('./xregexp').XRegExp;
var System = require('./system').System;

const DEFAULT_SYSTEM = System.METRIC;

const METRES_PER_MILE = 1609.344;
const METRES_PER_KILOMETRE = 1000;
const YARDS_PER_METRE = 1.09361;
const YARDS_PER_MILE = 1760;

const METRES_PER_MARATHON = 42194.988;
const EVENTS = new Map();

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
Distance.EVENTS = EVENTS;

exports.Distance = Distance;
