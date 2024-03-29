/*
 *   =====================================
 *       MongoORM Exports Functions
 *   =====================================
*/

exports.db = require('./db')
exports.setLogger = require('./lib/base/logger').setLogger

exports.Fields = require('./lib/fields').Fields
exports.Schema = require('./lib/schema').Schema
exports.Collection = require('./lib/collection').Collection
