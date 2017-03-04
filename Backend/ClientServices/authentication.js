// authentication.js
// defines the routes for oauth 2.0 authentication

var express = require("express")
var authRouter = express.Router()

authRouter.post("/authenticate", function(req, res, next) {
    // debug response:
    console.log("post to ", req.originalUrl)
    res.end()
})

module.exports = authRouter
