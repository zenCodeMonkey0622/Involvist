// debug.js
// provides debug middleware for the Rousr APIs

'use strict';

const express = require('express');
const debugRouter = express.Router();

debugRouter.use('/', (req, res, next) => {
    next();
});

module.exports = debugRouter;
