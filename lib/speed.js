'use strict';
var utils = require('./utils').utils;
var Distance = require('./distance').Distance;
var System = require('./system').System;
var Time = require('./time').Time;
var XRegExp = utils.XRegExp;

const Format = {
  SPEED: Symbol('SPEED'),
  PACE: Symbol('PACE')
};

const DEFAULT_FORMAT = Format.PACE;

class Speed {
  constructor(
      metresPerSecond,
      opt_format,
      opt_distanceFormat,
      opt_timeFormat,
      opt_system) {
    this.metresPerSecond_ = metresPerSecond;
    this.format_ = opt_format || DEFAULT_FORMAT;
    this.distanceFormat_ = opt_distanceFormat || Distance.DEFAULT_FORMAT;
    this.timeFormat_ = opt_timeFormat || Time.DEFAULT_FORMAT;
    this.system_ = opt_system || Distance.DEFAULT_SYSTEM;
  }

  get metresPerSecond() {
    return this.metresPerSecond_;
  }

  get format() {
    return this.format_;
  }

  get distanceFormat() {
    return this.distanceFormat_;
  }

  get timeFormat() {
    return this.timeFormat_;
  }

  get system() {
    return this.system_;
  }

  toString(opt_format, opt_distanceFormat, opt_timeFormat, opt_system) {
    var format = opt_format || this.format_;
    var distanceFormat = opt_distanceFormat || this.distanceFormat_;
    var timeFormat = opt_timeFormat || this.timeFormat_;
    var system = opt_system || this.system_;
    // TODO always km/h,mph or 6:00/km, 5:00/mi. 4min/km,
  }

  // TODO(kjs): state
  static fromString(str, opt_state) {
    // kph,mph,m/s,y/min,hours/m

  }
}
Speed.Format = Format;
Speed.DEFAULT_FORMAT = DEFAULT_FORMAT;

exports.Speed = Speed;
