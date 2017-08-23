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
            dev: true,
            test: true,
            prod: false
        },
        enableDebugApiLayer: {
            $filter: 'env',
            dev: true,
            test: true,
            prod: false
        },
        authClientId: {
            $filter: 'env',
            dev: 1,
            test: 1,
            prod: 1
        },
        authClientSecret: {
            $filter: 'env',
            dev: 'fefifofum',
            test: 'fefifofum',
            prod: ''
        }
    },
    security: {
        certificate: {
            isSelfSigned: {
                $filter: 'env',
                dev: true,
                test: true,
                prod: false
            }
        }
    },
    auth: {
        svcPort: {
            $filter: 'env',
            dev: 4443,
            test: 4443,
            prod: 443
        },
        ssl: true
    },
    gateway: {
        svcPort: {
            $filter: 'env',
            dev: 3443,
            test: 3443,
            prod: 443
        },
        ssl: true
    },
    userManagementInternalApi: {
        $meta: 'where our internal frame process is running',
        uri: {
            $filter: 'env',
            dev: 'localhost',
            test: 'localhost',
            prod: '',
            $default: 'localhost'
        },
        port: {
            $filter: 'env',
            dev: 9090,
            test: 9090,
            prod: 9090
        },
        pathPrefix: '/api/int/frame'
    },
    rousrApi: {
        rousrUserDataSource: {
            $filter: 'env',
            dev: 'mongodb://root:g0ld0ntheceiling@ds147069.mlab.com:47069/projectwoke',
            test: 'mongodb://root:g0ld0ntheceiling@ds147069.mlab.com:47069/projectwoke',
            prod: ''
        },
        clientsDataSource: {
            $filter: 'env',
            dev: 'ds147069.mlab.com:47069/projectwoke',
            test: 'ds147069.mlab.com:47069/projectwoke',
            prod: ''
        },
        clientsCollection: 'clients',
        tokenDataSource: {
            $filter: 'env',
            dev: 'ds147069.mlab.com:47069/projectwoke',
            test: 'ds147069.mlab.com:47069/projectwoke',
            prod: ''
        },
        tokenCollection: 'tokens',
        congressDataSource: {
            $filter: 'env',
            dev: 'mongodb://root:g0ld0ntheceiling@ds147069.mlab.com:47069/projectwoke',
            test: 'mongodb://root:g0ld0ntheceiling@ds147069.mlab.com:47069/projectwoke',
            prod: ''
        } 
    },
    geoCodeApi: {
        host : {
            $filter: 'env',
            dev: 'api.geocod.io',
            test: 'api.geocod.io',
            prod: 'api.geocod.io'
        },
        path: {
            $filter: 'env',
            dev: '/maps/api/geocode/json?',
            test: '/maps/api/geocode/json?',
            prod: '/maps/api/geocode/json?'
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