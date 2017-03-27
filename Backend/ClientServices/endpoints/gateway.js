// endpointsGateway.js
// the gateway through which all requests to the Involvist APIs routes

var express = require('express');
var endpointTest = require('./test');
var authServer = require('../auth/authentication').AuthenticationServer;

var gatewayRouter = express.Router();

gatewayRouter.use('/v1', function(req, res, next) {
  // debug
  console.log('reached endpointsGateway');

  // verify access token
  authServer.validateAccessToken(req, function(error, validationResult) {
      if(error)
      {
          res.statusCode = 401;
          return res.end(JSON.stringify({'error': error.message}));
      }
      else
      {
        next();
      }
  });
});

gatewayRouter.use('/v1/test', endpointTest);

module.exports = gatewayRouter;
