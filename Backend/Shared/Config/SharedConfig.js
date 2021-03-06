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
        rousrAppClient: {
            id: {
                $filter: 'env',
                dev: '37fb2716-2b11-4eae-80ef-1a39b248cfc9',
                test: 'ddbd5b0c-f892-4361-83c6-286ae4fca58f',
                prod: ''
            },
            secret: {
                $filter: 'env',
                dev: '96c1bb82-6d49-4f1c-a0cc-753afbdb3dc8',
                test: 'cd989f8c-b1b7-4e96-936e-72aaf7cc5406',
                prod: ''
            }
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
            test: 'mongodb://root:traficand0rimas@ds151433.mlab.com:51433/rsrtest',
            prod: ''
        },
        clientsDataSource: {
            uri: {
                $filter: 'env',
                dev: 'ds147069.mlab.com:47069/projectwoke',
                test: 'ds151433.mlab.com:51433/rsrtest',
                prod: ''
            },
            authCreds: {
                user: {
                    $filter: 'env',
                    dev: 'root',
                    test: 'root',
                    prod: ''
                },
                password: {
                    $filter: 'env',
                    dev: 'g0ld0ntheceiling',
                    test: 'traficand0rimas',
                    prod: ''
                }
            }
        },
        clientsCollection: 'clients',
        tokenDataSource: {
            $filter: 'env',
            dev: 'ds147069.mlab.com:47069/projectwoke',
            test: 'ds151433.mlab.com:51433/rsrtest',
            prod: ''
        },
        tokenCollection: 'tokens',
        congressDataSource: {
            uri: {
                $filter: 'env',
                dev: 'ds147069.mlab.com:47069/projectwoke',
                test: 'ds151433.mlab.com:51433/rsrtest',
                prod: ''
            },
            authCreds: {
                user: {
                    $filter: 'env',
                    dev: 'root',
                    test: 'root',
                    prod: ''
                },
                password: {
                    $filter: 'env',
                    dev: 'g0ld0ntheceiling',
                    test: 'traficand0rimas',
                    prod: ''
                }
            }
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
    currentCongress: '115'
};

const store = new Confidence.Store(config);

exports.get = function(key) {
    return store.get(key, criteria);
};

exports.meta = function(key) {
    return store.meta(key, criteria);
};