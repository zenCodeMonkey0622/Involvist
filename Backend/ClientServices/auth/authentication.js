// authentication.js
// defines the routes for oauth 2.0 authentication

var express = require('express');
var constants = require('../constants.js');
var oauthServer = require('simple-oauth-server');
var authService = require('./AuthorizationService');
var clientService = require('./ClientService');
var membershipService = require('./MembershipService');
var tokenService = require('./TokenService');

var authRouter = express.Router();

var authServer = new oauthServer(
    new clientService(),
    new tokenService(),
    new authService(),
    new membershipService(),
    3600,
    ['password']);

authRouter.post('/token', function(req, res, next) {
    // debug response:
    console.log('post: ', req.originalUrl);
    authServer.grantAccessToken(req, function(error, token) {
        if (error)
        {
            console.log('error: ', error);
            res.statusCode = 400;
            return res.end();
        }
        res.end(JSON.stringify(token));
    });
});

module.exports = authRouter;