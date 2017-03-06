// authentication.js
// defines the routes for oauth 2.0 authentication

var express = require("express")
var authRouter = express.Router()
var constants = require("./constants.js")

authRouter.post("/authenticate", function(req, res, next) {
    // debug response:
    console.log("post to ", req.originalUrl)
    console.log("user manage data source: ", constants.USER_MANAGEMENT_DATA_SOURCE)
    res.end()
})

module.exports = authRouter
