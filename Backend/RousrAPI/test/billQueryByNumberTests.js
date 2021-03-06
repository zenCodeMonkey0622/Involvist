// billQueryByNumberTests.js
// unit testing suite for Rousr API bill query by bill number
'use strict';

const env = require('./testEnv').setTestEnv();

const https = require('https');	
const assert = require('assert');
const querystring = require('querystring');
const testConfig = require('./testConfig');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const sharedConfig = require('../../Shared/Config/SharedConfig');
const testHelpers = require('./apiTestHelpers');
const secureAgent = new https.Agent({keepAlive: true});

var testAuthToken = '';

const billNumber = 'H.R.3114'

/**
 * before() - runs code before all tests are loaded
 * * @param {function()} done - callback executed when async code is complete.
 */
before( function(done) {

    // increase the timeout for this query
    this.timeout(5000);
    
    testHelpers.getAuthToken(testConfig.TEST_USER,
        testConfig.TEST_PASSWORD,
        (err, token) => {
            if (err) {
                assert.fail('unable to get authentication token ' + err);
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

describe('Rousr Bills API', function() {

    describe('Bill Query By Number', function() {

        // 'done' parameter used on async code. call done() after
        // last assert so mocha knows it needs to wait before executing
        // other tests
        it('should return 401 Unauthorized', function(done) {

            const expectedResponseCode = '401';

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNUMBER_PATH + billNumber,
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
                        assert.equal(res.statusCode, expectedResponseCode, 
                            'expected ' + expectedResponseCode + ' but received ' + res.statusCode);
                        done();
                    });
                });

                queryRequest.on('error', (e) => {
                    assert.fail(null, null, 'problem with bill query number request: ' + e);
                    done();
                });

                queryRequest.end();
        });

        it('should return one bill matching the number ' + billNumber, function(done) {

            const expectedResponseCode = '200';
            const expectedReturnCount = 1;

            debugger;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNUMBER_PATH + billNumber,
                httpUtil.requestType.GET,
                secureAgent,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': 'Bearer ' + testAuthToken},
                testConfig.TEST_HTTP_OPTIONS,
                (res) => {
                    var responseData = '';

                    res.on('data', (chunk) => {
                        responseData += chunk;
                    });

                    res.on('end', () => {
                        assert.equal(res.statusCode, expectedResponseCode, 'did not return ' + expectedResponseCode);

                        const responseObj = JSON.parse(responseData);

                        if (responseObj == null) {
                            assert.fail('deserialization failure');
                            done();
                        }

                        if (responseObj.data != null) {
                            assert.equal(responseObj.data.length, expectedReturnCount, 'response count mismatch');
                            var billData = responseObj.data[0];
                            assert.equal(billData.number, billNumber, 'did not return expected bill');
                        }
                        else {
                            assert.fail(null, null, 'response data was null');
                        }
                        done();
                    });
                });

                queryRequest.on('error', (e) => {
                    assert.fail(null, null, 'problem with bill query name request: ' + e);
                    done();
                });

                queryRequest.end();
        });

        it('should return 404 bill not found', function(done) {

            const expectedResponseCode = '404';
            const expectedReturnCount = 0;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNUMBER_PATH + 'feefifofum',
                httpUtil.requestType.GET,
                secureAgent,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': 'Bearer ' + testAuthToken},
                testConfig.TEST_HTTP_OPTIONS,
                (res) => {
                    var responseData = '';

                    res.on('data', (chunk) => {
                        responseData += chunk;
                    });

                    res.on('end', () => {
                        assert.equal(res.statusCode, expectedResponseCode, 'did not return ' + expectedResponseCode);

                        const responseObj = JSON.parse(responseData);

                        if (responseObj == null) {
                            assert.fail('deserialization failure');
                            done();
                        }

                        assert.equal(responseObj.data, null, 'response data mismatch');
                        done();
                    });
                });

                queryRequest.on('error', (e) => {
                    assert.fail(null, null, 'problem with bill query number request: ' + e);
                    done();
                });

                queryRequest.end();
        });
    });
});