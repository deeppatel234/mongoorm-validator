var express = require('express');
var app = express();

var db = require('./mongoorm').db;

var dbConfig = {
    dburl: "mongodb://localhost:27017",
    dbname: "test"
}

var demo = require('./modules/demo');

app.get('/', function (req, res) {
    demo.abc();
    res.send('Hello World');
});

db.connect(dbConfig, function (err) {
    if (err) {
        console.error('Error in DB Connection : ', err);
    }
    app.listen(3000, function () {
        console.log("Server Started");
    });    
});