// index.js
// main entry-point for involvist client services

var auth = require('./auth/authentication.js');
var express = require('express');
var app = express();

app.use('/oauth', auth.authenticationRouter);

// debug
app.listen('3000', function () {
    console.log('listening on 3000');
});
