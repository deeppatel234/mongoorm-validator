var db = require('../db');
var Record = require('./Record');
var mongoutils = require('../base/mongoutils');
var NativeMethod = require('./Native');
/*
 *  Perform Operation in Collection
 *
*/
class Collection extends NativeMethod{
    constructor(collectionName, schema) {
        super(collectionName);
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
}

module.exports = Collection;
