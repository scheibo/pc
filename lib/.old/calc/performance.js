var exports = module.exports = {};

/**
 *
 */
pc.data.performance = function(time, distance, gender) {
  this.time = time;
  this.distance = distance;
  this.gender = gender || pc.data.gender.MALE;
};


