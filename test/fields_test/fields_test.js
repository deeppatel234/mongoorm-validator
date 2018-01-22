var Fields = require('../../mongoorm').Fields

var assert = require('chai').assert

describe('BasicFields', function () {
    describe('IntegerField', function () {
        it('should return type integer', function () {
            assert.deepEqual(Fields.Integer(), {type:'integer'});
        });

        it('should return required', function () {
            assert.deepEqual(Fields.Integer({ required: true }), { type: 'integer', required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.Integer({ default: 123 }), { type: 'integer', default: 123 });
        });
    });

    describe('BooleanField', function () {
        it('should return type boolean', function () {
            assert.deepEqual(Fields.Boolean(), { type: 'boolean' });
        });

        it('should return required', function () {
            assert.deepEqual(Fields.Boolean({ required: true }), { type: 'boolean', required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.Boolean({ default: true }), { type: 'boolean', default: true });
        });
    });

    describe('FloatField', function () {
        it('should return type number', function () {
            assert.deepEqual(Fields.Float(), { type: 'number' });
        });

        it('should return required', function () {
            assert.deepEqual(Fields.Float({ required: true }), { type: 'number', required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.Float({ default: 12.3 }), { type: 'number', default: 12.3 });
        });
    });

    describe('StringField', function () {
        it('should return type string', function () {
            assert.deepEqual(Fields.String(), { type: 'string' });
        });

        it('should return required', function () {
            assert.deepEqual(Fields.String({ required: true }), { type: 'string', required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.String({ default: "hello" }), { type: 'string', default: "hello" });
        });
    });

    describe('DateField', function () {
        it('should return type string', function () {
            assert.deepEqual(Fields.Date(), { type: 'string', format: "date" });
        });

        it('should return required', function () {
            assert.deepEqual(Fields.Date({ required: true }), { type: 'string', format: "date", required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.Date({ default: '12-12-2018' }), { type: 'string', format: "date", default: '12-12-2018' });
        });
    });

    describe('ArrayField', function () {
        it('should return type array', function () {
            assert.deepEqual(Fields.Array(), { type: 'array', });
        });

        it('should return required', function () {
            assert.deepEqual(Fields.Array({ required: true }), { type: 'array', required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.Array({ default: [1, 2, 3] }), { type: 'array', default: [1, 2, 3] });
        });

        it('should return boolean type array', function () {
            assert.deepEqual(Fields.Array({ items: Fields.Boolean() }), { type: 'array', items: {type: 'boolean'}});
        });
    });

    describe('MixedField', function () {
        it('should return type mixed', function () {
            assert.deepEqual(Fields.Mixed(), { type: ["number", "integer", "string", "boolean", "object"] });
        });

        it('should return required', function () {
            assert.deepEqual(Fields.Mixed({ required: true }), { type: ["number", "integer", "string", "boolean", "object"], required: true });
        });

        it('should return default', function () {
            assert.deepEqual(Fields.Mixed({ default: [1, "2", true] }), { type: ["number", "integer", "string", "boolean", "object"], default: [1, "2", true] });
        });
    });


    describe('Object', function () {
        it('should return type object, properties and required', function () {
            assert.deepEqual(Fields.Object({}, { additionalProperties: false }), { type: 'object', properties: {}, "required": [], "additionalProperties": false});
        });

        it('should return hello in object child', function () {
            assert.deepEqual(Fields.Object({hello: Fields.String()}), { type: 'object', properties: {hello: {type:'string'}}, "required": [] });
        });
    });


});