// index.js
// main entry-point for involvist client services

var auth = require('./auth/authentication.js');
var gateway = require('./endpoints/gateway.js');
var express = require('express');
var app = express();

app.use('/oauth', auth.AuthenticationRouter);
app.use('/api', gateway);

// debug
app.listen('3000', function () {
    console.log('listening on 3000');
});
