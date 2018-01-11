var MongoClient = require('mongodb').MongoClient;
var connection = require('./connection');

var state = {
    db: null,
};

exports.connect = function (done) {
    if (state.db) return done();

    MongoClient.connect(connection.dburl, function (err, client) {
        if (err) return done(err);
        state.db = client.db(connection.dbname);
        done();
    });
};

exports.get = function () {
    return state.db;
};

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
};