var BasicField = require('./BasicField');
var utils = require('../base/utils');

class ArrayField extends BasicField {
    constructor(props) {
        super(props);
        this.fieldData = Object.assign(this.fieldData, {
            type: "array",
        });
    }
    validate(value) {
        return Array.isArray(value);
    }
}

class BooleanField extends BasicField {
    constructor(props) {
        super(props);
        this.fieldData = Object.assign(this.fieldData, {
            type: "boolean",
        });
    }
}

class DateField extends BasicField {
    constructor(props) {
        super(props);
        this.fieldData = Object.assign(this.fieldData, {
            type: "date",
        });
    }
    validate(date) {
        return utils.isValidDate(date);
    }
}

class IntegerField extends BasicField {
    constructor(props) {
        super(props);
        this.fieldData = Object.assign(this.fieldData, {
            type: "number",
        });
    }

    validate(value) {
        return Number(value) === value && value % 1 === 0;
    }
}

class FloatField extends IntegerField {
    validate(value) {
        return Number(value) === value && value % 1 !== 0;
    }
}

class MixedField extends BasicField {
    validate(value) {
        return true;
    }
}

class ObjectId extends BasicField {
    validate(value) {
        return true;
    }
}

class StringField extends BasicField {
    constructor(props) {
        super(props);
        this.fieldData = Object.assign(this.fieldData, {
            type: "string",
        });
    }
}

exports.Fields = {
    Array: (data) => new ArrayField(data).getData(),
    Boolean: (data) => new BooleanField(data).getData(),
    Date: (data) => new DateField(data).getData(),
    Float: (data) => new FloatField(data).getData(),
    Integer: (data) => new IntegerField(data).getData(),
    Mixed: (data) => new MixedField(data).getData(),
    ObjectId: (data) => new ObjectId(data).getData(),
    String: (data) => new StringField(data).getData()
};