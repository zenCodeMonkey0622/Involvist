// testEnv.js
// include this file to configure the test environment

'use strict';

module.exports = {
    
    setTestEnv: function() {
        // set the appropriate environment variables
        process.env.NODE_ENV = 'test';
    }
}