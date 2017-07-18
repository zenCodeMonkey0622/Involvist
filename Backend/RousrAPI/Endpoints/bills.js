//bills.js
//The endpoints for the bills
'use strict'

const express = require('express');
const billsRouter = express.Router();
const billsService = require('../bills/BillsService');
const csResponse = require('../DataTransfer/CSResponse');
const bodyParser = require('body-parser');

// to support JSON-encoded bodies
billsRouter.use(bodyParser.json());

// to support URL-encoded bodies
billsRouter.use(bodyParser.urlencoded({     
    extended: true
}));

//Using .bind(billsService) so the calls will be in the scope of the billsService
//Example of a search - http://localhost:3000/api/v1/bills?q=dog&congress=115
billsRouter.get('/', billsService.queryBills.bind(billsService), function(req, res) {
    var currentBills = null;
    if (req.bills) {
        currentBills = req.bills.map(function (bill) {
            return {
                "number": bill.number,
                "congress": bill.congress,
                "bill_uri": bill.bill_uri,
                "title": bill.title,
                "sponsor_id": bill.sponsor_id,
                "sponsor_uri": bill.sponsor_uri,
                "gpo_pdf_uri": bill.gpo_pdf_uri,
                "congressdotgov_url": bill.congressdotgov_url,
                "govtrack_url": bill.govtrack_url,
                "introduced_date": bill.introduced_date,
                "active": bill.active,
                "summary": bill.summary,
                "primary_subject": bill.primary_subject,
                "latest_major_action_date": bill.latest_major_action_date,
                "latest_major_action": bill.latest_major_action,
                "sponsor": bill.sponsor,
                "sponsor_party": bill.sponsor_party,
                "sponsor_state": bill.sponsor_state
            }
        });
    }
    var csResp = csResponse(true, null, currentBills);
    res.json(csResp);
});

billsRouter.param('number', function (req, res, next, billNumber) {
    req.query.number = billNumber;
    req.query.exact = 1;
    next();
});

billsRouter.param('name', function (req, res, next, billName) {
    req.query.name = billName;
    next();
});

//Example - http://localhost:3000/api/v1/bills/name/hr4881
billsRouter.get('/name/:name', function (req, res, next) {
    billsService.getBillsByName(req, res, function (err) {
        if (err) {
            next(err);
        }
        var currentBills = null;
        if (req.bills) {
            currentBills = req.bills.map(function (bill) {
                return {
                    "number": bill.number,
                    "congress": bill.congress,
                    "bill_uri": bill.bill_uri,
                    "title": bill.title,
                    "sponsor_id": bill.sponsor_id,
                    "sponsor_uri": bill.sponsor_uri,
                    "gpo_pdf_uri": bill.gpo_pdf_uri,
                    "congressdotgov_url": bill.congressdotgov_url,
                    "govtrack_url": bill.govtrack_url,
                    "introduced_date": bill.introduced_date,
                    "active": bill.active,
                    "summary": bill.summary,
                    "primary_subject": bill.primary_subject,
                    "latest_major_action_date": bill.latest_major_action_date,
                    "latest_major_action": bill.latest_major_action,
                    "sponsor": bill.sponsor,
                    "sponsor_party": bill.sponsor_party,
                    "sponsor_state": bill.sponsor_state,
                    "tags": bill.tags
                }
            });
        }
        var csResp = csResponse(true, null, currentBills);
        res.json(csResp);
    });
});

//Example - http://localhost:3000/api/v1/bills/number/H.R.4881
billsRouter.get('/number/:number', function (req, res, next) {    
    billsService.queryBills(req, res, function (err) {
        if (err) {
            next(err);
        }
        var currentBills = null;
        if (req.bills) {
            currentBills = req.bills.map(function (bill) {
                return {
                    "number": bill.number,
                    "congress": bill.congress,
                    "bill_uri": bill.bill_uri,
                    "title": bill.title,
                    "sponsor_id": bill.sponsor_id,
                    "sponsor_uri": bill.sponsor_uri,
                    "gpo_pdf_uri": bill.gpo_pdf_uri,
                    "congressdotgov_url": bill.congressdotgov_url,
                    "govtrack_url": bill.govtrack_url,
                    "introduced_date": bill.introduced_date,
                    "active": bill.active,
                    "summary": bill.summary,
                    "primary_subject": bill.primary_subject,
                    "latest_major_action_date": bill.latest_major_action_date,
                    "latest_major_action": bill.latest_major_action,
                    "sponsor": bill.sponsor,
                    "sponsor_party": bill.sponsor_party,
                    "sponsor_state": bill.sponsor_state,
                    "tags": bill.tags
                }
            });
        }
        var csResp = csResponse(true, null, currentBills);
        res.json(csResp);
    });
});

billsRouter.get('/:number/tags', function (req, res, next) {    
    billsService.queryBills(req, res, function (err) {
        if (err) {
            next(err);
        }
        var currentBills = null;
        if (req.bills) {
            currentBills = req.bills.map(function (bill) {
                return {
                    "tags": bill.tags
                }
            });
        }
        var csResp = csResponse(true, null, currentBills);
        res.json(csResp);
    });
});

//Adds a tag to the bill
//Example - http://localhost:3000/api/v1/bills/H.R.4881/tags
//The req.body will have json with a field called tag that will be the tag name
billsRouter.post('/:number/tags', function (req, res, next) {    
    billsService.addTagToBill(req.query.number, req.body.tag, function (err, results) {
        if (err) {
            return next(err);
        }

        if (results) {
            var csResp = csResponse(true, null, results);
            res.json(csResp);
        }
    });
});

//Gets all the tags for the bill
//Example - http://localhost:3000/api/v1/bills/H.R.4881/tags
billsRouter.delete('/:number/tags', function (req, res, next) {
    billsService.untagBill(req.query.number, req.body.tag, function (err, results) {
        if (err) {
            return next(err);
        }

        if (results) {
            var csResp = csResponse(true, null, results);
            res.json(csResp);
        }

    });
});

module.exports = billsRouter;
