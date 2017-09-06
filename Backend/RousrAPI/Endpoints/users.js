//users.js
//The endpoints for the users
'use strict'

const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser')

const httpUtil = require('../../Shared/ServiceAccess/httpUtility');
const debugUtil = require('../../Shared/Debug/debugUtility');
const rsrUserService = require('../Users/RousrUserService');
const csResponse = require('../DataTransfer/CSResponse');

usersRouter.use(bodyParser.json());       // to support JSON-encoded bodies
usersRouter.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//WARNING:  This route is only for debugging.  We don't want to provide a way for someone to get all of our users.
//Example of a search -https://<api.server.host>:<api_port>/v1/users?userName=MrCool@gmail.com
usersRouter.get('/', rsrUserService.queryUsers, function (req, res) {
    var users = null;
    
    if (req.users) {
        users = req.users.map(function (rousrUser) {
            return {
                rsrUid: rousrUser.rsrUid,
                userName: rousrUser.userName,
                realName: rousrUser.realName,
                email: rousrUser.email,                
                followingBills: rousrUser.followingBills
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
    req.query.rsrUid = userID;    
    next();
});

//Example - https://<api.server.host>:<api_port>/v1/users/name/MrAwesome@gmail.com
usersRouter.get('/name/:name', rsrUserService.queryUsers, function (req, res, next) {
    var users = null;
    
    if (req.users) {
        users = req.users.map(function (rousrUser) {
            return {
                rsrUid: rousrUser.rsrUid,
                userName: rousrUser.userName,
                realName: rousrUser.realName,
                email: rousrUser.email,                
                followingBills: rousrUser.followingBills
            };
        });        
    }
    var csResp = csResponse(true, null, users);
    res.json(csResp);
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57
usersRouter.get('/:userID', rsrUserService.queryUsers, function (req, res, next) {
    var users = null;
    
    if (req.users) {
        users = req.users.map(function (rousrUser) {
            return {
                rsrUid: rousrUser.rsrUid,
                userName: rousrUser.userName,
                realName: rousrUser.realName,
                email: rousrUser.email,                
                followingBills: rousrUser.followingBills
            };
        });
    }
    var csResp = csResponse(true, null, users);
    res.json(csResp);
});

//Example - https://<api.server.host>:<api_port>/v1/users/bills
usersRouter.get('/:userID/bills', rsrUserService.queryUsers, function (req, res, next) {
    var followingBills = null;    

    if (req.users && req.users.length > 0) {
        followingBills = req.users[0].followingBills;
        res.json(csResponse(true, null, followingBills));
    }
    else {
        httpUtil.setResponse404Json(res, csResponse(false, "User not found.", null));
        next();
    }
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57/bills
usersRouter.post('/:userID/bills', rsrUserService.queryUsers, function (req, res, callback) {

    if (req.users && req.users.length > 0) {
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
    }
    else {
        httpUtil.setResponse404Json(res, csResponse(false, "User not found.", null));
        next();
    }
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57/bills
usersRouter.delete('/:userID/bills', rsrUserService.queryUsers, function (req, res, callback) {

    if (req.users && req.users.length > 0) {
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
    }
    else {
        httpUtil.setResponse404Json(res, csResponse(false, "User not found.", null));
        next();
    }
});

module.exports = usersRouter;
