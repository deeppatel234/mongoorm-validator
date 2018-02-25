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
   * Validate User Data
   * @param {object|array} data
   */
  validateData (data) {
    if (Array.isArray(data)) {
      return this.validateMultipleData(data)
    } else {
      return this.validateSingleData(data)
    }
  }
  /**
   * Validate Single record
   * @param {object} data
   */
  validateSingleData (data) {
    return this.schema.validateData(data)
  }
  /**
   * Validate mutliple records
   * @param {array} datas
   */
  validateMultipleData (datas) {
    return datas.map((d) => this.schema.validateData(d))
  }
  /**
   * Return Single Record for Collection
   * @param {object} data
   */
  create (data, options) {
    return new Record(this, data, options)
  }
}

module.exports = Collection
