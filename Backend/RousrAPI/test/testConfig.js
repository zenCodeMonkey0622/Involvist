// testConfig.js
// configuration file for the rousr api unit tests

'use strict';

module.exports = {
    TEST_AUTH_URI: 'localhost',
    TEST_AUTH_ENDPOINT: '/oauth/token',
    TEST_CLIENT_ID: '1',
    TEST_CONGRESS_API_URI: 'localhost',
    TEST_CONGRESS_BILLS_ENDPOINT: '/api/v1/bills',
    TEST_CONGRESS_BILLS_QUERYNAME_PATH: '/name/',
    TEST_CONGRESS_BILLS_QUERYNUMBER_PATH: '/number/',
    TEST_CONGRESS_BILLS_QUERYSUBJECT_PATH: '/subject/',
    TEST_USER: 'rhr@rousr.io',
    TEST_PASSWORD: 'feefifofum',
}