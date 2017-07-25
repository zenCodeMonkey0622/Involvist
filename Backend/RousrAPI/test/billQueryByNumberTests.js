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
const secureAgent = new https.Agent({keepAlive: true});

var testAuthToken = '';

// options to allow self-signed ssl communication
const options = {rejectUnauthorized: !sharedConfig.get('/security/certificate/isSelfSigned')};
const billNumber = 'H.R.3114'
/**
 * before() - runs code before all tests are loaded
 * * @param {function()} done - callback executed when async code is complete.
 */
before( function(done) {

    const form = {
        grant_type: 'password',
        client_id: testConfig.TEST_CLIENT_ID,
        username: testConfig.TEST_USER,
        password: testConfig.TEST_PASSWORD
    };

    const formData = querystring.stringify(form);

    // get an authentication token for this test
    const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_AUTH_URI,
        sharedConfig.get('/auth/svcPort'),
        testConfig.TEST_AUTH_ENDPOINT,
        httpUtil.requestType.POST,
        secureAgent,
        formData,
        httpUtil.contentType.JSON,
        null,
        options,
        (res) => {
            var responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode == '200') {
                    // parse the json
                    var response = JSON.parse(responseData);
                    assert.equal(response.success, true, 'response success not true');
                    assert.equal(response.data.token_type, 'Bearer', 'token type mismatch');
                    assert.notEqual(response.data.access_token.length, 0, 'invalid access token');
                    testAuthToken = response.data.access_token;
                }
                else {
                    assert.fail(null, null, 'authentication response not 200');
                }
                done();
            });
        });

        queryRequest.on('error', (e) => {
            assert.fail(null, null, 'problem with authentication request: ' + e);
            done();
        });

        queryRequest.write(formData);
        queryRequest.end();
});

describe('Rousr API', function() {

    describe('Bill Query By Number', function() {

        // 'done' parameter used on async code. call done() after
        // last assert so mocha knows it needs to wait before executing
        // other tests
        it('should return 401 Unauthorized', function(done) {

            const expectedResponseCode = '401';

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNUMBER_PATH + billNumber,
                httpUtil.requestType.GET,
                secureAgent,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': null},
                options,
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

        it('should return one bill matching the number', function() {

            const expectedResponseCode = '200';
            const expectedReturnCount = 1;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNUMBER_PATH + billNumber,
                httpUtil.requestType.GET,
                secureAgent,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': 'Bearer ' + testAuthToken},
                options,
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
                    assert.equal(res.data.length, expectedReturnCount, 'response count mismatch');
                    var billData = res.data[0];
                    assert.equal(billData.number, billNumber, 'did not return expected bill');
                    done();
                });

                queryRequest.end();
        });

        it('should return zero bills matching the number', function() {

            const expectedResponseCode = '200';
            const expectedReturnCount = 0;

            const queryRequest = httpUtil.makeHttpsRequest(testConfig.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gateway/svcPort'),
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNUMBER_PATH + 'feefifofum',
                httpUtil.requestType.GET,
                secureAgent,
                null,
                httpUtil.contentType.JSON,
                {'Authorization': 'Bearer ' + testAuthToken},
                options,
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
                    assert.equal(res.data.length, expectedReturnCount, 'response count mismatch');
                    done();
                });

                queryRequest.end();
        });
    });
});