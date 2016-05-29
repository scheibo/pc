'use strict'; /* eslint-env mocha */
var assert = require('assert');
var pc = require('../');
var Distance = pc.Distance;
var Format = pc.Distance.Format;
var System = pc.Distance.System;

const MARATHON = 42194.988;
const MILE = 1609.344;

const SHORT = Format.SHORT;
const LONG = Format.LONG;
const IMPERIAL = System.IMPERIAL;

suite('pc.Distance', () => {
  test('toString()', () => {
    assert.equal(new Distance(1).toString(), '1m');
    assert.equal(new Distance(1, LONG).toString(), '1 metre');
    assert.equal(new Distance(MILE / 2, SHORT, IMPERIAL).toString(), '880y');
  });
  test('toString() => "km"', () => {
    assert.equal(new Distance(1).toString(SHORT), '1m');
    assert.equal(new Distance(1).toString(LONG), '1 metre');
    assert.equal(new Distance(999).toString(SHORT), '999m');
    assert.equal(new Distance(999).toString(LONG), '999 metres');
    assert.equal(new Distance(1499).toString(SHORT), '1.499km');
    assert.equal(new Distance(1499).toString(LONG), '1.499 kilometres');
    assert.equal(new Distance(1499.9).toString(SHORT), '1.5km');
    assert.equal(new Distance(999.9999).toString(SHORT), '1000m');
    assert.equal(new Distance(1499.9).toString(LONG), '1.5 kilometres');
    assert.equal(new Distance(1500).toString(SHORT), '1500m');
    assert.equal(new Distance(1500).toString(LONG), '1500m');
    assert.equal(new Distance(10000).toString(SHORT), '10,000m');
    assert.equal(new Distance(10000).toString(LONG), '10,000m');
    assert.equal(new Distance(20000).toString(SHORT), '20km');
    assert.equal(new Distance(MARATHON).toString(SHORT), 'Marathon');
    assert.equal(new Distance(MARATHON).toString(LONG), 'Marathon');
    assert.equal(new Distance(MARATHON / 2).toString(SHORT), 'Half Marathon');
    assert.equal(new Distance(MARATHON / 2).toString(LONG), 'Half Marathon');
  });
  test('toString() => "mi"', () => {
    assert.equal(new Distance(MILE).toString(SHORT, IMPERIAL), 'Mile');
    assert.equal(new Distance(MILE).toString(LONG, IMPERIAL), 'Mile');
    assert.equal(new Distance(3 * MILE).toString(SHORT, IMPERIAL), '3mi');
    assert.equal(new Distance(3 * MILE).toString(LONG, IMPERIAL), '3 miles');
    assert.equal(new Distance(MILE / 2).toString(SHORT, IMPERIAL), '880y');
    assert.equal(new Distance(MILE / 2).toString(LONG, IMPERIAL), '880 yards');
    assert.equal(new Distance(MILE / 4).toString(SHORT, IMPERIAL), '440y');
    assert.equal(new Distance(MILE / 4).toString(LONG, IMPERIAL), '440 yards');
    assert.equal(new Distance(MILE / 3).toString(SHORT, IMPERIAL), '586.667y');
    assert.equal(new Distance(1.7 * MILE).toString(SHORT, IMPERIAL), '1.7mi');
  });
  test('fromString()', () => {
    assert.equal(Distance.fromString('half x').metres, MARATHON / 2);
    assert.equal(Distance.fromString('HALF MARATHON').metres, MARATHON / 2);
    assert.equal(Distance.fromString('Marathon').metres, MARATHON);
    assert.equal(Distance.fromString('marathon').metres, MARATHON);
    assert.equal(Distance.fromString(''), undefined);
    assert.equal(Distance.fromString('foo'), undefined);
  });
  test('fromString("km")', () => {
    assert.equal(Distance.fromString('4000 m').system, System.METRIC);
    assert.equal(Distance.fromString('4000 m').format, SHORT);
    assert.equal(Distance.fromString('4000 kilometres').system, System.METRIC);
    assert.equal(Distance.fromString('4000 kilometres').format, LONG);
    assert.equal(Distance.fromString('4000 M').metres, 4000);
    assert.equal(Distance.fromString('4000 metres').metres, 4000);
    assert.equal(Distance.fromString('4000 Metre').metres, 4000);
    assert.equal(Distance.fromString('4000 metre\'s').metres, 4000);
    assert.equal(Distance.fromString('4000meters').metres, 4000);
    assert.equal(Distance.fromString('4k').metres, 4000);
    assert.equal(Distance.fromString('4k\'s').metres, 4000);
    assert.equal(Distance.fromString('4 KMS').metres, 4000);
    assert.equal(Distance.fromString('4 kilo').metres, 4000);
    assert.equal(Distance.fromString('4 kilometer').metres, 4000);
    assert.equal(Distance.fromString('4 KiloMeters').metres, 4000);
    assert.equal(Distance.fromString('4 kiloMETRE').metres, 4000);
    assert.equal(Distance.fromString('4 kilometre\'s').metres, 4000);
  });
  test('fromString("mi")', () => {
    assert.equal(Distance.fromString('3 mi.\'s').system, IMPERIAL);
    assert.equal(Distance.fromString('3 mi.\'s').format, SHORT);
    assert.equal(Distance.fromString('1320 yds').system, IMPERIAL);
    assert.equal(Distance.fromString('1320 yds').format, SHORT);
    assert.equal(Distance.fromString('3 mi.').metres, 3 * MILE);
    assert.equal(Distance.fromString('1320yd').metres, 0.75 * MILE);
    assert.equal(Distance.fromString('5 MILES').metres, 5 * MILE);
    assert.equal(Distance.fromString('2mile').metres, 2 * MILE);
    assert.equal(Distance.fromString('440 Yards').metres, MILE / 4);
    assert.equal(Distance.fromString('1760 YS').metres, MILE);
  });
  test('EVENTS', () => {
    var events = [100, 200, 400, 800, 1500, MILE, 3000, 2 * MILE, 5000,
                  5 * MILE, 10000, 10 * MILE, MARATHON / 2, MARATHON];
    var i = 0;
    for (var e of Distance.EVENTS.values()) {
      assert.equal(e.distance.metres, events[i]);
      i++;
    }
  });
});
