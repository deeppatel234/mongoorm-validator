/*
 *   =====================================
 *       MongoORM Exports Functions
 *   =====================================
*/

exports.db = require('./db')
exports.setLogger = require('./base/logger').setLogger

exports.Fields = require('./fields').Fields
exports.Schema = require('./schema').Schema
exports.Collection = require('./collection').Collection
