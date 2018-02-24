var ajv = require('./validator')

class Schema {
  constructor (schema, options) {
    this.schema = schema
    this.options = options
    // Prepare Schema
    // Apply Default Props, Globle Props
    this.prepareSchema()
  }
  /*
   * Compile AJV Schema for validate user data
   */
  compileSchema () {
    this.validate = ajv.compile(this.schema)
  }
  /*
   * Preparing schema for validation
   */
  prepareSchema () {
    this.assignDefaultProps()
    this.prepareGlobelProperties()
    this.compileSchema()
  }
  /*
   * assign default options for schema
   */
  assignDefaultProps () {
    this.options = Object.assign(this.getDefaultProps(), this.options)
  }
  /*
   * return default options for schema
   */
  getDefaultProps () {
    return {
      validateBeforeSave: true,
      globleObjectProps: false
    }
  }
  /*
   * Apply globle properties to each objects
   */
  prepareGlobelProperties () {
    let globleObjectProps = this.options.globleObjectProps
    if (globleObjectProps) {
      Object.assign(this.schema, globleObjectProps)
      this.applyGlobleObjectProps(this.schema, globleObjectProps)
    }
  }
  /*
   * Applay Globle Properties to All Objects
   */
  applyGlobleObjectProps (data, globleObjectProps) {
    var self = this
    Object.keys(data).map((k) => {
      if (typeof data[k] === 'object') {
        if (data[k].type === 'object') {
          Object.assign(data[k], globleObjectProps)
        }
        self.applyGlobleObjectProps(data[k], globleObjectProps)
      }
    })
  }
  /*
   * Validate Data before save record in database
   */
  validateData (data) {
    if (this.options.validateBeforeSave) {
      return {
        data,
        isValid: this.validate(data),
        error: this.validate.errors || ''
      }
    }
    return {
      data,
      isValid: true,
      error: ''
    }
  }
}

module.exports = Schema
