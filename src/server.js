'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const invoiceData = require('../model/InvoiceData');
const productData = require('../model/ProductData');

// create an instance
const app = express();
const router = express.Router();

//set our port to either a predetermined port number if you have set
//it up, or 3001
const port = process.env.API_PORT || 3001;

//db config
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@localhost:27017/invoicedb');
mongoose.connect('mongodb://localhost:27017/invoicedb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, ' +
        'Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove caching so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.post('/saveInvoice', (req, res) => {
    const invoice = new invoiceData();
    const data = req.body;
    console.log(data);
    res.json({ message: 'Ready to post data!'});

});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
    console.log('api running on port ${port}');
});





