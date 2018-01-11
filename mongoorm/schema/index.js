var _ = require('lodash');

class Schema {
    constructor(fields, options) {
        this.fields = fields;
        this.defaultOptions = {
            strict: true,
            validateBeforeSave: true
        };        
        this.options = _.assignIn(this.defaultOptions,options);
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
        if (this.options.strict) {
            data = this.removeKeys(this.fields, data);
        }
        var res = {
            isValid: true,
            data: data,
            error: ''
        };
        this.validateObject(data, this.fields, data, res);
        return res;
    }
    
    removeKeys(source, changes) {
        var self = this;
        return Object.keys(source).reduce((res, k) => {
            if (!source[k]['field']) {
                res[k] = self.removeKeys(source[k], changes[k]);
            } else if (k in changes) {
                res[k] = changes[k];
            } else {
                res[k] = source[k];
            }
            return res;
        }, {});
    }
    
    validateObject(ft, fields, data, res) {
        var self = this;
        Object.keys(ft).map((k) => {
            if (typeof ft[k] !== 'object') {
                if (fields[k] && !fields[k].validate(data[k], k)) {
                    res.isValid = false;
                    res.error += ` | type of ${k} must be ${fields[k].type}`;
                    return false;
                }
            } else {
                self.validateObject(ft[k], fields[k], data[k], res);
            }
        });
    }
}

exports.Schema = Schema;