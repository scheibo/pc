'use strict';
var Distance = require('./distance').Distance;
var Performance = require('./performance').Performance;
var Time = require('./time').Time;
var EVENTS = Distance.EVENTS;

/** @type {!Map<!Event, number} */
const ADJUST = new Map();
ADJUST.set(EVENTS.get(400), -2);
ADJUST.set(EVENTS.get(800), -1);
ADJUST.set(EVENTS.get(1500), 0);
ADJUST.set(EVENTS.get(3000), 1);
ADJUST.set(EVENTS.get(5000), 2);
ADJUST.set(EVENTS.get(10000), 3);
ADJUST.set(EVENTS.get(Distance.MARATHON / 2), 4);
ADJUST.set(EVENTS.get(Distance.MARATHON), 5);


// given 32:50 10k, what is 400 pace?
// know difference between 10k (3) and 800 (-1) = -4.
// take 400 pace for 10k and subtract -5 * modifier from it, then convert to distance
// what is modifier? need to base things off of a mile!
// first need to convert to mile but not sure which modifier to use to convert!
// == try using 5, get mile, and if its < 430 switch to 4?
class Rubio {

  const modifier(perf) {
    var adjust = ADJUST.get(perf.event);
    if (!adjust) {
      return undefined;
    }
    // 430
    // 500
    // 530
    // 4 5 or 6?
  }


  /**
   * @param {!Performance} perf .
   * @param {!Event=} opt_event .
   * @return {(!Time|!Map.<!Event, !Time>)?} .
   */
  static convert(perf, opt_sex, opt_event) {
    var adjust = ADJUST.get(perf.event);
    if (!adjust) {
      return undefined;
    }
    // convert into time per mile? how without knowing modifier!
  }

}
