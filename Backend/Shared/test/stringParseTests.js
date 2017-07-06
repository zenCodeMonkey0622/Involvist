// stringParseTests.js
// unit tests against stringParse.js methods
'use strict';

const testParser = require('../Parsers/stringParse');

var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});