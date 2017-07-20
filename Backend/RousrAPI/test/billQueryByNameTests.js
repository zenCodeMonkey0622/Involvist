// billQueryByNameTests.js
// unit testing suite for Rousr API bill query by name
'use strict';

const assert = require('assert');
const config = require('./testConfig');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');

describe('Rousr API', function() {

    describe('Bill Query By Name', function() {

        it('should return invalid token error', function(done) {
            
            // 'done' parameter used on async code. call done() after
            // last assert.

            const queryRequest = httpUtil.makeHttpsRequest(config.TEST_CONGRESS_API_URI,
                null,
                config.TEST_CONGRESS_BILLS_ENDPOINT + config.TEST_CONGRESS_BILLS_QUERYNAME_PATH + '/HR1055',
                httpUtil.requestType.GET,
                null,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': null},
                (res) => {
                    var responseData = '';

                    res.on('data', (chunk) => {
                        responseData += chunk;
                    });

                    res.on('end', () => {
                        console.log('received: ' + responseData);
                        assert.equal(res.statusCode, '200', 'did not return 200');
                        done();
                    });
                });

                queryRequest.on('error', (e) => {
                    assert.fail(null, null, 'problem with bill query request: ' + e);
                    done();
                });

                queryRequest.end();
        });

        it('should return one bill matching the name', function() {
            assert.fail(null, null, 'unit test not implemented');
        });

        it('should return zero bills', function() {
            assert.fail(null, null, 'unit test not implemented');
        });
    });
});