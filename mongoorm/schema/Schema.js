var validator = require('./validator')

class Schema {
  constructor (schema, options) {
    this.schema = schema
    this.options = options
    // Prepare Schema
    // Apply Default Props, global Props
    this.prepareSchema()
  }
  /*
   * Compile Schema for validate user data
   */
  compileSchema () {
    this.validate = validator.compile(this.schema)
  }
  /*
   * Preparing schema for validation
   */
  prepareSchema () {
    this.assignDefaultProps()
    this.prepareGlobalProperties()
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
      globalObjectProps: false
    }
  }
  /*
   * Apply global properties to each objects
   */
  prepareGlobalProperties () {
    let globalObjectProps = this.options.globalObjectProps
    if (globalObjectProps) {
      Object.assign(this.schema, globalObjectProps)
      this.applyGlobalObjectProps(this.schema, globalObjectProps)
    }
  }
  /*
   * Apply global Properties to All Objects
   */
  applyGlobalObjectProps (data, globalObjectProps) {
    var self = this
    Object.keys(data).map((k) => {
      if (typeof data[k] === 'object') {
        if (data[k].type === 'object') {
          Object.assign(data[k], globalObjectProps)
        }
        self.applyGlobalObjectProps(data[k], globalObjectProps)
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
