/*
 *   =====================================
 *       Relational Fields
 *   =====================================
*/

class RelationalField {
  constructor (collectionName, schema, options) {
    this.props = Object.assign({
      collectionName,
      schema,
      options: Object.assign(this.getDefaultOptions(), options)
    }, this.getDefaultProps())
  }
  getProps () {
    return this.props
  }
  getDefaultProps () { return {} }
  getDefaultOptions () { return {} }
}

class Many2many extends RelationalField {
  getDefaultProps () {
    return { type: 'array', relationType: 'many2many' }
  }
}

class Many2one extends RelationalField {
  /**
   * { type: string } because it store object id for storing reference of related collection
   * { relationType: 'many2one' }
   * { lazy: true/false } lazy is true when user get data then it not return data instead of object id else return object id
   * @returns {object}
   * @memberof Many2one
   */
  getDefaultProps () {
    return { objectid: true, relationType: 'many2one' }
  }
  getDefaultOptions () {
    return { lazy: false }
  }
}

class One2many extends RelationalField {
  /**
   * { type: array } because it store array of object ids for storing reference of related collection
   * { relationType: 'one2many' }
   * { store: true/false } store is true when it store reference of related collection if false then it get data from many2one collection
   * { lazy: true/false } lazy is true when user get data then it not return data instead of object id else return object id
   * { relatedField: String } reference to related collection many2one field required when store = false
   * @returns {object}
   * @memberof One2many
   */
  getDefaultProps () {
    return { type: 'array', items: { objectid: true }, relationType: 'one2many', default: [] }
  }
  getDefaultOptions () {
    return { lazy: false, relatedField: '', store: false }
  }
}

module.exports = {
  One2many: (collectionName, schema, options) => new One2many(collectionName, schema, options).getProps(),
  Many2one: (collectionName, schema, options) => new Many2one(collectionName, schema, options).getProps(),
  Many2many: (collectionName, schema, options) => new Many2many(collectionName, schema, options).getProps()
}
