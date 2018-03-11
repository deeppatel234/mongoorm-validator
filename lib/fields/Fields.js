/*
 *   =====================
 *       Model Fields
 *   =====================
*/

var BasicField = require('./BasicField')

class ObjectField {
  constructor (props, options) {
    this.options = options
    this.child = this.prepareChild(props)
  }

  /*
   * Prepare Validation Data for Type: object
   */
  prepareChild (props) {
    var defaultProps = {
      type: 'object',
      properties: props
    }
    this.prepareRequiredFields(defaultProps)
    this.prepareDefaultFields(defaultProps)
    return Object.assign(defaultProps, this.options)
  }

  prepareDefaultFields (defaultProps) {
    let dynamicDefaults = this.findDefaultFields(defaultProps.properties)
    if (Object.keys(dynamicDefaults).length) {
      defaultProps['dynamicDefaults'] = dynamicDefaults
    }
  }

  prepareRequiredFields (defaultProps) {
    let required = this.findRequiredFields(defaultProps.properties)
    if (required.length) {
      defaultProps['required'] = required
    }
  }

  findDefaultFields (props) {
    let dynamicDefaults = {}
    Object.keys(props).forEach(function (key) {
      if (props[key].type !== 'object' && props[key].default && typeof (props[key].default) === 'object') {
        dynamicDefaults[key] = props[key].default.func
        delete props[key].default
      }
    })
    return dynamicDefaults
  }
  /*
   * Get Required fields of object
   */
  findRequiredFields (props) {
    let required = []
    Object.keys(props).forEach(function (key) {
      if (props[key].type !== 'object' && props[key].required) {
        required.push(key)
        delete props[key].required
      }
    })
    return required
  }

  getProps () {
    return this.child
  }
}

class ArrayField extends BasicField {
  getDefaultProps () {
    return { type: 'array' }
  }
}

class BooleanField extends BasicField {
  getDefaultProps () {
    return { type: 'boolean' }
  }
}

class DateField extends BasicField {
  getDefaultProps () {
    return {type: 'string', format: 'date'}
  }
}

class IntegerField extends BasicField {
  getDefaultProps () {
    return {type: 'integer'}
  }
}

class FloatField extends BasicField {
  getDefaultProps () {
    return { type: 'number' }
  }
}

class MixedField extends BasicField {
  getDefaultProps () {
    return { type: ['number', 'integer', 'string', 'boolean', 'object'] }
  }
}

class ObjectId extends BasicField {
  getDefaultProps () {
    return { type: 'string' }
  }
}

class StringField extends BasicField {
  getDefaultProps () {
    return { type: 'string' }
  }
}

module.exports = {
  Array: (data) => new ArrayField(data).getProps(),
  Boolean: (data) => new BooleanField(data).getProps(),
  Date: (data) => new DateField(data).getProps(),
  Float: (data) => new FloatField(data).getProps(),
  Integer: (data) => new IntegerField(data).getProps(),
  Mixed: (data) => new MixedField(data).getProps(),
  ObjectId: (data) => new ObjectId(data).getProps(),
  Object: (data, options) => new ObjectField(data, options).getProps(),
  String: (data) => new StringField(data).getProps()
}
