// addressToDistrictTests.js
// unit test for address to congressional district API

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

