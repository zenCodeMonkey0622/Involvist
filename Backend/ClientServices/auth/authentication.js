// authentication.js
// defines the routes for oauth 2.0 authentication

var express = require('express');
var constants = require('../../Shared/SharedConstants');
var oauthServer = require('simple-oauth-server');
const csResponse = require('../DataTransfer/CSResponse');
var as = require('./OAuthServiceModels/AuthorizationService');
var authenticationService = new as();
var cs = require('./OAuthServiceModels/ClientService');
var clientService = new cs(null);
var ms = require('./OAuthServiceModels/MembershipService');
var membershipService = new ms();
var ts = require('./OAuthServiceModels/TokenService');
var tokenService = new ts();

var authRouter = express.Router();
var authServer = new oauthServer(clientService,
                                 tokenService,
                                 authenticationService,
                                 membershipService,
                                 3600,
                                 ['password']);

var mongoClient = require('mongodb').MongoClient;
var mongoUri = 'mongodb://root:g0ld0ntheceiling@' + constants.CLIENTS_DATA_SOURCE;

mongoClient.connect(mongoUri, function (err, db) {
  if (err)
  {
    console.log('error trying to connect to mongo: ', err);
  }
  else
  {
    console.log('authentication module successfully connected to mongo!');
    clientService.ClientDb = db;
    authenticationService.AuthDb = db;
  }
});

authRouter.post('/token', function(req, res, next) {
    authServer.grantAccessToken(req, function(error, token) {
        if (error)
        {
            var csResp = csResponse(false, error.error_description, null);
            res.json(csResp);
        }
        else
        {
          console.log('authentication service granted token on process id ' + process.pid);
          var csResp = csResponse(true, null, token)
          res.json(csResp);
        }
    });
});

exports.AuthenticationServer = authServer;
exports.AuthenticationRouter = authRouter;
