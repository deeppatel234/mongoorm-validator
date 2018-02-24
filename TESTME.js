
// var Ajv = require('ajv');
// var moment = require('moment')
// var ajv = new Ajv({ removeAdditional: true, allErrors: true, useDefaults: true, $data: true });
// require('ajv-keywords')(ajv);

// var definition = require('ajv-keywords').get('dynamicDefaults').definition;

// definition.DEFAULTS.utcdatetime = function() {
//     console.log("ccc");
    
//     return moment.utc().format()
// }

// var schema = {
//     type: 'object',
//     dynamicDefaults: {
//         ts: 'datetime',
//         utc: 'utcdatetime'
//     },
//     properties: {
//         ts: {
//             type: 'string',
//         },
//         utc: {
//             type: 'string',
//         },
//     }
// };

// var data = {};
// var validate = ajv.compile(schema)
// validate(data); // true
// console.log(data);
// console.log(moment(data.ts).format('MMMM Do YYYY, h:mm:ss a') );
 // { ts: '2016-12-01T22:07:28.829Z', r: 25, id: 0 }
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
// var ajv = new Ajv({ allErrors: true, useDefaults: true, removeAdditional: true});

// const schema = {
//     type: 'object',
//     properties: {
//         hello: { type: 'string' } ,
//         abcd: { type: 'string' }, 
//     },
//     required: ['abcd'],
//     additionalProperties: false
// };

// const test = ajv.compile(schema);

// var obj = { hello: 'world' , abcde:'22'}

// const isValid = test(obj);

// var mes = isValid ? obj : { obj, error: test.errors }

// console.log(mes);
