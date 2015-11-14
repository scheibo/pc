'use strict';
var assert = require('assert');
var pc = require('../');
var Weight = pc.metrics.Weight;
var UnitsSystem = pc.metrics.UnitsSystem;

describe('pc.metrics.Weight', function() {
  it('should default to kilogram', function() {
    assert.equal(new Weight(10).toString(UnitsSystem.METRIC), '10 kg');
  });
  it('should understand pounds', function() {
    assert.equal(new Weight(2, UnitsSystem.IMPERIAL).toString(UnitsSystem.IMPERIAL), '2 lb');
  });
});
