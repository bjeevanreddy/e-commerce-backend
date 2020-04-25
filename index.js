var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const trueLog = require('true-log');
const fs = require('fs');
const cors=require('cors')
// const readline = require('readline');
const path = require('path');
const mongoose = require('mongoose');
const productsrouter = require('./routers/products_router');
const productsroutercustomer = require('./routers/products_router_customer');
const userrouter = require('./routers/customer_router');
app.use(express.static('uploads/'));
app.use(cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    credentials:true
}))
app.use(bodyParser.json());
const ws = fs.createWriteStream(path.join(__dirname, "log.txt"), { flags: 'a' });
app.use(trueLog({ level: 'full', stream: ws }));
app.use('/admin', productsrouter);
app.use('/customer', productsroutercustomer);
app.use('/user', userrouter);
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (error, res) => {
    if (res) {
        console.log('DB Connected successfully');
    }
    else {
        console.log("Something error occured");
    }
});
app.listen(3000, function () {
    console.log('Server runing on 3000 port');
})