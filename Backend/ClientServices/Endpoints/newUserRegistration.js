// newUserRegistration.js
// client services api endpoint for providing new user registration for
// involvist services

const newUserRegRouter = require('express').Router();

newUserRegRouter.get('/', newUserRegistrationGetHandler);

function newUserRegistrationGetHandler(req, res, next)
{
  // todo

  // debug
  console.log('reached new user registration endpoint');
  res.end('ok');
}

module.exports = newUserRegRouter;
