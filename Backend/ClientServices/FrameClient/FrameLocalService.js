// frameLocalService.js
// this is an internal service API into the frame API for use during authentication
// it abstracts the http requests to the running frame process

module.exports = FrameLocalService;

const constants = require('../../Shared/SharedConstants');
const httpUtility = require('../../Shared/ServiceAccess/httpUtility');
const frameUser = require('./FrameUser');

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
    (res) => {
      var responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('frame response body end: ' + responseData);

        if (res.statusCode != '200')
        {
          callback(new Error('findByCredentials error: ' + res.statusMessage), null);
        }
        else
        {
          callback(null, new frameUser(responseData));
        }
      });
    });

  frameRequest.on('error', (e) => {
    console.error('problem with frame request: ' + e.message);
  })

  frameRequest.write(formData);
  frameRequest.end();
}
