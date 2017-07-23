// billQueryByNameTests.js
// unit testing suite for Rousr API bill query by name
'use strict';

// set the appropriate environment variables
process.env.NODE_ENV = 'test';

const https = require('https');	
const assert = require('assert');
const config = require('./testConfig');
const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const sharedConfig = require('../../Shared/Config/SharedConfig');
const secureAgent = new https.Agent({keepAlive: true});

describe('Rousr API', function() {

    describe('Bill Query By Name', function() {

        // 'done' parameter used on async code. call done() after
        // last assert.
        it('should return 401 Unauthorized', function(done) {

            const options = {rejectUnauthorized: !sharedConfig.get('/security/certificate/isSelfSigned')};
            const expectedResponseCode = '401';

            const queryRequest = httpUtil.makeHttpsRequest(config.TEST_CONGRESS_API_URI,
                sharedConfig.get('/gatewaySvcPort'),
                config.TEST_CONGRESS_BILLS_ENDPOINT + config.TEST_CONGRESS_BILLS_QUERYNAME_PATH + '/HR1055',
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