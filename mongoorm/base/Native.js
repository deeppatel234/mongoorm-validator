var mongoutils = require('../base/mongoutils');

class NativeMethods {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    /*
     * Return Collection Cursor
     *
    */
    getCollection() {
        return db.get().collection(this.collectionName);
    }
    /*
     *  DB Oprations
    */
    find(domain) {
        return this.getCollection().find(domain).toArray();
    }

    insertOne(doc) {
        if (!(doc) instanceof Object && Array.isArray(doc)) {
            return mongoutils.asyncError('data should be object')
        }
        return this.getCollection().insertOne(doc)
    }

    insertMany(doc) {
        if (!Array.isArray(doc)) {
            return mongoutils.asyncError('data should be list of objects')
        }
        return this.getCollection().insertMany(doc)
    }

    updateOne(filter, update) {
        return this.getCollection().updateOne(filter, update)
    }

    updateMany(filter, update) {
        return this.getCollection().updateMany(filter, update)
    }
}

module.exports = NativeMethods;
