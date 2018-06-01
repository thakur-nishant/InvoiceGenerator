// import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create an instance of mongoose schema
// the schema takes an object which shows the structure of the database collection/table.

var ProductSchema = new Schema({
    invoiceId: String,
    productName: String,
    unitPrice: Number,
    quantity: Number,
    amount: Number
});

//export our module to use in server.js
module.exports = mongoose.model('ProductData', ProductSchema);

