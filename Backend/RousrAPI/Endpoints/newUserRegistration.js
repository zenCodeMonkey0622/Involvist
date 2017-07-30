// newUserRegistration.js
// client services api endpoint for providing new user registration for
// involvist services

const frameLocalSvc = require('../Users/Frame/FrameLocalService');
const newUserRegRouter = require('express').Router();
const rsrUserService = require('../Users/RousrUserService');
const debugUtil = require('../../Shared/Debug/debugUtility');

var bodyParser = require('body-parser');
newUserRegRouter.use(bodyParser.urlencoded({ extended: false }));
newUserRegRouter.use(bodyParser.json());


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

  frameLocalService.registerNewUser(realName, password, email, (csResponse, newUser) => {
    if (!csResponse.success) {
      console.error('registration endpoint error: ', csResponse.responseMessage);
      res.json(csResponse);
    }
    else {
        debugUtil.debugLog('registration success!');
        debugUtil.debugLog(newUser);

        //Create and a new Involvist user
        rsrUserService.registerNewUser(email, realName, email, csResponse.data.userID, function (err) {
            if (err) {
                return next(err);
            }
        });

        res.json(csResponse);
    }
  });
}

module.exports = newUserRegRouter;
