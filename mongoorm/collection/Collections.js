var db = require('../db');
var Record = require('./Record');

/*
 *  Perform Operation in Collection
 *
*/
class Collection {
    constructor(name, schema) {
        this.collectionName = name;
        this.schema = schema;
    }

    /*
     * Return Collection Cursor
     *
    */
    getCollection() {
        return db.get().collection(this.collectionName);
    }

    /*
     * Return Single Record for Collection
     *
    */
    create(data) {
        return new Record(this, data);
    }

    /*
     *  DB Oprations
    */
    find(domain) {
        return this.getCollection().find(domain).toArray();
    }

    insertOne(doc) {
        return this.getCollection().insertOne(doc)
    }
}

module.exports = Collection;
