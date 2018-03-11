/*
 *   =====================================
 *       Relational Fields
 *   =====================================
*/
var BasicField = require('./BasicField')

class Many2many extends BasicField {
  getDefaultProps () {
    return { type: 'many2many' }
  }
}

class Many2one extends BasicField {
  getDefaultProps () {
    return { type: 'many2one' }
  }
}

class One2many extends BasicField {
  getDefaultProps () {
    return { type: 'one2many' }
  }
}

module.exports = {
  One2many: (collectionName, schema, options) => new One2many(collectionName, schema, options).getProps(),
  Many2one: (collectionName, schema, options) => new Many2one(collectionName, schema, options).getProps(),
  Many2many: (collectionName, schema, options) => new Many2many(collectionName, schema, options).getProps()
}
