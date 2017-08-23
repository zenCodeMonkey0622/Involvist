'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');
const rsrSharedConfig = require('../../../Shared/Config/SharedConfig.js');

Dotenv.config({ silent: true });

const criteria = {
    env: process.env.NODE_ENV
};

const config = {
    $meta: 'This file configures the plot device.',
    projectName: 'Involvist',
    port: {
        web: {
            $filter: 'env',
            test: 9090,
            production: process.env.PORT,
            dev: 9090,
            $default: 9000
        }
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: '!k3yb04rdK4tz~4qu4~k3yb04rdd0gz!'
    },
    hapiMongoModels: {
        mongodb: {
            uri: {
                $filter: 'env',
                production: process.env.MONGODB_URI,
                test: rsrSharedConfig.get('/rousrApi/rousrUserDataSource'),
                dev: rsrSharedConfig.get('/rousrApi/rousrUserDataSource'),
                $default: 'mongodb://localhost:27017/frame'
            }
        },
        autoIndex: true
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'involvist.hi@gmail.com',
            pass: 'Glitterandg0ld'
        }
    },
    system: {
        fromAddress: {
            name: 'Frame',
            address: 'jedireza@gmail.com'
        },
        toAddress: {
            name: 'Frame',
            address: 'jedireza@gmail.com'
        }
    },
    api: {
      prefix: '/api/int/frame'
    }
};


const store = new Confidence.Store(config);

exports.get = function (key) {
    return store.get(key, criteria);
};


exports.meta = function (key) {
    return store.meta(key, criteria);
};
