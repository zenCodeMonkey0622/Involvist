// httpUtility.js
// provides utility functions for http service requests
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

  makeHttpRequest: function(host, port, path, method, agent, requestData)
  {

  },

  addHttpHeaders: function(contentType)
  {

  }

}
