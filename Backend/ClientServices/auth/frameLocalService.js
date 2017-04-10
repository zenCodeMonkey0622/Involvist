// frameLocalService.js
// this is an internal service API into the frame API for use during authentication
// it abstracts the http requests to the running frame process

var constants = require('../constants');
var http = require('http');

module.exports = {

  // this method mirrors the method signature used by Frame
  findByCredentials: function(username, password, (err, user)) {
    // todo
  }

}
