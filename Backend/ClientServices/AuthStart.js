// authStart.js
// main entry-point for involvist client authentication services

const auth = require('./auth/authentication');
const gateway = require('./endpoints/gateway');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/oauth', auth.AuthenticationRouter);

// todo: launch the api gateway on its own child process?
app.use('/api', gateway);

// debug
app.listen('3000', function () {
    console.log('auth app listening on 3000');
});
