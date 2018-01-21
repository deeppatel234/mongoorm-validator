var _ = require('lodash');
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, useDefaults: true, removeAdditional: true });

class Schema {
    constructor(schema, options) {
        this.schema = schema;
        this.defaultOptions = {
            validateBeforeSave: true
        };
        this.options = _.assignIn(this.defaultOptions, options);
        if (this.options.globleObjectProps) {
            Object.assign(this.schema, this.options.globleObjectProps)
            this.applyGlobleObjectProps(this.schema, this.options.globleObjectProps);
        }
        this.test = ajv.compile(this.schema);
    }

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
        let isValid = this.test(data)
        
        if (isValid) {
            return {isValid: true,data:data}
        }
        debugger
        return {
            isValid: false,
            error: this.test.errors
        }
    }
}

module.exports = Schema;