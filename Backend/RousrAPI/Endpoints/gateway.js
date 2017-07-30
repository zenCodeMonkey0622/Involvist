// endpointsGateway.js
// the gateway through which all requests to the Involvist APIs routes

const gatewayRouter = require('express').Router();
const newUserReg = require('./newUserRegistration');
const endpointBills = require('./bills');
const authServer = require('../auth/authentication').AuthenticationServer;
const endpointErrors = require('./errors');
const endpointUsers = require('./users');
const endpointLocation = require('./locations');
const debugUtil = require('../../Shared/Debug/debugUtility');

/**
* helper function to exclude a particular route from
* a router middleware assignment
* courtesy: http://stackoverflow.com/questions/27117337/exclude-route-from-express-middleware
* @param {string} path - the endpoint path to exclude
* @param {function(req, res, next)} middleware - the middleware to return if endpoint path doesn't
* match the passed in path.
**/
function unless(path, middleware)
{
  return function(req, res, next) {
    if (path == req.path)
    {
      return next();
    }
    else
    {
      return middleware(req, res, next);
    }
  };
}

/**
* middleware that validates an authentication token
**/
function tokenCheck(req, res, next)
{
  debugUtil.debugLog('checking authentication token for ', req.path);
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
}

gatewayRouter.use('/v1', unless('/registration', tokenCheck));
gatewayRouter.use('/v1/registration', newUserReg);
gatewayRouter.use('/v1/bills', endpointBills);
gatewayRouter.use('/v1/users', endpointUsers);
gatewayRouter.use('/v1/locations', endpointLocation)
gatewayRouter.use(endpointErrors);

module.exports = gatewayRouter;
