// AuthStart.js
// main entry-point for involvist client authentication services

const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth/authentication');
const debugUtil = require('../Shared/Debug/debugUtility');
const sharedConfig = require('../Shared/Config/SharedConfig');

var authApp = express();

authApp.use(bodyParser.json());
authApp.use('/oauth', auth.AuthenticationRouter);

const port = sharedConfig.get('/auth/svcPort');
var launchSecure = sharedConfig.get('/auth/ssl');

if (launchSecure) {
    // create the authentication https server with ssl options
    var serverOptions = {
        key: fs.readFileSync('ssl/server.key'),
        cert: fs.readFileSync('ssl/server.crt')
    };

    https.createServer(serverOptions, authApp).listen(port, () => {
        debugUtil.debugLog('rousr authentication server listening on https port ' + port);
    });
}
else {
    http.createServer(authApp).listen(port, () => {
        debugUtil.debugLog('rousr authentication server listening on http port ' + port);
    });
}

