// httpUtility.js
// provides utility functions for http service requests
const http = require('http');

module.exports = {

  requestType: {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },

  contentType: {
    WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
    JSON: 'json'
  },

  /**
    * creates an http.ClientRequest object for a REST request
    * @param {string} hostUri - the host URI
    * @param {int} port - the port
    * @param {string} path - the resource path
    * @param {string} method - the REST method
    * @param {http.Agent} agent - an optional http.Agent object for managing connection persistence
    * @param {string} requestData - optional JSON stringified request data
    * @param {httpUtility.contentType} contentType - the type of content.
    * @param {Function} callback - an optional callback function to attach to the request
  **/
  makeHttpRequest: function(hostUri, port, path, method, agent, requestData, contentType, callback)
  {
    // create the options object
    var options = {
      host: hostUri,
      port: port,
      path: path,
      method: method,
      agent: agent
    }

    // form the request headers
    var requestHeaders = {
      'Content-Type': contentType
    }

    if (requestData != null)
    {
      requestHeaders['Content-Length'] = requestData.length;
    }

    // add the request headers ot the options
    options.headers = requestHeaders;

    return http.request(options, callback);
  }
}
