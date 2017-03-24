// test.js
// a test endpoint

var testRouter = require('express').Router();

testRouter.get('/', function(req, res, next) {
  console.log('reached endpoint test: get');
  res.end('ok');
});

module.exports = testRouter;
