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
  const contentLength = formData.length;

  const options = {
    host: constants.USER_MANAGEMENT_INTERAL_API_URI,
    port: constants.USER_MANAGEMENT_INTERNAL_API_PORT,
    path: constants.USER_MANAGEMENT_INTERNAL_API_PATH_PREFIX + '/login',
    method: httpUtility.requestType.POST,
    agent: frameAgent,
    headers: {
      'Content-Type': httpUtility.contentType.WWW_FORM_URLENCODED,
      'Content-Length': contentLength
    }
  }

  const req = http.request(options, (res) => {
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

  req.on('error', (e) => {
    console.error('problem with frame request: ' + e.message);
  })

  req.write(formData);
  req.end();

}
