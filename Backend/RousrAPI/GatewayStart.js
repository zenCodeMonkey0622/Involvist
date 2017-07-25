// GatewayStart.js
// main entry point for rousr api gateway

const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const gateway = require('./endpoints/gateway');
const debugUtil = require('../Shared/Debug/debugUtility');
const sharedConfig = require('../Shared/Config/SharedConfig');

var gatewayApp = express();

gatewayApp.use(bodyParser.json());
gatewayApp.use('/api', gateway);

const port = sharedConfig.get('/gateway/svcPort');
var launchSecure = sharedConfig.get('/gateway/ssl');

if (launchSecure) {
    // create the gateway https server with ssl options
    var serverOptions = {
        key: fs.readFileSync('ssl/server.key'),
        cert: fs.readFileSync('ssl/server.crt')
    };

    https.createServer(serverOptions, gatewayApp).listen(port, () => {
        debugUtil.debugLog('rousr gateway server listening on https port ' + port);
    });
}
else {
    http.createServer(gatewayApp).listen(port, () => {
        debugUtil.debugLog('rousr gateway server listening on http port ' + port);
    });
}
