// index.js
// main entry-point for involvist client services

var express = require('express');
var app = express();

app.use('/oauth', require('./auth/authentication.js'));

// debug
app.listen('3000', function () {
    console.log('listening on 3000');
});

