'use strict';
var assert = require("assert")
var pc = require('../');

describe('pc node module', function() {
  it('must have at least one test', function() {
    pc();
    assert(false, 'No tests');
  });
});
