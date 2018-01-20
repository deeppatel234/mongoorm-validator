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

module.exports = BasicField;