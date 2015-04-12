'use strict';
var UnitsSystem = require('./units_system');

var POUNDS_PER_KILOGRAM = 2.20462262;

var convert = function convert(val, fromUnitsSystem, toUnitsSystem) {
  if (fromUnitsSystem === toUnitsSystem) {
    return val;
  }
  if (fromUnitsSystem === UnitsSystem.METRIC) {
    // METRIC -> IMPERIAL
    return val * POUNDS_PER_KILOGRAM;
  } else {
    // IMPERIAL -> METRIC
    return val / POUNDS_PER_KILOGRAM;
  }
};

function Weight(val, unitsSystem) {
  unitsSystem = unitsSystem || UnitsSystem.METRIC;
  UnitsSystem.validate(unitsSystem);
  this.kilograms = convert(val, unitsSystem, UnitsSystem.METRIC);
}

Weight.POUNDS_PER_KILOGRAM = POUNDS_PER_KILOGRAM;

//Weight.fromString = function fromString(str) {
  //// TODO(kjs):
//};

Weight.prototype.toString = function toString(unitsSystem) {
  unitsSystem = unitsSystem || UnitsSystem.METRIC;
  UnitsSystem.validate(unitsSystem);
  return '' + convert(this.kilograms, UnitsSystem.METRIC, unitsSystem);
};

exports.Weight = Weight;
