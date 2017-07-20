// SharedConfig.js
// shared configuration using confidence

'use strict';

const Confidence = require('confidence');

// our criteria filter for the configuration
const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file is shared configuration among the Rousr back-end services.',
    projectName: 'rousr-shared',
    debug: {
        enableLogOutput: {
            $filter: 'env',
            test: true,
            production: false,
            $default: true
        }
    },
    authSvcPort: {
        $filter: 'env',
        test: 4443,
        production: 443,
        $default: 4443
    },
    gatewaySvcPort: {
        $filter: 'env',
        test: 3443,
        production: 443,
        $default: 3443
    },
    userManagementInternalApi: {
        $meta: 'where our internal frame process is running',
        uri: {
            $filter: 'env',
            test: 'localhost',
            production: '',
            $default: 'localhost'
        },
        port: {
            $filter: 'env',
            test: 9090,
            production: 9090,
            $default: 9090
        },
        pathPrefix: '/api/int/frame'
    },
    rousrApi: {
        clientsDataSource: {
            $filter: 'env',
            test: 'ds147069.mlab.com:47069/projectwoke',
            production: '',
            $default: 'ds147069.mlab.com:47069/projectwoke'
        },
        clientsCollection: 'clients',
        tokenDataSource: {
            $filter: 'env',
            test: 'ds147069.mlab.com:47069/projectwoke',
            production: '',
            $default: 'ds147069.mlab.com:47069/projectwoke'
        },
        tokenCollection: 'tokens',
    },
    currentCongress: '115',
};

const store = new Confidence.Store(config);

exports.get = function(key) {
    return store.get(key, criteria);
};

exports.meta = function(key) {
    return store.meta(key, criteria);
};