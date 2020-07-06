var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var cart = new Schema({
    title: {type: String, default: "My Cart"},
    products:[{type: ObjectId, ref:'Product'}]
});

module.exports = mongoose.model('Cart', cart);