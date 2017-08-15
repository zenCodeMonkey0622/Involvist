// BillUpdates.js
//Are the changes of bill either from the day to day data we get from ProPublica or user changes
'use strict'

const sharedConfig = require('../Config/SharedConfig');
const debugUtil = require('../Debug/debugUtility');

// we use mongoose for mongoDb object modeling
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//BillUpdates are the changes of bill either from the day to day data we get from ProPublica or user changes
var BillUpdatesSchema = new Schema({
    time_stamp: String,
    number: String,
    house_passage: String,
    senate_passage: String,    
    latest_major_action_date: String,
    latest_major_action: String,
    last_vote_date: String,   
    actions: [{}]
    
});

var BillUpdates = mongoose.model("rsr_current_bill_updates_" + sharedConfig.get('/currentCongress') + '_' + debugUtil.debugDateNow(), BillUpdatesSchema);

module.exports.BillUpdates = BillUpdates;


