// index.js
// main entry-point for involvist client services

var auth = require('./auth/authentication');
var gateway = require('./endpoints/gateway');
var express = require('express');
var app = express();


app.use('/oauth', auth.AuthenticationRouter);
app.use('/api', gateway);

// debug
app.listen('3000', function () {
    console.log('auth app listening on 3000');
});
