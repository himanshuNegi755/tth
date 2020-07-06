var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    userName: String,
    googleId: String,
    userEmail: String,
    userPassword: String,
    userImage: String,
    userPhoneNo: [ { value: String, verified: {type: Boolean, default: false}} ]
});

module.exports = mongoose.model('User', user);