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

describe('Rousr User API', function() {
    
        describe('User Follows Bill', function() {
    
            it('GET should return 401 Unauthorized', function(done) {

                const expectedResponseCode = '401';
                const rsrUid = 'tst_userfollows_unauth_rsruid';

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
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
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
            });

            it('POST should return 401 Unauthorized', function(done) {
                
                const expectedResponseCode = '401';
                const rsrUid = 'tst_userfollows_unauth_rsruid';

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
                    httpUtil.requestType.POST,
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
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
            });

            it('DELETE should return 401 Unauthorized', function(done) {
                
                const expectedResponseCode = '401';
                const rsrUid = 'tst_userfollows_unauth_rsruid';

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
                    httpUtil.requestType.DELETE,
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
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
            });

            it('GET should return 404 user not found', function(done) {

                const expectedResponseCode = '404';
                const rsrUid = 'tst_unknownuser_rsruid';

                debugger;

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
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

                            const responseObj = JSON.parse(responseData);

                            assert.equal(res.statusCode, expectedResponseCode, 
                                'expected ' + expectedResponseCode + ' but received ' + res.statusCode);
                            done();
                        });
                    });
    
                    queryRequest.on('error', (e) => {
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
            });

            it('POST should return 404 user not found', function(done) {
                
                const expectedResponseCode = '404';
                const rsrUid = 'tst_unknownuser_rsruid';

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
                    httpUtil.requestType.POST,
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
                            assert.equal(res.statusCode, expectedResponseCode, 
                                'expected ' + expectedResponseCode + ' but received ' + res.statusCode);
                            done();
                        });
                    });
    
                    queryRequest.on('error', (e) => {
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
            });

            it('DELETE should return 404 user not found', function(done) {

                const expectedResponseCode = '404';
                const rsrUid = 'tst_unknownuser_rsruid';

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
                    httpUtil.requestType.DELETE,
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
                            assert.equal(res.statusCode, expectedResponseCode, 
                                'expected ' + expectedResponseCode + ' but received ' + res.statusCode);
                            done();
                        });
                    });
    
                    queryRequest.on('error', (e) => {
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
            });

            it('POST should return 404 bill not found', function(done) {
                
                const expectedResponseCode = '404';
                const rsrUid = 'tst_userfollows_invalidbill_rsruid';
                const invalidBillNumber = 'a.c.360';

                const form = {
                    bill_number: invalidBillNumber
                };
            
                const formData = querystring.stringify(form);

                const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_ROUSR_API_URI,
                    sharedConfig.get('/gateway/svcPort'),
                    testConfig.TEST_USER_ENDPOINT + '/' + rsrUid + testConfig.TEST_USER_FOLLOWINGBILLS_PATH,
                    httpUtil.requestType.POST,
                    secureAgent,
                    formData,
                    httpUtil.contentType.JSON,
                    {'Authorization': 'Bearer ' + testAuthToken},
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
                        assert.fail(null, null, 'problem with user follows bills request: ' + e);
                        done();
                    });
    
                    queryRequest.end();
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

            // todo: remove a bill from a user

            // todo: remove a bill from a user that is not following tha tbill

            // todo: remove a bill should remove meta object
        });
    });