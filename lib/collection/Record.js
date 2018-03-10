var logger = require('../base/logger').getLogger()
var mongoutils = require('../base/mongoutils')

class Record {
  constructor (collection, data, options) {
    this.collection = collection
    this.data = data
    this.options = options
    this.id = null
  }
  /**
   * Save Single Record in Database
   */
  saveRecord () {
    let self = this
    let validData = this.collection.validateSingleData(this.data)
    if (validData.isValid) {
      return new Promise((resolve, reject) => {
        self.collection.insertOne(self.data, function (err, result) {
          if (err) {
            logger.error(err)
            reject(err)
          } else {
            self.data = result.ops[0]
            self.id = self.data._id
            resolve(self.result)
          }
        })
      })
    } else {
      return mongoutils.asyncError(validData.error)
    }
  }
  /**
   * save Single Record in Database
   */
  save () {
    if (this._id) {
      return this.update()
    } else {
      return this.saveRecord()
    }
  }
  /**
   * update Single Record in Database
   */
  update () {
    let validData = this.collection.validateSingleData(this.data)
    if (validData.isValid) {
      return this.collection.updateOne({ _id: this.id }, {$set: this.data})
    } else {
      return mongoutils.asyncError(validData.error)
    }
  }
  /**
   * delete record in Database
   */
  delete () {
    return this.collection.deleteOne({ _id: this.id })
  }
}

module.exports = Record
