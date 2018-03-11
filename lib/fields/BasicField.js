/*
 * Basic Field: Base Class for Creating Model Fields
*/

class BasicField {
  constructor (props) {
    this.props = props || {}
    Object.assign(this.props, this.getDefaultProps())
  }
  getProps () {
    return this.props
  }
  getDefaultProps () { return {} }
}

module.exports = BasicField
