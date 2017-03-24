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
  authServer.validateAccessToken(request, function(error, validationResult) {
      if(error)
      {
          response.statusCode = 401;
          return response.end(JSON.stringify(error));
      }
      next();
  });
});

gatewayRouter.use('/v1/test', endpointTest);

module.exports = gatewayRouter;
