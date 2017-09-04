// RousrUser.js
// defines the Rousr User model

'use strict'

// we use mongoose for mongoDb object modeling
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create our own user from the FramUser data
var RousrUserSchema = new Schema({
    rsrUid: String,
    userName: String,
    realName: String,
    email: String,    
    city: String,
    state: String,
    zipCode: String,
    followingBills : []
});

RousrUserSchema.methods.initialize = function (userName, realName, email, assignedUid) {
    this.rsrUid = assignedUid;
    this.userName = userName;
    this.realName = realName;
    this.email = email;
}

var rousrUser = mongoose.model("rsr_user", RousrUserSchema);
module.exports.RousrUser = rousrUser;

