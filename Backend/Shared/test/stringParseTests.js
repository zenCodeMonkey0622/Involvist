// stringParseTests.js
// unit tests against stringParse.js methods
'use strict';

const testParser = require('../Parsers/stringParse');
const assert = require('assert');

describe('stringParse', function() {

    describe('parsePrimarySubjects()', function() {

        it('should return empty array when the value is null', function() {
            var actualResult = testParser.parsePrimarySubjects(null);
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, 0);
        });

        it('should return empty array when the value an empty array', function() {
            var actualResult = testParser.parsePrimarySubjects([]);
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, 0);
        });

    });

});