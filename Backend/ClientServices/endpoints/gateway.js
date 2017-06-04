// endpointsGateway.js
// the gateway through which all requests to the Involvist APIs routes

const gatewayRouter = require('express').Router();
const newUserReg = require('./newUserRegistration');
const endpointBills = require('./bills');
const authServer = require('../auth/authentication').AuthenticationServer;
const csResponse = require('../DataTransfer/CSResponse');

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
  console.log('checking authentication token for ', req.path);
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

// 404 catch-all handler (middleware)
gatewayRouter.use(function (req, res, next) {
    console.error('File Not Found');
    var csResp = csResponse(false, 'File Not Found', null);
    res.status(404);
    res.json(csResp);   
});

// 500 error handler (middleware)
gatewayRouter.use(function (err, req, res, next) {
    console.error(err.stack);
    var csResp = csResponse(false, err.stack, null);
    res.status(500);
    res.json(csResp);
});

module.exports = gatewayRouter;
