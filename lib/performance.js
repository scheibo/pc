'use strict';

/** @enum */
const Sex = {
  MALE: Symbol("MALE"),
  FEMALE: Symbol("FEMALE")
};
Sex.DEFAULT = Sex.MALE;

class Performance {
  /**
   * @param {!Event} event .
   * @param {!Time} time .
   * @param {!Sex=} opt_sex .
   * @constructor
   */
  constructor(event, time, opt_sex) {
    /** @private */
    this.event_ = event;
    /** @private */
    this.time_ = time;
    /** @private */
    this.sex_ = opt_sex || Sex.DEFAULT;
  }

  /** @return {!Event} . */
  get event() {
    return this.event_;
  }

  /** @return {!Time} . */
  get time() {
    return this.time_;
  }

  /** @return {!Sex} . */
  get sex() {
    return this.sex_;
  }
}

exports.Performance = Performance;
