// authStart.js
// main entry-point for involvist client authentication services

const auth = require('./auth/authentication');
const gateway = require('./endpoints/gateway');
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/oauth', auth.AuthenticationRouter);

// todo: launch the api gateway on its own child process? 
app.use('/api', gateway);

// create the authentication https server with ssl options
var serverOptions = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
};

https.createServer(serverOptions, app).listen(3443, () => {
    console.log('rousr secure authentication and gateway server listening on port 3443');
});
