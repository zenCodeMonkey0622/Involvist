// billQueryByNumberTests.js
// unit testing suite for Rousr API bill query by bill number
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

const billName = 'HR3114'

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

    describe('Bill Query By Name', function() {

        // 'done' parameter used on async code. call done() after
        // last assert so mocha knows it needs to wait before executing
        // other tests
        it('should return 401 Unauthorized', function(done) {

            const expectedResponseCode = '401';

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNAME_PATH + billName,
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
                    assert.fail(null, null, 'problem with bill query name request: ' + e);
                    done();
                });

                queryRequest.end();
        });

        it('should return one bill matching the name', function(done) {

            const expectedResponseCode = '200';
            const expectedReturnCount = 1;

            debugger;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNAME_PATH + billName,
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

                        if (responseObj.data != null){
                            assert.equal(responseObj.data.length, expectedReturnCount, 'response count mismatch');
                            var billData = responseObj.data[0];
                            assert.equal(billData.name, billName, 'did not return expected bill');
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

        it('should return zero bills matching the name', function(done) {

            const expectedResponseCode = '200';
            const expectedReturnCount = 0;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNAME_PATH + 'feefifofum',
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
                        assert.equal(responseObj.data, null, 'response data mismatch');

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