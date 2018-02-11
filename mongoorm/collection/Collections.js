var Record = require('./Record')
var NativeMethod = require('./Native')
/*
 *  Perform Operation in Collection
 *
*/
class Collection extends NativeMethod {
  constructor (collectionName, schema) {
    super(collectionName)
    this.schema = schema
  }
  /*
   * Return Single Record for Collection
   *
   */
  create (data) {
    return new Record(this, data)
  }
}

module.exports = Collection
