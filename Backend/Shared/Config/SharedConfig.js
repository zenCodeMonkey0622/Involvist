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
            production: false
        },
        authClientId: {
            $filter: 'env',
            test: 1,
            production: 1
        },
        authClientSecret: {
            $filter: 'env',
            test: 'fefifofum',
            production: ''
        }
    },
    security: {
        certificate: {
            isSelfSigned: {
                $filter: 'env',
                test: true,
                production: false
            }
        }
    },
    auth: {
        svcPort: {
            $filter: 'env',
            test: 4443,
            production: 443
        },
        ssl: true
    },
    gateway: {
        svcPort: {
            $filter: 'env',
            test: 3443,
            production: 443
        },
        ssl: true
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
            production: 9090
        },
        pathPrefix: '/api/int/frame'
    },
    rousrApi: {
        clientsDataSource: {
            $filter: 'env',
            test: 'ds147069.mlab.com:47069/projectwoke',
            production: ''
        },
        clientsCollection: 'clients',
        tokenDataSource: {
            $filter: 'env',
            test: 'ds147069.mlab.com:47069/projectwoke',
            production: ''
        },
        tokenCollection: 'tokens',
        congressDataSource: 'mongodb://root:g0ld0ntheceiling@ds147069.mlab.com:47069/projectwoke'
    },
    geoCodeApi: {
        host : {
            $filter: 'env',
            test: 'maps.googleapis.com',
            production: 'maps.googleapis.com'
        },
        path: {
            $filter: 'env',
            test: '/maps/api/geocode/json?',
            production: '/maps/api/geocode/json?'
        }
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