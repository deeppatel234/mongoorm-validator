var db = require('../db');
var Record = require('./record').Record;

class Collection {
    constructor(name, schema) {
        this.collectionName = name;
        this.schema = schema;
    }

    getCollection() {
        return db.get().collection(this.collectionName);
    }

    create(data) {
        return new Record(this, data);
    }

    find(domain) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.getCollection().find(domain).toArray(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

exports.Collection = Collection;