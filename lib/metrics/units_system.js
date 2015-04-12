'use strict';

var UnitsSystemEnum = Object.freeze({
  'metric': 'metric',
  'imperial': 'imperial'
});

function InvalidUnitsSystemException(message) {
  this.name = 'InvalidUnitsSystemException';
  this.message = message;
}
InvalidUnitsSystemException.prototype = Object.create(Error.prototype);
InvalidUnitsSystemException.prototype.constructor = InvalidUnitsSystemException;

var UnitsSystem = {};

UnitsSystem.METRIC = UnitsSystemEnum.metric;
UnitsSystem.IMPERIAL = UnitsSystemEnum.imperial;

UnitsSystem.validate = function validate(units) {
  if (!(units === UnitsSystem.METRIC || units === UnitsSystem.IMPERIAL)) {
    throw new InvalidUnitsSystemException(units + " is not a valid system of units.");
  }
};

exports.UnitsSystem = UnitsSystem;
