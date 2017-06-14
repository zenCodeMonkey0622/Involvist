//errors.js
//The endpoints for the bills
'use strict'

const csResponse = require('../DataTransfer/CSResponse');
var express = require('express');
var errorsRouter = express.Router();

// 404 catch-all handler (middleware)
errorsRouter.use(function (req, res, next) {
    console.error('File Not Found');
    var csResp = csResponse(false, 'File Not Found', null);
    res.status(404);
    res.json(csResp);
});

// 500 error handler (middleware)
errorsRouter.use(function (err, req, res, next) {
    console.error(err.stack);   
    var csResp = csResponse(false, err.message, null);
    res.status(err.status || 500);
    res.json(csResp);
});

module.exports = errorsRouter;