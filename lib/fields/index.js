/*
 *   =======================================
 *       Exports Fields Module Functions
 *   =======================================
 */

var Fields = require('./Fields')
var RelationalFields = require('./RelationalFields')

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
  String: Fields.String,
  Many2many: RelationalFields.Many2many,
  Many2one: RelationalFields.Many2one,
  One2many: RelationalFields.One2many
}
