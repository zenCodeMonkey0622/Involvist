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

        it('should return empty array when the value an empty string', function() {
            var actualResult = testParser.parsePrimarySubjects('');
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, 0);
        });

        it('should return a single element when the value is a single string', function() {
            var expectedSubject = 'Health';
            var actualResult = testParser.parsePrimarySubjects(expectedSubject);
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, 1);
            assert.equal(actualResult[0], expectedSubject);
        });

        it('should return two elements when the value is a comma-delimited string', function() {
            var expectedResult = ['Health', 'Technology'];
            var actualResult = testParser.parsePrimarySubjects('Health, Technology');
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, expectedResult.length);

            expectedResult.forEach( function(element, index, array) {
                assert.equal(actualResult[index], element);
            });
        });

        it('should return two elements when the value is a comma-delimited string with no spaces', function() {
            var expectedResult = ['Health', 'Technology'];
            var actualResult = testParser.parsePrimarySubjects('Health,Technology');
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, expectedResult.length);

            expectedResult.forEach( function(element, index, array) {
                assert.equal(actualResult[index], element);
            });
        });

        it('should return two elements when the value is a comma-delimited string with various amounts of whitespace', function() {
            var expectedResult = ['Health', 'Technology', 'Environment', 'Space', 'Culture'];
            var actualResult = testParser.parsePrimarySubjects('Health,    Technology,Environment, Space,      Culture');
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, expectedResult.length);

            expectedResult.forEach( function(element, index, array) {
                assert.equal(actualResult[index], element);
            });
        });

        it('should return one elements when the value is a space-delimited string', function() {
            var expectedResult = 'Media and Communications';
            var actualResult = testParser.parsePrimarySubjects(expectedResult);
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, 1);
            assert.equal(actualResult[0], expectedResult);
        });

        it('should return two elements when the value is a comma-delimited string composed of space-delimited substrings', function() {
            var expectedResult = ['Health and Society', 'Computers and Technology'];
            var actualResult = testParser.parsePrimarySubjects('Health and Society,Computers and Technology');
            assert.notEqual(actualResult, null);
            assert.equal(actualResult.length, expectedResult.length);

            expectedResult.forEach( function(element, index, array) {
                assert.equal(actualResult[index], element);
            });
        });

    });

});