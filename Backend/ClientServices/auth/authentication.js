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

authRouter.post('/authenticate', function(req, res, next) {
    // debug response:
    console.log('post to ', req.originalUrl);
    console.log('user manage data source: ', constants.USER_MANAGEMENT_DATA_SOURCE);
    res.end();
});

var authServer = new oauthServer(
    new clientService(),
    new tokenService(),
    new authService(),
    new membershipService(),
    3600,
    ['password']);

authRouter.post('/token', function(req, res, next) {
    // debug response:
    console.log('post to ', req.originalUrl);
    authServer.grantAccessToken(req, function(error, token) {
        if (error)
        {
            res.statusCode = 400;
            return res.end();
        }
        res.end(token);
    });
});

module.exports = authRouter;
