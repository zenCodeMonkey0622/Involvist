// addressToDistrictTests.js
// unit test for address to congressional district API

'use strict';

// set the appropriate environment variables
process.env.NODE_ENV = 'test';

const https = require('https');	
const assert = require('assert');
const querystring = require('querystring');
const testConfig = require('./testConfig');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const sharedConfig = require('../../Shared/Config/SharedConfig');
const testHelpers = require('./apiTestHelpers');

const secureAgent = new https.Agent({keepAlive: true});

var testAuthToken = '';

/**
 * before() - runs code before all tests are loaded
 * * @param {function()} done - callback executed when async code is complete.
 */
before( function(done) {

    testHelpers.getAuthToken(testConfig.TEST_USER,
        testConfig.TEST_PASSWORD,
        (err, token) => {
            if (err) {
                assert.fail('unable to get authentication token');
            }
            else {
                testAuthToken = token;
            }
            done();
        });
});

/**
 * after() - runs code after all tests are run
 */
after( function() {
    // close all open sockets used by this agent
    secureAgent.destroy();
});

describe('Rousr API', function() {

    describe('Congressional District by Address', function() {

        // 'done' parameter used on async code. call done() after
        // last assert so mocha knows it needs to wait before executing
        // other tests
        it('should return 401 Unauthorized', function(done) {

            const expectedResponseCode = '401';

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_ADDRESS_TO_DISTRICT_PATH,
                httpUtil.requestType.GET,
                secureAgent,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': null},
                testConfig.TEST_HTTP_OPTIONS,
                (res) => {
                    var responseData = '';

                    res.on('data', (chunk) => {
                        responseData += chunk;
                    });

                    res.on('end', () => {
                        assert.equal(res.statusCode, expectedResponseCode, 'did not return ' + expectedResponseCode);
                        done();
                    });
                });

                queryRequest.on('error', (e) => {
                    assert.fail(null, null, 'problem with bill query name request: ' + e);
                    done();
                });

                queryRequest.end();
        });

    });
});
