// newUserRegistration.js
// client services api endpoint for providing new user registration for
// involvist services

const frameLocalSvc = require('../FrameClient/frameLocalService');
const newUserRegRouter = require('express').Router();

const frameLocalService = new frameLocalSvc();

newUserRegRouter.post('/', newUserRegistrationGetHandler);

/**
* handler for POST requests to the new user registration endpoint
* @param {Request} req - the http request object
* @param {Response} res - the http response object
* @param {function} next - the next middleware function
**/
function newUserRegistrationGetHandler(req, res, next)
{
  var realName = req.body.real_name;
  var password = req.body.password;
  var email = req.body.email;

  frameLocalService.registerNewUser(realName, password, email, (err, obj) => {
    if (err)
    {
      console.error('registration endpoint error: ', err.message);
      res.statusCode = 400;
      res.end();
    }
    else
    {
      console.log('registration success!');
      res.statusCode = 200;
      res.end('ok');
    }
  });
}

module.exports = newUserRegRouter;
