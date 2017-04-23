// endpointsGateway.js
// the gateway through which all requests to the Involvist APIs routes

const gatewayRouter = require('express').Router();
const newUserReg = require('./newUserRegistration');
const endpointBills = require('./bills');
const authServer = require('../auth/authentication').AuthenticationServer;

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

gatewayRouter.use('/v1/registration', newUserReg);
gatewayRouter.use('/v1/bills', endpointBills);

module.exports = gatewayRouter;
