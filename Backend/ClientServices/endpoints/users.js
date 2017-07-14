//users.js
//The endpoints for the users
'use strict'

const debugUtil = require('../../Shared/Debug/debugUtility');
const express = require('express');
const usersRouter = express.Router();
const involvistUserService = require('../Users/InvolvistUserService');
const csResponse = require('../DataTransfer/CSResponse');
const bodyParser = require('body-parser')

usersRouter.use(bodyParser.json());       // to support JSON-encoded bodies
usersRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//Example of a search - http://localhost:3000/api/v1/users?userName=MrCool
usersRouter.get('/', involvistUserService.queryUsers, function (req, res) {
    var users = null;
    debugUtil.debugLog('users: ' + req.users);
    if (req.users) {
        users = req.users;            
    }
    var csResp = csResponse(true, null, users);
    res.json(csResp);
});

//Example - http://localhost:3000/api/v1/users/followingBills
usersRouter.post('/followingBills', function (req, res, callback) {    
    var userID = req.body.userID;
    var billNumber = req.body.bill_number;

    involvistUserService.followBill(userID, billNumber, function (err, results) {
        if (err) {
            return callback(err);
        }       

        if (results) {
            var csResp = csResponse(true, null, results);
            res.json(csResp);
        }

    });
});

//Example - http://localhost:3000/api/v1/users/followingBills
usersRouter.delete('/followingBills', function (req, res, callback) {
    var userID = req.body.userID;
    var billNumber = req.body.bill_number;

    involvistUserService.unfollowBill(userID, billNumber, function (err, results) {
        if (err) {
            return callback(err);
        }

        if (results) {
            var csResp = csResponse(true, null, results);
            res.json(csResp);
        }

    });
});

module.exports = usersRouter;
