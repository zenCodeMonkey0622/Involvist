// frameLocalService.js
// this is an internal service API into the frame API for use during authentication
// it abstracts the http requests to the running frame process

module.exports = FrameLocalService;

const debugUtil = require('../../Shared/Debug/debugUtility');
const constants = require('../../Shared/SharedConstants');
const httpUtility = require('../../Shared/ServiceAccess/httpUtility');
const frameUser = require('./FrameUser');
const frameError = require('./FrameError');
const csResponse = require('../DataTransfer/CSResponse');

const http = require('http');
const request = require('request');
const querystring = require('querystring');

/**
* creates an instance of FrameLocalService
**/
function FrameLocalService()
{
  frameAgent = new http.Agent({keepAlive: true});
}

/**
* registers a new user in the user management platform
* @param {string} realName - user's legal name
* @param {string} password - user's chosen password
* @param {email} email - user's email
* @param {function(err, newUser)} - callback function
**/
FrameLocalService.prototype.registerNewUser = function(realName, password, email, callback)
{
  // write the frame new user request
  // will use email as the username
  const form = {
    name: realName,
    email: email,
    username: email,
    password: password,
  }

  const formData = querystring.stringify(form);

  const frameRequest = httpUtility.makeHttpRequest(constants.USER_MANAGEMENT_INTERAL_API_URI,
    constants.USER_MANAGEMENT_INTERNAL_API_PORT,
    constants.USER_MANAGEMENT_INTERNAL_API_PATH_PREFIX + '/signup',
    httpUtility.requestType.POST,
    frameAgent,
    formData,
    httpUtility.contentType.WWW_FORM_URLENCODED,
    null,
    (res) => {
      var responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        debugUtil.debugLog('registerNewUser response body end: ' + responseData);

        if (res.statusCode != '200')
        {
          var frErr = frameError(responseData);
          callback(csResponse(false, frErr.message, null), null);
        }
        else
        {
          var user = frameUser(responseData);
          callback(csResponse(true, '', user), user);
        }
      });
    });

  frameRequest.on('error', (e) => {
      console.error('problem with frame request: ' + e.message);
      callback(e);
  })

  frameRequest.write(formData);
  frameRequest.end();
}

/**
* finds a user in the Frame user management system by passed in credentials
* @param {string} username - the user name used to log in
* @param {string} password - the user's password
* @param {(err, user)} callback - a callback error-first function. returns the user.
**/
FrameLocalService.prototype.findByCredentials = function(username, password, callback)
{
  // write the frame login request
  const form = {
    username: username,
    password: password
  }

  const formData = querystring.stringify(form);

  const frameRequest = httpUtility.makeHttpRequest(constants.USER_MANAGEMENT_INTERAL_API_URI,
    constants.USER_MANAGEMENT_INTERNAL_API_PORT,
    constants.USER_MANAGEMENT_INTERNAL_API_PATH_PREFIX + '/login',
    httpUtility.requestType.POST,
    frameAgent,
    formData,
    httpUtility.contentType.WWW_FORM_URLENCODED,
    null,
    (res) => {
      var responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        debugUtil.debugLog('frame response body end: ' + responseData);

        if (res.statusCode != '200')
        {
          var frErr = frameError(responseData);
          callback(csResponse(false, frErr.message, null), null);
        }
        else
        {
          var user = frameUser(responseData);
          callback(csResponse(true, '', user), user);
        }
      });
    });

  frameRequest.on('error', (e) => {
      console.error('problem with frame request: ' + e.message);
      callback(e);
  })

  frameRequest.write(formData);
  frameRequest.end();
}
