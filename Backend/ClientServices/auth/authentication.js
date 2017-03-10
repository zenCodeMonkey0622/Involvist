// authentication.js
// defines the routes for oauth 2.0 authentication

var express = require('express');
var constants = require('../constants.js');

var authRouter = express.Router();
var authSrv = require('simple-oauth-server');

authRouter.post('/authenticate', function(req, res, next) {
    // debug response:
    console.log('post to ', req.originalUrl);
    console.log('user manage data source: ', constants.USER_MANAGEMENT_DATA_SOURCE);
    res.end();
});

authRouter.post('/token', function(req, res, next) {
    // debug response:
    console.log('post to ', req.originalUrl);
    
    authSrv.grantAccessToken(req, function(error, token) {
        if (error) {
            response.statusCode = 400;
            return resp.end();
        }
        
        response.end(token);
});

module.exports = authRouter;
