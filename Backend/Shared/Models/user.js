'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create our own user from the FramUser data
var InvolvistUserSchema = new Schema({
    userName: String,
    realName: String,
    email: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
    followingBills : []
});

InvolvistUserSchema.methods.initialize = function (userName, realName, email) {
    this.userName = userName;
    this.realName = realName;
    this.email = email;
}

var InvolvistUser = mongoose.model("InvolvistUser", InvolvistUserSchema);
module.exports.InvolvistUser = InvolvistUser;

