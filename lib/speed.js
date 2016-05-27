'use strict';
var utils = require('./utils').utils;
var Distance = require('./distance').Distance;
var System = require('./system').System;
var Time = require('./time').Time;
var XRegExp = utils.XRegExp;

/** @enum */
const Format = {
  PACE: Symbol('PACE'),
  SPEED: Symbol('SPEED'),
  QUARTER: Symbol('QUARTER')
};
Format.DEFAULT = Format.PACE;

class Speed {
  /**
   * @param {number} metresPerSecond .
   * @param {!Format=} opt_format .
   * @param {!Distance.Format=} opt_distanceFormat .
   * @param {!Time.Format=} opt_timeFormat .
   * @param {!System=} opt_system .
   * @constructor
   */
  constructor(
      metresPerSecond,
      opt_format,
      opt_distanceFormat,
      opt_timeFormat,
      opt_system) {
    /** @private */
    this.metresPerSecond_ = metresPerSecond;
    /** @private */
    this.format_ = opt_format || Format.DEFAULT;
    /** @private */
    this.distanceFormat_ = opt_distanceFormat || Distance.Format.DEFAULT;
    /** @private */
    this.timeFormat_ = opt_timeFormat || Time.Format.DEFAULT;
    /** @private */
    this.system_ = opt_system || System.DEFAULT;
  }

  /** @return {number} . */
  get metresPerSecond() {
    return this.metresPerSecond_;
  }

  /** @return {!Format} . */
  get format() {
    return this.format_;
  }

  /** @return {!Distance.Format} . */
  get distanceFormat() {
    return this.distanceFormat_;
  }

  /** @return {!Time.Format} . */
  get timeFormat() {
    return this.timeFormat_;
  }

  /** @return {!System} . */
  get system() {
    return this.system_;
  }

  /**
   * @param {!Format=} opt_format .
   * @param {!Distance.Format=} opt_distanceFormat .
   * @param {!Time.Format=} opt_timeFormat .
   * @param {!System=} opt_system .
   * @return {string} .
   */
  toString(opt_format, opt_distanceFormat, opt_timeFormat, opt_system) {
    var format = opt_format || this.format_;
    var distanceFormat = opt_distanceFormat || this.distanceFormat_;
    var timeFormat = opt_timeFormat || this.timeFormat_;
    var system = opt_system || this.system_;
    // TODO always km/h,mph or 6:00/km, 5:00/mi. 4min/km,
    return '';
  }

  // TODO(kjs): state
  /**
   * @param {string} str .
   * @param {!State=} opt_state .
   * @return {!Speed|undefined} .
   */
  static fromString(str, opt_state) {
    // kph,mph,m/s,y/min,hours/m
    return undefined;
  }
}
Speed.Format = Format;

exports.Speed = Speed;
