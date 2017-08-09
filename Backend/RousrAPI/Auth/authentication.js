// authentication.js
// defines the routes for oauth 2.0 authentication

const debugUtil = require('../../Shared/Debug/debugUtility');
const express = require('express');
const sharedConfig = require('../../Shared/Config/SharedConfig');
const oauthServer = require('simple-oauth-server');
const csResponse = require('../DataTransfer/CSResponse');
const as = require('./OAuthServiceModels/AuthorizationService');
const authenticationService = new as();
const cs = require('./OAuthServiceModels/ClientService');
const clientService = new cs(null);
const ms = require('./OAuthServiceModels/MembershipService');
const membershipService = new ms();
const ts = require('./OAuthServiceModels/TokenService');
const tokenService = new ts();

var authRouter = express.Router();
var authServer = new oauthServer(clientService,
                                 tokenService,
                                 authenticationService,
                                 membershipService,
                                 3600,
                                 ['password']);

// we use mongodb as our driver to the mongo database
const mongoClient = require('mongodb').MongoClient;
const mongoUri = 'mongodb://root:g0ld0ntheceiling@' + sharedConfig.get('/rousrApi/clientsDataSource');

mongoClient.connect(mongoUri, function (err, db) {
  if (err)
  {
    debugUtil.debugLog('error trying to connect to mongo: ' + err);
  }
  else
  {
    debugUtil.debugLog('authentication module successfully connected to mongo!');
    clientService.ClientDb = db;
    authenticationService.AuthDb = db;
  }
});

authRouter.post('/token', function(req, res, next) {
    authServer.grantAccessToken(req, function(error, token) {
        if (error)
        {
            console.error(error.error_description);
            var csResp = csResponse(false, error.error_description, null);
            res.json(csResp);
        }
        else
        {
          debugUtil.debugLog('authentication service granted token on process id ' + process.pid);
          var csResp = csResponse(true, null, token)
          res.json(csResp);
        }
    });
});

exports.AuthenticationServer = authServer;
exports.AuthenticationRouter = authRouter;
