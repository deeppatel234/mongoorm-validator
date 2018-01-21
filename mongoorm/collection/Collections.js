var db = require('../db');
var Record = require('./Record');

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
        return this.getCollection().find(domain).toArray();
    }

    insertOne(doc) {
        return this.getCollection().insertOne(doc)
    }
}

module.exports = Collection;