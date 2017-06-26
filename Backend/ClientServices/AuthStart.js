// authStart.js
// main entry-point for involvist client authentication services

const auth = require('./auth/authentication');
const gateway = require('./endpoints/gateway');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/oauth', auth.AuthenticationRouter);

// todo: launch the api gateway on its own child process? 
app.use('/api', gateway);

// create the authentication http server
http.createServer(app).listen(3000, () => {
    console.log('rouser authentication server listening on port 3000');
});