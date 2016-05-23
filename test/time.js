'use strict'; /* eslint-env mocha */
var assert = require('assert');
var pc = require('../');
var Time = pc.Time;
var Format = pc.Time.Format;

suite('pc.Time', () => {
  test('toString()', () => {
    assert.equal(new Time(45296.789).toString(), '12:34:56.789');
    assert.equal(new Time(45296.789).toString(Format.COLONS), '12:34:56.789');
    assert.equal(new Time(45296.78).toString(Format.LETTERS), '12h34m56.78s');
    assert.equal(new Time(45296.7).toString(Format.WORDS),
                 '12hrs 34mins 56.7secs');
    assert.equal(new Time(45296.789).toString(Format.QUOTES), '754\'56.789"');
    assert.equal(new Time(45296.789, Format.LETTERS).toString(),
                 '12h34m56.789s');
    assert.equal(new Time(45296.789, Format.QUOTES).toString(Format.LETTERS),
                 '12h34m56.789s');
  });
  test('fromString("HH:MM:SS.xxx")', () => {
    assert.equal(Time.fromString('12:34:56.789').format, Format.COLONS);
    // TODO(kjs): state
    // assert.equal(Time.fromString('12:34:56.789 12h34m', state));
    assert.equal(Time.fromString('12:34:56.789').seconds, 45296.789);
    assert.equal(Time.fromString('12 : 34 : 56.789').seconds, 45296.789);
    assert.equal(Time.fromString('12:34:56.78').seconds, 45296.78);
    assert.equal(Time.fromString('12:34:56.7').seconds, 45296.7);
    assert.equal(Time.fromString('12:34:56').seconds, 45296);
    assert.equal(Time.fromString('12:34:5').seconds, 45245);
    assert.equal(Time.fromString('12:34:').seconds, 45240);
    assert.equal(Time.fromString('12:34').seconds, 754);
    assert.equal(Time.fromString('12:0:34').seconds, 43234);
    assert.equal(Time.fromString('12:3').seconds, 723);
    assert.equal(Time.fromString('2:34:56.789').seconds, 9296.789);
    assert.equal(Time.fromString(':34:56.789').seconds, 2096.789);
    assert.equal(Time.fromString('34:56.789').seconds, 2096.789);
    assert.equal(Time.fromString('4:56.789').seconds, 296.789);
    assert.equal(Time.fromString(':56.789').seconds, 56.789);
    assert.equal(Time.fromString('56.789'), undefined);
    assert.equal(Time.fromString(':56.78').seconds, 56.78);
    assert.equal(Time.fromString(':56.7').seconds, 56.7);
    assert.equal(Time.fromString(':56.').seconds, 56);
    assert.equal(Time.fromString(':56').seconds, 56);
    assert.equal(Time.fromString(':6').seconds, 6);
    assert.equal(Time.fromString('0:34:56.789').seconds, 2096.789);
    assert.equal(Time.fromString('0:0:0.789').seconds, 0.789);
    assert.equal(Time.fromString('100:34:56').seconds, 362096);
    assert.equal(Time.fromString('59:56').seconds, 3596);
    assert.equal(Time.fromString('60:34').seconds, 3634);
    assert.equal(Time.fromString('60:34.567').seconds, 3634.567);
    assert.equal(Time.fromString(':2368.345').seconds, 2368.345);
    assert.equal(Time.fromString('12:345.567').seconds, 1065.567);
    assert.equal(Time.fromString('12:345:61').seconds, 63961);
    assert.equal(Time.fromString(' 12:34:56.789').seconds, 45296.789);
    assert.equal(Time.fromString('12:34:56.789 ').seconds, 45296.789);
    assert.equal(Time.fromString('x12:34:56.789'), undefined);
    assert.equal(Time.fromString('12:34:56.789x').seconds, 45296.789);
    assert.equal(Time.fromString('12:34..567').seconds, 754);
  });
  test('fromString("HHhMMmSS.xxxs")', () => {
    assert.equal(Time.fromString('12h34m56.789s').format, Format.LETTERS);
    // TODO(kjs): state
    assert.equal(Time.fromString('12h34m56.789s').seconds, 45296.789);
    assert.equal(Time.fromString('12 h 34 m 56.789 s').seconds, 45296.789);
    assert.equal(Time.fromString('12h34m56.78s').seconds, 45296.78);
    assert.equal(Time.fromString('12h34m56.7s').seconds, 45296.7);
    assert.equal(Time.fromString('12h34m56s').seconds, 45296);
    assert.equal(Time.fromString('12h34m5').seconds, 45240); // no s!
    assert.equal(Time.fromString('12h34m').seconds, 45240);
    assert.equal(Time.fromString('12h34').seconds, 43200); // no m!
    assert.equal(Time.fromString('12h3m').seconds, 43380);
    assert.equal(Time.fromString('2h34m56.789s').seconds, 9296.789);
    assert.equal(Time.fromString('34m56.789').seconds, 2040); // no s!
    assert.equal(Time.fromString('4m56.789s').seconds, 296.789);
    assert.equal(Time.fromString('56.789s').seconds, 56.789);
    assert.equal(Time.fromString('56.789'), undefined); // no s!
    assert.equal(Time.fromString('56.78s').seconds, 56.78);
    assert.equal(Time.fromString('56.7s').seconds, 56.7);
    assert.equal(Time.fromString('56m').seconds, 3360);
    assert.equal(Time.fromString('56s').seconds, 56);
    assert.equal(Time.fromString('6'), undefined); // no s!
    assert.equal(Time.fromString('0h34m56.789s').seconds, 2096.789);
    assert.equal(Time.fromString('0h0m0.789s').seconds, 0.789);
    assert.equal(Time.fromString('100h34m56s').seconds, 362096);
    assert.equal(Time.fromString('59m56s').seconds, 3596);
    assert.equal(Time.fromString('60h34m').seconds, 218040);
    assert.equal(Time.fromString('60m34s').seconds, 3634);
    assert.equal(Time.fromString('2368.345'), undefined); // no s!
    assert.equal(Time.fromString('12m345.567s').seconds, 1065.567);
    assert.equal(Time.fromString('12h345m59s').seconds, 63959);
    assert.equal(Time.fromString(' 12h34m56.789s').seconds, 45296.789);
    assert.equal(Time.fromString('12h34m56.789s ').seconds, 45296.789);
    assert.equal(Time.fromString('x12h34m56.789s'), undefined);
    assert.equal(Time.fromString('12h34m56.789sx').seconds, 45296.789);
    assert.equal(Time.fromString('12hm').seconds, 43200);
    assert.equal(Time.fromString('12m34..567s').seconds, 720);
  });
  test('fromString("MM\'SS.xxx"")', () => {
    assert.equal(Time.fromString('12\'34.567"').format, Format.QUOTES);
    // TODO(kjs): state
    assert.equal(Time.fromString('12\'34.567"').seconds, 754.567);
    assert.equal(Time.fromString('12 \' 34.567 "').seconds, 754.567);
    assert.equal(Time.fromString('12\'3"').seconds, 723);
    assert.equal(Time.fromString('154\'56.789"').seconds, 9296.789);
    assert.equal(Time.fromString('56\'').seconds, 3360);
    assert.equal(Time.fromString('6"').seconds, 6);
    assert.equal(Time.fromString('59\'61"').seconds, 3601);
    assert.equal(Time.fromString('2368.345"').seconds, 2368.345);
    assert.equal(Time.fromString(' 12\'34.567"').seconds, 754.567);
    assert.equal(Time.fromString('12\'34.567" ').seconds, 754.567);
    assert.equal(Time.fromString('x12\'34.567"'), undefined);
    assert.equal(Time.fromString('12\'34.567"x').seconds, 754.567);
    assert.equal(Time.fromString('12" 34.567\'').seconds, 12);
    assert.equal(Time.fromString('12"34.567\'').seconds, 12);
    assert.equal(Time.fromString('12\'34..567"').seconds, 720);
    assert.equal(Time.fromString('12\',34.567"').seconds, 720);
    assert.equal(Time.fromString('12\'"').seconds, 720);
  });
  test('fromString("HH hours, MM minutes and SS.xxx seconds")', () => {
    assert.equal(
        Time.fromString('12 hours, 34 minutes and 56.789 seconds').format,
        Format.WORDS);
    // TODO(kjs): state
    assert.equal(
        Time.fromString('12 hours, 34 minutes and 56.789 seconds').seconds,
        45296.789);
    assert.equal(
        Time.fromString('12 hrs, 34 mins and 56.789 secs').seconds,
        45296.789);
    assert.equal(
        Time.fromString('12 hour\'s and 34 min\'s , 56.789 second\'s').seconds,
        45296.789);
    assert.equal(
        Time.fromString('12hours and34mins ,56.789secs').seconds,
        45296.789);
    assert.equal(Time.fromString('12hr34min56.78sec').seconds, 45296.78);
    assert.equal(
        Time.fromString('12hours 34 minutes and 56.7 secs').seconds,
        45296.7);
    assert.equal(
        Time.fromString('12 hours and 34 minutes and 56 seconds').seconds,
        45296);
    assert.equal(Time.fromString('12hours 34minutes 5').seconds, 45240);
    assert.equal(Time.fromString('12hrs,34minutes').seconds, 45240);
    assert.equal(Time.fromString('12 hours and 34').seconds, 43200);
    assert.equal(Time.fromString('12 hours and 3 mins').seconds, 43380);
    assert.equal(
        Time.fromString('2hours 34minutes ,56.789 secs').seconds,
        9296.789);
    assert.equal(Time.fromString('34 mins 56.789').seconds, 2040);
    assert.equal(Time.fromString('4 mins 56.789seconds').seconds, 296.789);
    assert.equal(Time.fromString('56.789seconds').seconds, 56.789);
    assert.equal(Time.fromString('56.789'), undefined);
    assert.equal(Time.fromString('56.78secs').seconds, 56.78);
    assert.equal(Time.fromString('56.7 sec\'s').seconds, 56.7);
    assert.equal(Time.fromString('56min\'s').seconds, 3360);
    assert.equal(Time.fromString('56secs').seconds, 56);
    assert.equal(Time.fromString('6'), undefined);
    assert.equal(
        Time.fromString('0 hours 34mins6.789 second\'s').seconds, 2046.789);
    assert.equal(
        Time.fromString('0 hours 0 minutes and 0.789 seconds').seconds, 0.789);
    assert.equal(
        Time.fromString('100hrs34mins56secs').seconds, 362096);
    assert.equal(Time.fromString('59 minutes and 56 seconds').seconds, 3596);
    assert.equal(Time.fromString('60hrs, 34mins').seconds, 218040);
    assert.equal(Time.fromString('60 minutes34 seconds').seconds, 3634);
    assert.equal(Time.fromString('2368.345'), undefined);
    assert.equal(Time.fromString('12min\'s 345.567secs').seconds, 1065.567);
    assert.equal(Time.fromString('12 hours 345 mins 59 secs').seconds, 63959);
    assert.equal(Time.fromString(' 12 hr 34 min 56.789sec').seconds, 45296.789);
    assert.equal(Time.fromString('12hr34min56.789sec ').seconds, 45296.789);
    assert.equal(
        Time.fromString('x12 hours 34 minutes 56.789 seconds'), undefined);
    assert.equal(
        Time.fromString('12hours 34 minutes 56.789 secondsx').seconds,
        45296.789);
    assert.equal(Time.fromString('12hoursminutes').seconds, 43200);
    assert.equal(Time.fromString('12minutes34..567seconds').seconds, 720);
  });
  test('fromString("foo")', () => {
    assert.equal(Time.fromString(''), undefined);
    assert.equal(Time.fromString('foo'), undefined);
  });
});
