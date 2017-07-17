// GatewayStart.js
// main entry point for rousr api gateway

const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const gateway = require('./endpoints/gateway');
const debugUtil = require('../Shared/Debug/debugUtility');

var gatewayApp = express();

gatewayApp.use(bodyParser.json());
gatewayApp.use('/api', gateway);

// create the gateway https server with ssl options
var serverOptions = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
};

https.createServer(serverOptions, gatewayApp).listen(4443, () => {
    debugUtil.debugLog('rousr gateway server listening on https port 4443');
});