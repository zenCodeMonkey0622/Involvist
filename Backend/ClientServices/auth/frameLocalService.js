// frameLocalService.js
// this is an internal service API into the frame API for use during authentication
// it abstracts the http requests to the running frame process

module.exports = FrameLocalService;

const constants = require('../constants');
const httpUtility = require('../../ServiceAccess/httpUtility');

const http = require('http');
const request = require('request');
const querystring = require('querystring');

function FrameLocalService()
{
  frameAgent = new http.Agent({keepAlive: true});
}

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
      console.log('frame response status: ' + res.statusCode);
      console.log('frame response headers: ' + JSON.stringify(res.headers));

      res.on('data', (chunk) => {
        console.log('frame response body chunk: ' + chunk);
      });

      res.on('end', () => {
        console.log('frame response body end.');

        if (res.statusCode != '200')
          callback(new Error('did not work'), null);
        else
          callback(null, 'someuser');
      });
    });

  frameRequest.on('error', (e) => {
    console.error('problem with frame request: ' + e.message);
  })

  frameRequest.write(formData);
  frameRequest.end();
}
