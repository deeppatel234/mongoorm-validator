var db = require('../db');
var Record = require('./Record');
var mongoutils = require('../base/mongoutils');
var NativeMethod = require('../base/Native');
/*
 *  Perform Operation in Collection
 *
*/
class Collection {
    constructor(collectionName, schema) {
        this.collectionName = collectionName;
        this.schema = schema;
        this.nativeMethod = new NativeMethod(collectionName);
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
}

module.exports = Collection;
