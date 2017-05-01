// FrameError.js - abstracts a Frame error message model
// note: using ES6 specification

module.exports = MakeFrameError;

class FrameError
{
  constructor()
  {
    this.statusCode = '';
    this.error = '';
    this.message = '';
  }
}

/**
* FrameError factory method
* @param {string} frameResponseData - Frame API response data (error)
**/
function MakeFrameError(frameResponseData)
{
  var err = new FrameError();

  const responseObj = JSON.parse(frameResponseData);
  err.statusCode = responseObj['statusCode'];
  err.error = responseObj['error'];
  err.message = responseObj['message'];

  return err;
}
