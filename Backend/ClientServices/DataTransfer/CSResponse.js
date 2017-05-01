// CSResponse.js
// implementation for client services response data
// note: using newer ES6 specification, which should be fine since no browser
// will be running this.

module.exports = MakeCSResponse;

class CSResponse
{
    constructor()
    {
      this.success = true;
      this.responseMessage = '';
    }

    toString()
    {
      console.log('success: ', this.success, 'response message: ', this.responseMessage);
    }
}

/**
* CSResponse factory method.
* @param {bool} success - true if request was successful
* @param {string} message - failure message
**/
function MakeCSResponse(success, message)
{
  var resp = new CSResponse();
  resp.success = success;
  resp.responseMessage = message;

  return resp;
}
