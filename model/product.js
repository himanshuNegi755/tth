var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    productName: String,
    productType: String,
    productSize: String,
    productPrice: Number,
    productImgUrl: String,
    productSizeVariation: [ { quarter: Number, half: Number, full: Number} ]
});

module.exports = mongoose.model('Product', product);