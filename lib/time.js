'use strict';

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;

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

    var hours = parseInt(this.seconds_ / SECONDS_PER_HOUR, 10);
    var minutes =
        parseInt(this.seconds_ / MINUTES_PER_HOUR, 10) % SECONDS_PER_MINUTE;
    var seconds = this.seconds_ % SECONDS_PER_MINUTE;
    var displaySeconds = Math.floor(seconds) === seconds ?
        seconds : seconds.toFixed(3).replace(/0*$/, '');

    var result;
    switch (format) {
      case Format.COLONS:
        if (hours > 0) {
          result = hours + ':';
          result += ((minutes < 10) ? '0' + minutes : minutes) + ':';
          result += ((seconds < 10) ? '0' + displaySeconds : displaySeconds);
        } else if (minutes > 0) {
          result = minutes + ':';
          result += ((seconds < 10) ? '0' + displaySeconds : displaySeconds);
        } else {
          result = '00:' +
              ((seconds < 10) ? '0' + displaySeconds : displaySeconds);
        }
        return result;
      case Format.LETTERS:
        result = '';
        if (hours > 0) {
          result += hours + 'h';
        }
        if (minutes > 0) {
          result += minutes + 'm';
        }
        if (seconds > 0) {
          result += displaySeconds + 's';
        }
        return result;
      case Format.WORDS:
        result = [];
        if (hours > 0) {
          result.push(hours + 'hrs');
        }
        if (minutes > 0) {
          result.push(minutes + 'mins');
        }
        if (seconds > 0) {
          result.push(displaySeconds + 'secs');
        }
        return result.join(' ');
      case Format.QUOTES:
        minutes += hours * MINUTES_PER_HOUR;
        result = '';
        if (minutes > 0) {
          result += minutes + '\'';
        }
        if (seconds > 0) {
          result += displaySeconds + '"';
        }
        return result;
      default:
        return undefined;
    }
  }

  static fromString(str, opt_state) {
    return new Time(0);
  }
}

exports.Time = Time;
exports.Time.Format = Format;
