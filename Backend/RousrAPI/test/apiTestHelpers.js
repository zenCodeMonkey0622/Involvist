// apiTestHelpers.js
// utilities to help run the api integration tests

'use strict';

// set the appropriate environment variables
process.env.NODE_ENV = 'test';

const https = require('https');	
const querystring = require('querystring');
const testConfig = require('./testConfig');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const sharedConfig = require('../../Shared/Config/SharedConfig');

module.exports = {

    /**
     * getAuthToken - gets an authentication token from
     * the Rousr auth service
     * @param {string} user - user name
     * @param {password} password - account password
     * @param {function(err, token} callback - callback function
     */
    getAuthToken: function(user, password, callback) {

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
            null,
            formData,
            httpUtil.contentType.JSON,
            null,
            testConfig.TEST_HTTP_OPTIONS,
            (res) => {
                var responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode == '200') {
                        // parse the json
                        var response = JSON.parse(responseData);
                        var testAuthToken = response.data.access_token;
                        callback(null, testAuthToken);
                    }
                    else {
                        callback(new Error('authentication response not 200'));
                    }
                });
            });

            queryRequest.on('error', (e) => {
                callback(e, null);
            });

            queryRequest.write(formData);
            queryRequest.end();
        }
}