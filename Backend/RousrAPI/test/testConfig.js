// testConfig.js
// configuration file for the rousr api unit tests

'use strict';

const sharedConfig = require('../../Shared/Config/SharedConfig');

module.exports = {
    TEST_AUTH_URI: 'localhost',
    TEST_AUTH_ENDPOINT: '/oauth/token',
    TEST_CLIENT_ID: sharedConfig.get('/debug/rousrAppClient/id'),
    TEST_ROUSR_API_URI: 'localhost',
    TEST_CONGRESS_BILLS_ENDPOINT: '/api/v1/bills',
    TEST_CONGRESS_BILLS_QUERYNAME_PATH: '/name/',
    TEST_CONGRESS_BILLS_QUERYNUMBER_PATH: '/number/',
    TEST_CONGRESS_BILLS_QUERYSUBJECT_PATH: '/subject/',
    TEST_ADDRESS_TO_DISTRICT_PATH: '/api/v1/locations/congress/district/',
    TEST_USER_ENDPOINT: '/api/v1/users',
    TEST_USER_FOLLOWINGBILLS_PATH: '/bills',
    TEST_USER: 'rhr@rousr.io',
    TEST_PASSWORD: 'traficand0rimas',

    // options to allow self-signed ssl communication
    TEST_HTTP_OPTIONS: {
        rejectUnauthorized: !sharedConfig.get('/security/certificate/isSelfSigned')
    }
}