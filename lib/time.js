'use strict';
var XRegExp = require('./xregexp').XRegExp;

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

const MATCHER = new Map();
MATCHER.set(Format.COLONS, XRegExp.create(
    /^(\s*\d+\s*)?/,
    /(?::(\s*\d+\s*))?/,
    /:(\s*\d+(?:\.\d{1,3})?\s*)?/
));
MATCHER.set(Format.LETTERS, XRegExp.create(
    /^(\s*\d+\s*h\s*)?/,
    /(\s*\d+\s*m\s*)?/,
    /(\s*\d+(?:\.\d{1,3})?\s*s\s*)?/
));
MATCHER.set(Format.WORDS, XRegExp.create(
    /^(\s*\d+\s*(?:h(?:ou)?r'?s?)\s*)?/,
    /(?:\s*(?:and|,)\s*)?/,
    /(\s*\d+\s*(?:min(?:ute)?'?s?)\s*)?/,
    /(?:\s*(?:and|,)\s*)?/,
    /(\s*\d+(?:\.\d{1,3})?\s*(?:sec(?:ond)?'?s?)\s*)?/
));
MATCHER.set(Format.QUOTES, XRegExp.create(
    /^(\s*\d+\s*'\s*)?/,
    /(\s*\d+(?:\.\d{1,3})?\s*"\s*)?/
));

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

  // TODO(kjs): state
  static fromString(str, opt_state) {
    var match;
    if ((match = str.match(MATCHER.get(Format.WORDS))) && match[0]) {
      return Time.create_(parseInt(match[1], 10),
                     parseInt(match[2], 10),
                     parseFloat(match[3]),
                     Format.WORDS);
    } else if ((match = str.match(MATCHER.get(Format.COLONS))) && match[0]) {
      // Default to MM:SS if only one colon.
      if (match[2] === undefined) {
        return Time.create_(undefined /* hours */,
                     parseInt(match[1], 10),
                     parseFloat(match[3]),
                     Format.COLONS);
      }
      return Time.create_(parseInt(match[1], 10),
                       parseInt(match[2], 10),
                       parseFloat(match[3]),
                       Format.COLONS);
    } else if ((match = str.match(MATCHER.get(Format.LETTERS))) && match[0]) {
      return Time.create_(parseInt(match[1], 10),
                     parseInt(match[2], 10),
                     parseFloat(match[3]),
                     Format.LETTERS);
    } else if ((match = str.match(MATCHER.get(Format.QUOTES))) && match[0]) {
      return Time.create_(undefined /* hours */,
                     parseInt(match[1], 10),
                     parseFloat(match[2]),
                     Format.QUOTES);
    }

    return undefined;
  }

  static create_(opt_hours, opt_minutes, opt_seconds, opt_format) {
    return new Time((opt_hours || 0) * SECONDS_PER_HOUR +
                    (opt_minutes || 0) * SECONDS_PER_MINUTE +
                    (opt_seconds || 0),
                    opt_format);
  }
}

exports.Time = Time;
exports.Time.Format = Format;
