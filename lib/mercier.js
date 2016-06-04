'use strict';
var Distance = require('./distance').Distance;
var Performance = require('./performance').Performance;
var Time = require('./time').Time;
var EVENTS = Distance.EVENTS;

/** @type {!Map<!Event, !Array.<number>} */
const SCORE = new Map();
SCORE.set(EVENTS.get(100),
    [290.52712, 1953.2266, 0.003439, 6.72526]);
SCORE.set(EVENTS.get(200),
    [267.75893, 1703.6447, 0.003734, 6.36315]);
SCORE.set(EVENTS.get(400),
    [262.37121, 1402.7708, 0.0038105, 5.34719]);
SCORE.set(EVENTS.get(800),
    [302.9089, 1377.5673, 0.003300, 4.54844]);
SCORE.set(EVENTS.get(1500),
    [320.6038, 1314.0045, 0.003117, 4.09988]);
SCORE.set(EVENTS.get(Distance.MILE),
    [321.7731201, 1306.285127, 0.0031062, 4.060811045]);
SCORE.set(EVENTS.get(3000),
    [331.264214, 1240.294895, 0.0030147, 3.74703401]);
SCORE.set(EVENTS.get(2 * Distance.MILE),
    [333.4505158, 1241.705275, 0.0029949, 3.726724]);
SCORE.set(EVENTS.get(5000),
    [342.8535, 1234.1959, 0.0029129, 3.602496]);
SCORE.set(EVENTS.get(5 * Distance.MILE),
    [348.6863013, 1192.028614, 0.0028667, 3.4195078]);
SCORE.set(EVENTS.get(10000),
    [349.8535, 1171.2847, 0.002857, 3.348169]);
SCORE.set(EVENTS.get(10 * Distance.MILE),
    [360.6890152, 1164.451907, 0.0027716, 3.2290278]);
SCORE.set(EVENTS.get(Distance.MARATHON / 2),
    [366.3739581, 1168.783894, 0.00272793, 3.1912339]);
SCORE.set(EVENTS.get(Distance.MARATHON),
    [384.5408, 1161.8021, 0.0025989, 3.022432]);

/** @type {!Array.<number>} */
const FEMALE_FACTOR = [370.23683, 1.10218405];

class Mercier {

  /**
   * @param {!Performance} perf .
   * @return {number} .
   */
  static score(perf) {
    var e = perf.event;
    var [base, offset] = SCORE.get(e);
    var score = base * (e.distance.metres / perf.time.seconds) - offset;
    return (e.sex === Sex.FEMALE) ?
        (score + FEMALE_FACTOR[0]) / FEMALE_FACTOR[1] : score;
  }

  /**
   * @param {!Performance} perf .
   * @param {!Event=} opt_event .
   * @param {!Sex=} opt_sex .
   * @return {!Time|!Map.<!Event, !Time>} .
   */
  static convert(perf, opt_sex, opt_event) {
    var sex = opt_sex || Performance.Sex.DEFAULT;
    var score = score(perf); // already assumes gender1 is male
    if (sex === Sex.FEMALE) {
      score = FEMALE_FACTOR[1] * score - FEMALE_FACTOR[0];
    }

    if (opt_event) {
      return toTime(opt_event, score);
    }

    var result = new Map();
    for (var e of Distance.EVENTS.values()) {
      result.set(e, toTime(opt_event, score));
    }

    return result;
  }

  /**
   * @param {!Event} e .
   * @param {number} score .
   * @return {!Time} .
   * @private
   */
  static toTime_(e, score) {
    var [,,base,offset] = SCORE.get(e);
    return new Time(e.distance.metres / (base * score + offset));
  }
}

exports.Mercier = Mercier;
