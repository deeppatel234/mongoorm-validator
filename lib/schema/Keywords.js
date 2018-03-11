var ObjectID = require('mongodb').ObjectID

module.exports = function (ajv) {
  ajv.addKeyword('objectid', {
    validate: function (schema, data) {
      if (ObjectID.isValid(data)) {
        return true
      }
      return false
    },
    errors: true
  })
}
