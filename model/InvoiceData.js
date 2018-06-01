'use strict';

// import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create an instance of mongoose schema
// the schema takes an object which shows the structure of the database collection/table.

const InvoiceSchema = new Schema({
    companyName: String,
    companyAddress: String,
    companyLogoUrl: String,
    customerName: String,
    customerCompanyName: String,
    billingAddress: String,
    shippingAddress: String,
    invoiceNumber: String,
    invoDate: String,
    invoDueDate: String,
    taxRate: String,
    discount: String,
    note: String
});

//export our module to use in server.js
exports = mongoose.model('InvoiceData', InvoiceSchema);
