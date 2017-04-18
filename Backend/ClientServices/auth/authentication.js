// authentication.js
// defines the routes for oauth 2.0 authentication

var express = require('express');
var constants = require('../constants');
var oauthServer = require('simple-oauth-server');
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

    /*
    authServer = new oauthServer(
      clientService,
      tokenService,
      authenticationService,
      membershipService,
      3600,
      ['password']);
    */
  }
});

authRouter.post('/token', function(req, res, next) {
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

exports.AuthenticationServer = authServer;
exports.AuthenticationRouter = authRouter;
