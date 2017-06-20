'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create our own user from the FramUser data
var InvolvistUserSchema = new Schema({
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

InvolvistUserSchema.methods.initialize = function (userName, realName, email, userID) {
    this.userID = userID;
    this.userName = userName;
    this.realName = realName;
    this.email = email;
}

var InvolvistUser = mongoose.model("InvolvistUser", InvolvistUserSchema);
module.exports.InvolvistUser = InvolvistUser;

