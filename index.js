var express = require('express');
var app = express();
var logger = require('./logger');
var mongoorm = require('./mongoorm')
// MONGO ORM
var dbConfig = {
    dburl: "mongodb://localhost:27017",
    dbname: "test"
}

mongoorm.setLogger({
    info: logger.info,
    error: logger.error  
});

// Modules
var demo = require('./modules/demo');

app.get('/', function (req, res) {
    demo.abc();
    res.send('Hello World');
});

mongoorm.db.connect(dbConfig, function (err) {
    if (err) {
        console.error('Error in DB Connection : ', err);
    }
    app.listen(3000, function () {
        logger.info("Server Started at localhost:3000");
    });    
});
