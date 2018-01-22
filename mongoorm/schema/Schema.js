var _ = require('lodash');
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, useDefaults: true, removeAdditional: true });

class Schema {
    constructor(schema, options) {
        this.schema = schema;
        this.options = options;
        this.prepareOptions();
        this.validate = ajv.compile(this.schema);
    }
    prepareOptions() {
        this.defaultOptions = {
            validateBeforeSave: true
        };
        this.options = Object.assign(this.defaultOptions, this.options);
        this.prepareGlobelProperties();
    }
    prepareGlobelProperties() {
        if (this.options.globleObjectProps) {
            Object.assign(this.schema, this.options.globleObjectProps)
            this.applyGlobleObjectProps(this.schema, this.options.globleObjectProps);
        }
    }
    /*
     * Applay Globle Properties to All Objects
     *
     */
    applyGlobleObjectProps(data, globleObjectProps) {
        var self = this;
        Object.keys(data).map((k) => {
            if (typeof data[k] === 'object') {
                if (data[k].type === 'object') {
                    Object.assign(data[k], globleObjectProps)
                }
                self.applyGlobleObjectProps(data[k], globleObjectProps);
            }
        });
    }

    validateData(data) {
        var validData = {
            isValid: false,
        };
        if (this.options.validateBeforeSave) {
            validData = this.checkData(data);
        } else {
            validData.isValid = true;
            validData.data = data;
        }
        return validData;
    }

    checkData(data) {
        let isValid = this.validate(data)
        
        if (isValid) {
            return {isValid: true,data:data}
        }
        return {
            isValid: false,
            error: this.validate.errors
        }
    }
}

module.exports = Schema;
