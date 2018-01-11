var _ = require('lodash');
var utils = require('../base/utils');

class BasicField {
    constructor(props) {
        this.fieldData = {
            field: true,
            props: props || {},
            validate: this.validate
        };
    }
    validate(value) {
        return typeof value === this.type;
    }
    getData() {
        return this.fieldData; 
    }
}

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

class IntegerField extends BasicField{
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
    Array: function (data) {
        return new ArrayField(data).getData();
    },
    Boolean: function (data) {
        return new BooleanField(data).getData();
    },
    Date: function (data) {
        return new DateField(data).getData();
    },
    Float: function (data) {
        return new FloatField(data).getData();
    },
    Integer: function (data) {
        return new IntegerField(data).getData();
    },
    Mixed: function (data) {
        return new MixedField(data).getData();
    },
    ObjectId: function (data) {
        return new ObjectId(data).getData();
    },
    String: function (data) {
        return new StringField(data).getData();
    }
};