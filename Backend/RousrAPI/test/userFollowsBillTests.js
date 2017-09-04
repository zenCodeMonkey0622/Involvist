// userFollowsBillTests.js
// unit tests for user following bills api

'use strict';

const env = require('./testEnv').setTestEnv();

const https = require('https');	
const assert = require('assert');
const querystring = require('querystring');
const testConfig = require('./testConfig');
const testHelpers = require('./apiTestHelpers');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const sharedConfig = require('../../Shared/Config/SharedConfig');

const secureAgent = new https.Agent({keepAlive: true});

var testAuthToken = '';

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

// 'done' parameter used on async code. call done() after
// last assert so mocha knows it needs to wait before executing
// other tests

describe('Rousr API', function() {
    
        describe('User Follows Bill', function() {
    
            it('get should return 401 Unauthorized', function(done) {

                const expectedResponseCode = '401';
                const rsrUid = '';

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNAME_PATH + billName,
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

            it('should return unknown user response', function(done) {
                assert.fail(null, null, 'unit test not implemented');
            });

            it('should add bill id to user object', function(done) {
                assert.fail(null, null, 'unit test not implemented');
            });

            it('should not add bill id again to user object', function(done) {
                assert.fail(null, null, 'unit test not implemented');
            });

            it('should create a relationship meta object', function(done) {
                assert.fail(null, null, 'unit test not implemented');
            });

            it('should not create more than one relationship meta object', function(done) {
                assert.fail(null, null, 'unit test not implemented');
            });
        });
    });