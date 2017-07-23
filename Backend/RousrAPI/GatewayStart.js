// GatewayStart.js
// main entry point for rousr api gateway

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

// create the gateway https server with ssl options
var serverOptions = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
};

const port = sharedConfig.get('/gatewaySvcPort');
https.createServer(serverOptions, gatewayApp).listen(port, () => {
    debugUtil.debugLog('rousr gateway server listening on https port ' + port);
});