'use strict';
var assert = require('assert');
var pc = require('../');
var UnitsSystem = pc.metrics.UnitsSystem;

describe('pc.metrics.UnitsSystem', function() {
  it('validates units', function() {
    assert.doesNotThrow(function() { UnitsSystem.validate(UnitsSystem.METRIC); });
    assert.doesNotThrow(function() { UnitsSystem.validate(UnitsSystem.IMPERIAL); });
    assert.throws(function() { UnitsSystem.validate(undefined); }, /InvalidUnitsSystemException/);
    assert.throws(function() { UnitsSystem.validate(null); }, /InvalidUnitsSystemException/);
    assert.throws(function() { UnitsSystem.validate("other"); }, /InvalidUnitsSystemException/);
  });
  it('infers units', function() {
    assert.equal(UnitsSystem.infer(UnitsSystem.IMPERIAL), UnitsSystem.IMPERIAL);
    assert.equal(UnitsSystem.infer(UnitsSystem.METRIC), UnitsSystem.METRIC);
    assert.equal(UnitsSystem.infer(undefined), UnitsSystem.METRIC);
  });
});
