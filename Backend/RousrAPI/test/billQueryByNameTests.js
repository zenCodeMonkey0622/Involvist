// billQueryByNameTests.js
// unit testing suite for Rousr API bill query by name
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

var authToken = '';

// options to allow self-signed ssl communication
const options = {rejectUnauthorized: !sharedConfig.get('/security/certificate/isSelfSigned')};

/**
 * before() - runs code before all tests are loaded
 * * @param {function()} done - callback executed when async code is complete.
 */
before( function(done) {

    console.log('performing before() authentication...');

    const form = {
        grant_type: 'password',
        client_id: '1',
        username: testConfig.TEST_USER,
        password: testConfig.TEST_PASSWORD
    };

    const formData = querystring.stringify(form);

    debugger;

    // get an authentication token for this test
    const queryRequest = httpUtil.makeHttpRequest(testConfig.TEST_AUTH_URI,
        sharedConfig.get('/auth/svcPort'),
        testConfig.TEST_AUTH_ENDPOINT,
        httpUtil.requestType.POST,
        null,
        formData,
        httpUtil.contentType.JSON,
        null,
        (res) => {
            var responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode == '200') {
                    // parse the json
                    var response = JSON.parse(responseData);
                    authToken = response.data.access_token;
                    console.log('received auth response: ' + response);
                }
                done();
            });
        });

        queryRequest.on('error', (e) => {
            console.log('problem with authentication request: ' + e);
            done();
        });

        queryRequest.write(formData);
        queryRequest.end();
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
                testConfig.TEST_CONGRESS_BILLS_ENDPOINT + testConfig.TEST_CONGRESS_BILLS_QUERYNAME_PATH + '/HR1055',
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