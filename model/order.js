var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var order = new Schema({
    title: {type: String},
    orders: [ { status: {type: String, default: 'pending'},
    			//order: [{type: ObjectId, ref:'Product'}],
     			order: [],
     			dateAndTime: Date,
      			totalAmount: Number} ]
});

module.exports = mongoose.model('Order', order);