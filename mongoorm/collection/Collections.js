var Record = require('./Record')
var NativeMethod = require('./Native')
/**
 *  Perform Operation in Collection
 *
 */
class Collection extends NativeMethod {
  constructor (collectionName, schema) {
    super(collectionName)
    this.schema = schema
  }
  /**
   * Validate User record
   * @param {object|array} record
   */
  validateData (record) {
    if (Array.isArray(record)) {
      return this.validateMultipleData(record)
    } else {
      return this.validateSingleData(record)
    }
  }
  /**
   * Validate Single record
   * @param {object} record
   */
  validateSingleData (record) {
    return this.schema.validateData(record)
  }
  /**
   * Validate multiple records
   * @param {array} records
   */
  validateMultipleData (records) {
    return records.map((r) => this.schema.validateData(r))
  }
  /**
   * Return Single Record for Collection
   * @param {object} record
   */
  create (record, options) {
    return new Record(this, record, options)
  }
}

module.exports = Collection
