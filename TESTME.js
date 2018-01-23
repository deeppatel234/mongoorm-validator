var Ajv = require('ajv');
// var ajv = new Ajv({ removeAdditional: true, allErrors: true });
// var schema = {
//     "additionalProperties": false,
//     "properties": {
//         "foo": { "type": "number" },
//         "dob" : { type: "string", format: "date" }
//     }
// }

// var data = {
//     "foo": 0,
//     "dob": "2017-06-08"
// }

// var validate = ajv.compile(schema);

// console.log(validate(data)); // true
// console.log(data);


//const ajv = new Ajv({ allErrors: true });
var ajv = new Ajv({ allErrors: true, useDefaults: true, removeAdditional: true});

const schema = {
    type: 'object',
    properties: {
        hello: { type: 'string' } ,
        abcd: { type: 'string' }, 
    },
    required: ['abcd'],
    additionalProperties: false
};

const test = ajv.compile(schema);

var obj = { hello: 'world' , abcde:'22'}

const isValid = test(obj);

var mes = isValid ? obj : { obj, error: test.errors }

console.log(mes);
console.log('hello');
console.log('helloworld');
