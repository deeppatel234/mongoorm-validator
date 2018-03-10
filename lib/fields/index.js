/*
 *   =======================================
 *       Exports Fields Module Functions
 *   =======================================
 */

var Fields = require('./Fields')

/*
 *   =======================================
 *       Register Model Fields
 *   =======================================
*/

exports.Fields = {
  Array: Fields.Array,
  Boolean: Fields.Boolean,
  Date: Fields.Date,
  Float: Fields.Float,
  Integer: Fields.Integer,
  Mixed: Fields.Mixed,
  ObjectId: Fields.ObjectId,
  Object: Fields.Object,
  String: Fields.String
}
