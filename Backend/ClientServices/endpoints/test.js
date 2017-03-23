// test.js
// a test endpoint

var testRouter = require('express').Router();

testRouter.use('/', apiEndpoint);

testRouter.get('/test', function(req, res, next) {
  console.log('get: ', req.originalUrl);
  res.statusCode = 200;
  res.end('ok');
});

function apiEndpoint(request, response) {
    oauthServer.validateAccessToken(request, function(error, validationResult) {
        if(error){
            response.statusCode = 401;
            return response.end(JSON.stringify(error));
        }

        response.end(JSON.stringify(validationResult));
    });
  }

module.exports = testRouter;
