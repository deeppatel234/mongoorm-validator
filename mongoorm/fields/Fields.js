/*
 *   =====================
 *       Model Fields 
 *   =====================
*/

var BasicField = require('./BasicField');
var utils = require('../base/utils');
var _ = require('lodash')

class ObjectField {
    constructor(props, options) {
        this.options = options;
        this.child = this.prepareChild(props);
    }

    /*
     * Prepare Validation Data for Type: object
     *  
     */
    prepareChild(props) {
        var defaultProps = {
            type: "object",
            properties: props,
        }
        var required = this.findRequiredFields(props)
        if (required.length) {
            defaultProps = Object.assign({ required },defaultProps);
        }
        return Object.assign(defaultProps,this.options)
    }
    /*
     * Get Required fields of object
     *  
     */
    findRequiredFields(props) {
        let required = []
        _.each(_.keys(props),function(key) {
            if (props[key].type !== 'object' && props[key].required) {
                required.push(key);
                delete props[key].required
            }            
        });
        return required;
    }

    getData() {
        return this.child;
    }
}

class ArrayField extends BasicField {
    getProps() {
        return { type: "array" }
    }
}

class BooleanField extends BasicField {
    getProps() {
        return { type: "boolean" }
    }
}

class DateField extends BasicField {
    getProps() {
        return { type: "string", format: "date"}
    }
}

class IntegerField extends BasicField {
    getProps() {
        return { type: "integer"}
    }
}

class FloatField extends BasicField {
    getProps() {
        return { type: "number" }
    }
}

class MixedField extends BasicField {
    getProps() {
        return { type: ["number", "integer", "string", "boolean", "object"] }
    }
}

class ObjectId extends BasicField {
    getProps() {
        return { type: "string" }
    }
}

class StringField extends BasicField {
    getProps() {
        return { type: "string" }
    }
}

/*
 *   =======================================
 *       Register Model Fields
 *   =======================================
*/

exports.Fields = {
    Array: (data) => new ArrayField(data).getData(),
    Boolean: (data) => new BooleanField(data).getData(),
    Date: (data) => new DateField(data).getData(),
    Float: (data) => new FloatField(data).getData(),
    Integer: (data) => new IntegerField(data).getData(),
    Mixed: (data) => new MixedField(data).getData(),
    ObjectId: (data) => new ObjectId(data).getData(),
    Object: (data, options) => new ObjectField(data, options).getData(),
    String: (data) => new StringField(data).getData()
};
