// RousrUser.js
// defines the Rousr User model

'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create our own user from the FramUser data
var RousrUserSchema = new Schema({
    userID: String,
    userName: String,
    realName: String,
    email: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
    followingBills : []
});

RousrUserSchema.methods.initialize = function (userName, realName, email, userID) {
    this.userID = userID;
    this.userName = userName;
    this.realName = realName;
    this.email = email;
}

var rousrUser = mongoose.model("rsr_user", RousrUserSchema);
module.exports.InvolvistUser = rousrUser;

