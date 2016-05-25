'use strict'; /* eslint-env mocha */
var assert = require('assert');
var pc = require('../');
var Distance = pc.Distance;
var Format = pc.Distance.Format;

suite('pc.Distance', () => {
  test('toString()', () => {
    assert.equal(new Distance(1).toString(), '1m'); 
    assert.equal(new Distance(1).toString(Format.SHORT), '1m'); 
    assert.equal(new Distance(1).toString(Format.LONG), '1 metre'); 
    assert.equal(new Distance(999).toString(Format.SHORT), '999m'); 
    assert.equal(new Distance(999).toString(Format.LONG), '999 metres'); 
    assert.equal(new Distance(1499).toString(Format.SHORT), '1.499km'); 
    assert.equal(new Distance(1499).toString(Format.LONG), '1.499 kilometres'); 
    assert.equal(new Distance(1499.9).toString(Format.SHORT), '1.5km'); 
    assert.equal(new Distance(1499.9).toString(Format.LONG), '1.5 kilometres'); 
    assert.equal(new Distance(1500).toString(Format.SHORT), '1500m'); 
    assert.equal(new Distance(1500).toString(Format.LONG), '1500m'); 
    assert.equal(new Distance(10000).toString(Format.SHORT), '10,000m'); 
    assert.equal(new Distance(10000).toString(Format.LONG), '10,000m'); 
    assert.equal(new Distance(20000).toString(Format.SHORT), '20km'); 
    assert.equal(new Distance(42194.988).toString(Format.SHORT), 'Marathon'); 
    assert.equal(new Distance(42194.988).toString(Format.LONG), 'Marathon'); 
    assert.equal(new Distance(42194.988/2).toString(Format.SHORT),
                 'Half Marathon'); 
    assert.equal(new Distance(42194.988/2).toString(Format.LONG),
                 'Half Marathon'); 

    assert.equal(new Distance(1609.344).toString(Format.SHORT, System.IMPERIAL), '1 mi'); 
    assert.equal(new Distance(1609.344).toString(Format.LONG, System.IMPERIAL), '1 mile'); 
    assert.equal(new Distance(3*1609.344).toString(Format.SHORT, System.IMPERIAL), '3 mi'); 
    assert.equal(new Distance(3*1609.344).toString(Format.LONG, System.IMPERIAL), '3 miles'); 
    assert.equal(new Distance(1609.344/2).toString(Format.SHORT, System.IMPERIAL), '880y'); 
    assert.equal(new Distance(1609.344/2).toString(Format.LONG, System.IMPERIAL), '880 yards'); 
    assert.equal(new Distance(1609.344/2).toString(Format.SHORT, System.IMPERIAL), '440y'); 
    assert.equal(new Distance(1609.344/2).toString(Format.LONG, System.IMPERIAL), '440 yards'); 
    assert.equal(new Distance(1609.344/3).toString(Format.SHORT, System.IMPERIAL), '586.667y'); 
    assert.equal(new Distance(1.7*1609.344).toString(Format.SHORT, System.IMPERIAL), '1.7mi'); 
  });
  test.skip('fromString()', () => {
  });
});
