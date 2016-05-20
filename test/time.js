'use strict'; /* eslint-env mocha */
var assert = require('assert');
var pc = require('../');
var Time = pc.Time;
var Format = pc.Time.Format;

describe('pc.Time', () => {
  it('toString()', () => {
    assert.equal(new Time(45296.789).toString(), '12:34:56.789');

    assert.equal(new Time(45296.789).toString(Format.COLONS), '12:34:56.789');
    assert.equal(new Time(45296.789).toString(Format.LETTERS), '12h34m56.789s');
    assert.equal(new Time(45296.789).toString(Format.WORDS),
                 '12 hrs 34 mins 56.789 secs');
    assert.equal(new Time(45296.789).toString(Format.QUOTES), '754\'56.789"');

    assert.equal(new Time(45296.789, Format.QUOTES).toString(), '12:34:56.789');
    assert.equal(new Time(45296.789, Format.QUOTES).toString(Format.LETTERS),
                 '12h34m56.789s');
  });
  it('fromString("HH:MM:SS.xxx")', () => {
    assert.equal(Time.fromString('12:34:56.789').format, Format.COLONS);
    // TODO(kjs): state
    // assert.equal(Time.fromString('12:34:56.789 12h34m', state));

    assert.equal(Time.fromString('12:34:56.789').seconds, 45296.789);
    assert.equal(Time.fromString('12 : 34 : 56.789').seconds, 45296.789);
    assert.equal(Time.fromString('12:34:56.78').seconds, 45296.78);
    assert.equal(Time.fromString('12:34:56.7').seconds, 45296.7);
    assert.equal(Time.fromString('12:34:56').seconds, 45296);
    assert.equal(Time.fromString('12:34:5').seconds, 45290);
    assert.equal(Time.fromString('12:34:').seconds, 45240);
    assert.equal(Time.fromString('12:34').seconds, 754);
    assert.equal(Time.fromString('12:3').seconds, 750);
    assert.equal(Time.fromString('2:34:56.789').seconds, 9296.789);
    assert.equal(Time.fromString(':34:56.789').seconds, 2096.789);
    assert.equal(Time.fromString('34:56.789').seconds, 2096.789);
    assert.equal(Time.fromString('4:56.789').seconds, 296.789);
    assert.equal(Time.fromString(':56.789').seconds, 56.789);
    assert.equal(Time.fromString('56.789').seconds, 56.789);
    assert.equal(Time.fromString('56.78').seconds, 56.789);
    assert.equal(Time.fromString('56.7').seconds, 56.7);
    assert.equal(Time.fromString('56.').seconds, 56);
    assert.equal(Time.fromString('56').seconds, 56);
    assert.equal(Time.fromString('6').seconds, 6);

    assert.equal(Time.fromString('0:34:56.789').seconds, 2096.789);
    assert.equal(Time.fromString('0:0:0.789').seconds, 0.789);
    assert.equal(Time.fromString('100:34:56').seconds, 362096);
    assert.equal(Time.fromString('59:56').seconds, 3596);

    assert.equal(Time.fromString('60:34').seconds, 3634);
    assert.equal(Time.fromString('60:34.567').seconds, 3634.567);
    assert.equal(Time.fromString('2368.345').seconds, 2368.345);
    assert.equal(Time.fromString('12:345.567').seconds, 1065.567);
    assert.equal(Time.fromString('12:345:61').seconds, 45301);

    assert.equal(Time.fromString(' 12:34:56.789').seconds, 45296.789);
    assert.equal(Time.fromString('12:34:56.789 ').seconds, 45296.789);
    assert.equal(Time.fromString('x12:34:56.789'), undefined);
    assert.equal(Time.fromString('12:34:56.789x'), undefined);

    assert.equal(Time.fromString('12:34..567'), undefined);
  });
  it('fromString("HHhMMmSS.xxxs")', () => {
    assert.equal(Time.fromString('12h34m56.789s').format, Format.LETTERS);
    // TODO(kjs): state

    assert.equal(Time.fromString('12h34m56.789s').seconds, 45296.789);
    assert.equal(Time.fromString('12 h 34 m 56.789 s').seconds, 45296.789);
    assert.equal(Time.fromString('12h34m56.78s').seconds, 45296.78);
    assert.equal(Time.fromString('12h34m56.7s').seconds, 45296.7);
    assert.equal(Time.fromString('12h34m56s').seconds, 45296);
    assert.equal(Time.fromString('12h34m5').seconds, 45290);
    assert.equal(Time.fromString('12h34m').seconds, 45240);
    assert.equal(Time.fromString('12h34').seconds, 45240);
    assert.equal(Time.fromString('12h3m').seconds, 43380);
    assert.equal(Time.fromString('2h34m56.789s').seconds, 9296.789);
    assert.equal(Time.fromString('34m56.789').seconds, 2096.789);
    assert.equal(Time.fromString('4m56.789s').seconds, 296.789);
    assert.equal(Time.fromString('56.789s').seconds, 56.789);
    assert.equal(Time.fromString('56.789').seconds, 56.789);
    assert.equal(Time.fromString('56.78s').seconds, 56.789);
    assert.equal(Time.fromString('56.7s').seconds, 56.7);
    assert.equal(Time.fromString('56m').seconds, 3360);
    assert.equal(Time.fromString('56s').seconds, 56);
    assert.equal(Time.fromString('6').seconds, 6);

    assert.equal(Time.fromString('0h34m56.789s').seconds, 2096.789);
    assert.equal(Time.fromString('0h0m0.789s').seconds, 0.789);
    assert.equal(Time.fromString('100h34m56s').seconds, 362096);
    assert.equal(Time.fromString('59m56s').seconds, 3596);

    assert.equal(Time.fromString('60h34m').seconds, 218040);
    assert.equal(Time.fromString('60m34s').seconds, 3634);
    assert.equal(Time.fromString('2368.345').seconds, 2368.345);
    assert.equal(Time.fromString('12m345.567s').seconds, 1065.567);
    assert.equal(Time.fromString('12h345m59s').seconds, 63959);

    assert.equal(Time.fromString(' 12h34m56.789s').seconds, 45296.789);
    assert.equal(Time.fromString('12h34m56.789s ').seconds, 45296.789);
    assert.equal(Time.fromString('x12h34m56.789s'), undefined);
    assert.equal(Time.fromString('12h34m56.789sx'), undefined);
    assert.equal(Time.fromString('12hm'), undefined);
    assert.equal(Time.fromString('12m34..567s'), undefined);
  });
  it('fromString("MM\'SS.sss"")', () => {
    assert.equal(Time.fromString('12\'34.567"').format, Format.QUOTES);
    // TODO(kjs): state

    assert.equal(Time.fromString('12\'34.567"').seconds, 754.567);
    assert.equal(Time.fromString('12 \' 34.567 "').seconds, 754.567);
    assert.equal(Time.fromString('12\'3"').seconds, 750);
    assert.equal(Time.fromString('154\'56.789"').seconds, 9296.789);
    assert.equal(Time.fromString('56\'').seconds, 3360);
    assert.equal(Time.fromString('6"').seconds, 6);

    assert.equal(Time.fromString('59\'61"').seconds, 3601);
    assert.equal(Time.fromString('2368.345"').seconds, 2368.345);

    assert.equal(Time.fromString(' 12\'34.567"').seconds, 754.567);
    assert.equal(Time.fromString('12\'34.567" ').seconds, 754.567);
    assert.equal(Time.fromString('x12\'34.567"'), undefined);
    assert.equal(Time.fromString('12\'34.567"x'), undefined);

    assert.equal(Time.fromString('12" 34.567\'').seconds, 12);
    assert.equal(Time.fromString('12"34.567\''), undefined);
    assert.equal(Time.fromString('12\'34..567"'), undefined);
    assert.equal(Time.fromString('12\',34.567"'), undefined);
    assert.equal(Time.fromString('12\'"'), undefined);
  });
  it('fromString("HH hours, MM minutes and SS.sss seconds")', () => {
  });
  it('fromString("foo")', () => {
    assert.equal(Time.fromString(''), undefined);
    assert.equal(Time.fromString('foo'), undefined);
  });
});
