pc.data.Time = function(hours, minutes, seconds) {
  this.hours = hours || 0;
  this.minutes = minutes || 0;
  this.seconds = seconds || 0;
}

// TODO(kjs): should take in an index for which matcher was grabbed!
pc.data.Time.fromString = function(str) {
  var match;
  if (match = str.match(pc.data.Time.Matcher.WORDS)) {
    // first group is the number, second is the units
    switch(match[2][1]) {
      case "h":
        return new pc.data.Time(parseInt(match[1]), undefined, undefined);
      case "m":
        return new pc.data.Time(undefined, parseInt(match[1]), undefined);
      case "s":
        return new pc.data.Time(undefined, undefined, parseInt(match[1]));
      default:
        return; // nothing
    }
  } else if (match = str.match(pc.data.Time.Matcher.COLONS)) {
    var dot = str.indexOf(".") > 0;
    switch (match.size()) {
      case 1:
        return new pc.data.Time(undefined, undefined, parseInt(match[1]));
      case 2:
        if (dot) {
          return new pc.data.Time(undefined, undefined, parseFloat(match[1] + "." + match[2]));
        } else {
          return new pc.data.Time(undefined, parseInt(match[1]), parseInt(match[2]));
        }
      case 3:
        if (dot) {
          return new pc.data.Time(undefined, parseInt(match[1]), parseFloat(match[2] + "." + match[3]));
        } else {
          return new pc.data.Time(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        }
      case 4:
        return new pc.data.Time(parseInt(match[1]), parseInt(match21]), parseFloat(match[3] + "." + match[4]));
      default:
        return; // nothing
    }
  } else if (match = str.match(pc.data.Time.Matcher.LETTERS)) {
  } else if (match = str.match(pc.data.Time.Matcher.QUOTES)) {
  } else {
    return; // nothing
  }
};

pc.data.Time.prototype.canonicalize = function() {
  var min_hour = Math.floor(this.minutes/pc.data.Time.MINUTES_PER_HOUR);
  var sec_mins = Math.floor(this.seconds/pc.data.Time.SECONDS_PER_MINUTE);
  this.hours += min_hour;
  this.minutes = this.minutes - (min_hour * pc.data.Time.MINUTES_PER_HOUR)
                              + (sec_mins * pc.data.Time.SECONDS_PER_MINUTE);
  this.seconds -= sec_mins;
  return this;
}

pc.data.Time.prototype.toSeconds = function() {
  return this.hours * pc.data.Time.SECONDS_PER_HOUR +
         this.minutes * pc.data.Time.MINUTES_PER_HOUR +
         this.seconds;
}

pc.data.Time.prototype.toString = function(formatter) {
  formatter = formatter || pc.data.Time.Formatter.COLONS;
  this.canonicalize();
  return formatter(this.hours, this.minutes, this.seconds);
}

pc.data.Time.SECONDS_PER_MINUTE = 60;
pc.data.Time.MINUTES_PER_HOUR = 60;
pc.data.Time.SECONDS_PER_HOUR = pc.data.Time.SECONDS_PER_MINUTE *
                                pc.data.Time.SECONDS_PER_HOUR;


pc.data.Time.Matcher = {};
pc.data.Time.Matcher.COLONS = /((?:(?:([01]?\d|2[0-3]):)?([0-5]?\d))?(?::([0-5]?\d))(?:\.\d+)?)/;
pc.data.Time.Matcher.LETTERS = /((?:([01]?\d|2[0-3])h)?(?:([0-5]?\d)m(?:(\d{2})(?!s))?)?(?:([0-5]?\d)s)?)/;
pc.data.Time.Matcher.WORDS = /((\d+)\s*((?:(?:h(?:ou)?r)|(?:min(?:ute)?)|(?:sec(?:ond)?))(?:'?s)?))/;
pc.data.Time.Matcher.QUOTES = /(?:(\d{1,2})')?(?:(\d{1,2})")?/;

pc.data.Time.Format = {};

// HH:MM:SS.sss
pc.data.Time.Formatter.COLONS = function(hours, minutes, seconds) {
  var str = "";
  if (hours) str += hours.toFixed() + ":";
  if (minutes) str += minutes.toFixed() + ":";
  if (seconds) str += seconds.toFixed(3);
  return str;
};

// HHhMMmSSs
pc.data.Time.Formatter.LETTERS = function(hours, minutes, seconds) {
  var str = "";
  if (hours) str += hours.toFixed() + "h"
  if (minutes) str += minutes.toFixed() + "m";
  if (seconds) str += seconds.toFixed() + "s";
  return str;
};

// X mins
pc.data.Time.Formatter.WORDS = function(hours, minutes, seconds) { };

// MM'SS"
pc.data.Time.Formatter.QUOTES = function(hours, minutes, seconds) {
  var str = "";
  if (hours) minutes += pc.data.Time.MINUTES_PER_HOUR * hours;
  if (minutes) str += minutes.toFixed() + "m";
  if (seconds) str += seconds.toFixed() + "s";
  return str;
};
