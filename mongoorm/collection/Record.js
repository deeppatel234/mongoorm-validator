var logger = require('../../logger')
var mongoutils = require('../base/mongoutils')

class Record {
  constructor (parent, data) {
    this.parent = parent
    this.data = data
    this.result = {}
  }

  getCollection () {
    return this.parent.getCollection()
  }

  /*
  * TODO: Improve Code
  */
  save () {
    var self = this
    var validData = this.parent.schema.validateData(self.data)
    if (validData.isValid) {
      return new Promise((resolve, reject) => {
        self.parent.getCollection().insert(validData.data, function (err, result) {
          if (err) {
            logger.error(err)
            reject(err)
          } else {
            self.result = result
            resolve(result)
          }
        })
      })
    } else {
      return mongoutils.asyncError(validData.exports)
    }
  }
}

module.exports = Record
