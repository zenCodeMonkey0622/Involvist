// httpUtility.js
// provides utility functions for http service requests
const http = require('http');
const https = require('https');
const debugUtil = require('../Debug/debugUtility');;

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
   * modifies the path for query parameters, if necessary
   * @param {string} basePath - the base url path to resource
   * @param {string} requestData - stringified request data object
   * @param {httpUtility.requestType} method - the REST method
   */
  encodePath: function(basePath, requestData, method) {
    
    if (method == module.exports.requestType.GET && requestData != null) {
      return basePath + '?' + requestData;
    }

    return basePath;
  },

  /**
    * creates an options object for an http/https request
    * @param {string} hostUri - the host URI
    * @param {int} port - the port
    * @param {string} path - the resource path
    * @param {httpUtility.requestType} method - the REST method
    * @param {http.Agent} agent - an optional http.Agent object for managing connection persistence
    * @param {string} requestData - optional JSON stringified request data
    * @param {httpUtility.contentType} contentType - the type of content.
    * @param {string:object} additionalHeaders - user-provided headers
    * @param {string:object} additionalOptions - user-provided options.
  **/
  makeRequestOptions: function(hostUri, 
    port, 
    path, 
    method, 
    agent, 
    requestData, 
    contentType, 
    additionalHeaders, 
    additionalOptions) {

    var requestOptions = {
      host: hostUri,
      path: module.exports.encodePath(path, requestData, method),
      method: method,
      agent: agent
    }

    if (port != null) {
      requestOptions.port = port;
    }
    
    if (additionalOptions != null) {
      for (key in additionalOptions) {
        requestOptions[key] = additionalOptions[key];
      }
    }

    if (contentType != null) {
      var requestHeaders = {
        'Content-Type': contentType
      }
    }

    if (method != module.exports.requestType.GET && requestData != null) {
      requestHeaders['Content-Length'] = requestData.length;
    }

    if (additionalHeaders != null) {
      for (key in additionalHeaders) {
        requestHeaders[key] = additionalHeaders[key];
      }
    }

    // add the request headers ot the options
    requestOptions.headers = requestHeaders;                         
    
    return requestOptions;
  },  

  /**
    * creates an http.ClientRequest object for a REST request
    * @param {string} hostUri - the host URI
    * @param {int} port - the port
    * @param {string} path - the resource path
    * @param {httpUtility.requestType} method - the REST method
    * @param {http.Agent} agent - an optional http.Agent object for managing connection persistence
    * @param {string} requestData - optional JSON stringified request data
    * @param {httpUtility.contentType} contentType - the type of content.
    * @param {string:object} headers - passed-in headers
    * @param {Function} callback - an optional callback function to attach to the request
  **/
  makeHttpRequest: function(hostUri, port, path, method, agent, requestData, contentType, headers, callback)
  {
    const requestOptions = module.exports.makeRequestOptions(hostUri, port, path, method, agent, requestData, contentType, headers, null);
    return http.request(requestOptions, callback);
  },

  /**
    * creates an https.ClientRequest object for a REST request over SSL
    * @param {string} hostUri - the host URI
    * @param {int} port - the port. if null defaults to 443.
    * @param {string} path - the resource path
    * @param {httpUtility.requestType} method - the REST method
    * @param {http.Agent} agent - an optional http.Agent object for managing connection persistence
    * @param {string} requestData - optional JSON stringified request data
    * @param {httpUtility.contentType} contentType - the type of content.
    * @param {string:object} additionalHeaders - passed-in headers
    * @param {string:object} additionalOptions - passed-in options
    * @param {Function} callback - an optional callback function to attach to the request
  **/
  makeHttpsRequest: function(hostUri, port, path, method, agent, requestData, contentType, additionalHeaders, additionalOptions, callback)
  {
    const requestOptions = module.exports.makeRequestOptions(hostUri, port, path, method, agent, requestData, contentType, additionalHeaders, additionalOptions);
    return https.request(requestOptions, callback);
  },

  /**
   * sets the 404 response content to the passed in http response.
   * @param {http.ServerResponse} httpResponse - the response to modify
   * @param {object} body - the object that needs JSON stringification
   */
  setResponse404Json: function(httpResponse, body) {
    httpResponse.writeHead(404, {'Content-Type': 'application/json'});
    httpResponse.write(JSON.stringify(body));
  }
}
