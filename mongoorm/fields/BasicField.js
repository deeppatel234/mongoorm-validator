/*
 * Basic Field: Base Class for Creating Model Fields
 * 
*/

class BasicField {
    constructor(props) {
        this.props = props || {};
        Object.assign(this.props, this.getProps());
    }
    getData() {
        return this.props;
    }
    getProps() {return {}}
}

module.exports = BasicField;
