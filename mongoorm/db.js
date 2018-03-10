/*
 *   =====================================
 *       MongoDB Connection
 *   =====================================
*/

// External Libraries
var MongoClient = require('mongodb').MongoClient

// Internal Functions
var logger = require('./base/logger').getLogger()

// Init DB State
var state = { db: null }

/*
 * For Connect to MongoDB Instance
 * params
 * connection {object}
 * done {callback function}
 */
exports.connect = function (connection, done) {
  if (state.db) return done()

  MongoClient.connect(connection.dburl, function (err, client) {
    if (err) return done(err)
    state.db = client.db(connection.dbname)
    logger.info('MongoDB Connected at :', connection.dburl, 'Database:', connection.dbname)
    done()
  })
}

/*
 * get mongodb cursor for db operations
 * return db {object}
 */
exports.get = function () {
  return state.db
}

/*
 * close mongodb connection
 * param done {callback function}
 */
exports.close = function (done) {
  if (state.db) {
    state.db.close(function (err, result) {
      if (err) {
        logger.info('MongoDB Closing Connection Error :', err)
        done(err)
      }
      state.db = null
    })
  }
}
