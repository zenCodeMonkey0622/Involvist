//errors.js
//The endpoints for the bills
'use strict'

const express = require('express');
const errorsRouter = express.Router();
const csResponse = require('../DataTransfer/CSResponse');
const debugUtil = require('../../Shared/Debug/debugUtility');

// 404 catch-all handler (middleware)
errorsRouter.use(function (req, res, next) {
    debugUtil.debugErrorLog('404 catch-all route handler');
    
    // if the response json hasn't already been populated, give
    // a generic 404 message and standard 404 headers
    if (res.json != null) {
        res.end();
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.json(csResponse(false, 'Not Found', null));
    }
});

// 500 error handler (middleware)
errorsRouter.use(function (err, req, res, next) {
    debugUtil.debugErrorLog('500 catch-all handler. error stack: ')
    debugUtil.debugErrorLog(err.stack);  
     
    var csResp = csResponse(false, err.message, null);
    res.status(err.status || 500);
    res.json(csResp);
});

module.exports = errorsRouter;