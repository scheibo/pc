'use strict';
var assert = require('assert');
var pc = require('../');
var UnitsSystem = pc.metrics.UnitsSystem;

describe('pc.metrics.UnitsSystem', function() {
  it('validates units', function() {
    assert.doesNotThrow(function() { UnitsSystem.validate(UnitsSystem.METRIC) });
    assert.doesNotThrow(function() { UnitsSystem.validate(UnitsSystem.IMPERIAL) });
    assert.throws(function() { UnitsSystem.validate(undefined) }, /InvalidUnitsSystemException/);
    assert.throws(function() { UnitsSystem.validate(null) }, /InvalidUnitsSystemException/);
    assert.throws(function() { UnitsSystem.validate("other") }, /InvalidUnitsSystemException/);
  });
});
