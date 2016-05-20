'use strict';

const Format = {
  COLONS: Symbol('COLONS'),
  LETTERS: Symbol('LETTERS'),
  WORDS: Symbol('WORDS'),
  QUOTES: Symbol('QUOTES')
};

const DEFAULT_FORMAT = Format.COLONS;

class Time {
  constructor(seconds, opt_format) {
    this.seconds_ = seconds;
    this.format_ = opt_format || DEFAULT_FORMAT;
  }

  get seconds() {
    return this.seconds_;
  }

  get format() {
    return this.format_;
  }

  toString(opt_format) {
    var format = opt_format || this.format_;
    return '';
  }

  static fromString(str, opt_state) {
    return new Time(0);
  }
}

exports.Time = Time;
exports.Time.Format = Format;
