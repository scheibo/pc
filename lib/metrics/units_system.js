'use strict';

var UnitsSystemEnum = Object.freeze({
  'metric': 'kg',
  'imperial': 'lb'
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
  return units;
};

UnitsSystem.infer = function infer(units) {
  return UnitsSystem.validate(units || UnitsSystem.METRIC);
};

exports.UnitsSystem = UnitsSystem;
