//users.js
//The endpoints for the users
'use strict'

const express = require('express');
const usersRouter = express.Router();
const bodyParser = require('body-parser')

const billsServiceClass = require('../bills/BillsService');
const billsService = new billsServiceClass();
const sharedConstants = require('../../Shared/SharedConstants');
const sharedConfig = require('../../Shared/Config/SharedConfig');
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
usersRouter.get('/', function (req, res, next) {
    
    if (!sharedConfig.get('/debug/enableDebugApiLayer')) {
        httpUtil.setJsonResponse(res, 403, csResponse(false, "gtfo", null));
        return next();
    }

    rsrUserService(req.query, function(err, users) {
        
        if (err) {
            httpUtil.setJsonResponse(res, 500, csResponse(false, err, null));
            return next();
        }

        if (users == null) {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }

        results = users.map(function (rousrUser) {
            return {
                rsrUid: rousrUser.rsrUid,
                userName: rousrUser.userName,
                realName: rousrUser.realName,
                email: rousrUser.email,                
                followingBills: rousrUser.followingBills
            };
        });  
        
        var csResp = csResponse(true, null, results);
        res.json(csResp);
    });
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
usersRouter.get('/name/:name', function (req, res, next) {
    
    rsrUserService(req.query, function(err, users) {

        if (err) {
            httpUtil.setJsonResponse(res, 500, csResponse(false, err, null));
            return next();
        }

        if (users == null) {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }

        results = users.map(function (rousrUser) {
            return {
                rsrUid: rousrUser.rsrUid,
                userName: rousrUser.userName,
                realName: rousrUser.realName,
                email: rousrUser.email,                
                followingBills: rousrUser.followingBills
            };
        });  
        
        var csResp = csResponse(true, null, results);
        res.json(csResp);
    });
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57
usersRouter.get('/:userID', function (req, res, next) {
    
    rsrUserService(req.query, function(err, users) {
        
        if (err) {
            httpUtil.setJsonResponse(res, 500, csResponse(false, err, null));
            return next();
        }

        if (users == null) {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }

        results = users.map(function (rousrUser) {
            return {
                rsrUid: rousrUser.rsrUid,
                userName: rousrUser.userName,
                realName: rousrUser.realName,
                email: rousrUser.email,                
                followingBills: rousrUser.followingBills
            };
        });  
        
        var csResp = csResponse(true, null, results);
        res.json(csResp);
    });
});

//Example - https://<api.server.host>:<api_port>/v1/users/bills
usersRouter.get('/:userID/bills', function (req, res, next) {

    rsrUserService.queryUsers(req.query, function(err, users) {
        
        if (err) {
            httpUtil.setJsonResponse(res, 500, csResponse(false, err, null));
            return next();
        }

        if (users == null || users.length == 0) {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }

        var followingBills = null;    
        
        if (users && users.length > 0) {
            followingBills = users[0].followingBills;
            res.json(csResponse(true, null, followingBills));
        }
        else {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }
    });
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57/bills
usersRouter.post('/:userID/bills', function (req, res, next) {

    // validate user exists
    rsrUserService.queryUsers(req.query, function(err, users) {
        
        if (err) {
            return next(err);
        }

        if (users == null || users.length == 0) {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }

        // validate bill exists
        billsService.getBillsByNumber(req.body.bill_number, function(err, bills) {
            if (err) {
                return next(err);
            }
            if (bills == null || bills.length == 0) {
                httpUtil.setJsonResponse(res, 404, csResponse(false, 
                                                sharedConstants.errors.billNotFound, 
                                                null));
                return next();
            }

            rsrUserService.followBill(req.query.rsrUid, req.body.bill_number, function (err, results) {
                if (err) {
                    return next(err);
                }       
    
                if (results) {
                    var csResp = csResponse(true, null, results);
                    res.json(csResp);
                }
            });

        });
        
    });
});

//Example - https://<api.server.host>:<api_port>/v1/users/59694b9de61e342680869c57/bills
usersRouter.delete('/:userID/bills', function (req, res, next) {

    rsrUserService.queryUsers(req.query, function(err, users) {
        
        if (err) {
            httpUtil.setJsonResponse(res, 500, csResponse(false, err, null));
            return next();
        }

        if (users == null || users.length == 0) {
            httpUtil.setJsonResponse(res, 404, csResponse(false, "User not found.", null));
            return next();
        }

        var user = users[0];
        var userID = user.rsrUid;
        var billNumber = req.body.bill_number;

        if (user.followingBills.includes(billNumber)) {
            rsrUserService.unfollowBill(userID, billNumber, function (err, results) {
                if (err) {
                    httpUtil.setJsonResponse(res, 500, csResponse(false, err, null));
                    return next();
                } 
    
                if (results) {
                    var csResp = csResponse(true, null, results);
                    res.json(csResp);
                }
    
            });
        }
        else {
            httpUtil.setJsonResponse(res, 409, csResponse(false, "User not following bill " + billNumber, null));
            return next();
        }

    });
});

module.exports = usersRouter;
