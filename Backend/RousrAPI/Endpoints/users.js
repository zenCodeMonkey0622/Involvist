//users.js
//The endpoints for the users
'use strict'

const debugUtil = require('../../Shared/Debug/debugUtility');
const express = require('express');
const usersRouter = express.Router();
const rsrUserService = require('../Users/RousrUserService');
const csResponse = require('../DataTransfer/CSResponse');
const bodyParser = require('body-parser')

usersRouter.use(bodyParser.json());       // to support JSON-encoded bodies
usersRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//WARNING:  This route is only for debugging.  We don't want to provide a way for someone to get all of our users.
//Example of a search -https://<api.server.host>:<api_port>/v1/users?userName=MrCool@gmail.com
usersRouter.get('/', rsrUserService.queryUsers, function (req, res) {
    var users = null;
    
    if (req.users) {
        users = req.users.map(function (user) {
            return {
                userID: user.userID,
                userName: user.userName,
                realName: user.realName,
                email: user.email,                
                followingBills: user.followingBills
            };
        });
    }
    var csResp = csResponse(true, null, users);
    res.json(csResp);    
});

usersRouter.param('name', function (req, res, next, userName) {
    req.query.userName = userName;
    next();
});

usersRouter.param('userID', function (req, res, next, userID) {
    req.query.userID = userID;    
    next();
});

//Example - https://<api.server.host>:<api_port>/v1/users/name/MrAwesome@gmail.com
usersRouter.get('/name/:name', rsrUserService.queryUsers, function (req, res) {
    var users = null;
    
    if (req.users) {
        users = req.users.map(function (user) {
            return {
                userID: user.userID,
                userName: user.userName,
                realName: user.realName,
                email: user.email,                
                followingBills: user.followingBills
            };
        });        
    }
    var csResp = csResponse(true, null, users);
    res.json(csResp);
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57
usersRouter.get('/:userID', rsrUserService.queryUsers, function (req, res) {
    var users = null;
    
    if (req.users) {
        users = req.users.map(function (user) {
            return {
                userID: user.userID,
                userName: user.userName,
                realName: user.realName,
                email: user.email,                
                followingBills: user.followingBills
            };
        });
    }
    var csResp = csResponse(true, null, users);
    res.json(csResp);
});

//Example - https://<api.server.host>:<api_port>/v1/users/followingBills
usersRouter.get('/:userID/followingBills', rsrUserService.queryUsers, function (req, res) {
    var followingBills = null;    

    if (req.users && req.users.length > 0) {
        followingBills = req.users[0].followingBills;
    }
    var csResp = csResponse(true, null, followingBills);
    res.json(csResp);
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57/followingBills
usersRouter.post('/:userID/followingBills', function (req, res, callback) {
    var userID = req.query.userID;
    var billNumber = req.body.bill_number;   

    rsrUserService.followBill(userID, billNumber, function (err, results) {
        if (err) {
            return callback(err);
        }       

        if (results) {
            var csResp = csResponse(true, null, results);
            res.json(csResp);
        }

    });
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57/followingBills
usersRouter.delete('/:userID/followingBills', function (req, res, callback) {
    var userID = req.query.userID;
    var billNumber = req.body.bill_number;

    rsrUserService.unfollowBill(userID, billNumber, function (err, results) {
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
