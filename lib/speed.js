'use strict';
var utils = require('./utils').utils;
var Distance = require('./distance').Distance;
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
   * @param {!Distance.System=} opt_distanceSystem_ .
   * @constructor
   */
  constructor(
      metresPerSecond,
      opt_format,
      opt_distanceFormat,
      opt_timeFormat,
      opt_distanceSystem_) {
    /** @private */
    this.metresPerSecond_ = metresPerSecond;
    /** @private */
    this.format_ = opt_format || Format.DEFAULT;
    /** @private */
    this.distanceFormat_ = opt_distanceFormat || Distance.Format.DEFAULT;
    /** @private */
    this.timeFormat_ = opt_timeFormat || Time.Format.DEFAULT;
    /** @private */
    this.distanceSystem_ = opt_distanceSystem_ || Distance.System.DEFAULT;
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

  /** @return {!Distance.System} . */
  get distanceSystem() {
    return this.distanceSystem_;
  }

  /**
   * @param {!Format=} opt_format .
   * @param {!Distance.Format=} opt_distanceFormat .
   * @param {!Time.Format=} opt_timeFormat .
   * @param {!Distance.System=} opt_distanceSystem_ .
   * @return {string} .
   */
  toString(
      opt_format, opt_distanceFormat, opt_timeFormat, opt_distanceSystem_) {
    var format = opt_format || this.format_;
    var distanceFormat = opt_distanceFormat || this.distanceFormat_;
    var timeFormat = opt_timeFormat || this.timeFormat_;
    var distanceSystem = opt_distanceSystem_ || this.distanceSystem_;
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
