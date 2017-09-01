// billQueryBySubjectTests.js
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

const billSubject = 'Health'

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

describe('Rousr API', function() {

    describe('Bill Query By Subject', function() {

        // 'done' parameter used on async code. call done() after
        // last assert so mocha knows it needs to wait before executing
        // other tests
        it('should return 401 Unauthorized', function(done) {

            const expectedResponseCode = '401';

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYSUBJECT_PATH + billSubject,
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
                    assert.fail(null, null, 'problem with bill query subject request: ' + e);
                    done();
                });

                queryRequest.end();
        });

        it('should return at least one bill matching the primary subject ' + billSubject, function(done) {

            // increase the timeout for this query
            this.timeout(5000);

            const expectedResponseCode = '200';
            const expectedReturnCount = 600;

            debugger;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYSUBJECT_PATH + billSubject,
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
                            assert.equal(responseObj.data.length, expectedReturnCount, 'expected ' + expectedReturnCount + ' bills but received ' + responseObj.data.length);
                        }
                        else {
                            assert.fail(null, null, 'response data was null');
                        }
                        done();
                    });
                });

                queryRequest.on('error', (e) => {
                    assert.fail(null, null, 'problem with bill query subject request: ' + e);
                    done();
                });

                queryRequest.end();
        });

        it('should return zero bills matching the primary subject ' + billSubject, function(done) {

            const expectedResponseCode = '200';
            const expectedReturnCount = 0;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYSUBJECT_PATH + 'feefifofum',
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
                    assert.fail(null, null, 'problem with bill query subject request: ' + e);
                    done();
                });

                queryRequest.end();
        });
    });
});