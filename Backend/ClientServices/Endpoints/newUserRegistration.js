// newUserRegistration.js
// client services api endpoint for providing new user registration for
// involvist services

const newUserRegRouter = require('express').Router();
const bodyParser = require('body-parser');

newUserRegRouter.post('/', newUserRegistrationGetHandler);

/**
* handler for POST requests to the new user registration endpoint
* @param {Request} req - the http request object
* @param {Response} res - the http response object
* @param {function} next - the next middleware function
**/
function newUserRegistrationGetHandler(req, res, next)
{
  // debug
  console.log('request headers', req.rawHeaders);
  console.log('request body: ', req.body);
  console.log('request real_name: ', req.body.real_name);
  console.log('request password: ', req.body.password);
  console.log('request email: ', req.body.email);

  // todo
  res.end('ok');
}

module.exports = newUserRegRouter;
