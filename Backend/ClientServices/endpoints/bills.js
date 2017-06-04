//bills.js
//The endpoints for the bills
'use strict'

var express = require('express');
var billsRouter = express.Router();
var billsService = require('../bills/BillsService');
const csResponse = require('../DataTransfer/CSResponse');

//Using .bind(billsService) so the callse will be in the scope of the billsService
//Example of a search - http://localhost:3000/api/v1/bills?q=dog&congress=115
billsRouter.get('/', billsService.queryBills.bind(billsService), function(req, res) {
    var currentBills = req.bills.map(function (bill) {
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
    var csResp = csResponse(true, null, currentBills);
    res.json(csResp);
});

//Example - http://localhost:3000/api/v1/bills/H.R.4881
billsRouter.get('/:number', function(req, res){
    res.json(req.bills);
});

billsRouter.param('number', function(req, res, next, billNumber){
    req.query.number = billNumber;
    billsService.queryBills(req, res, next);
});

module.exports = billsRouter;
