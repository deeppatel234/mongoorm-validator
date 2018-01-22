var mongoorm =  require('../mongoorm');
var db = mongoorm.db;
var _ = require('lodash');
var logger = require('../logger')

var fields = mongoorm.Fields;
var Schema = mongoorm.Schema;
var Collection = mongoorm.Collection;

var mySchema = fields.Object({
    name: fields.String({ required: true }),
    age: fields.Integer({ required: true }),
    // arr: fields.Array({ items: fields.Boolean()}),
    // dov: fields.Date(),
    // address: fields.Object({
    //     street: fields.String(),
    //     pin: fields.Integer({ default: 1234 }),
    // }),
});

var studentSchema = new Schema(mySchema, {
    validateBeforeSave: true,
    globleObjectProps: {
        additionalProperties: false
    }
})

// var studentSchema = new Schema({
//     'name': fields.String(),
//     'age': fields.Integer(),
//     'abc': {
//         'you': fields.Date(),
//     }
// }, { 
//     strict: true,
//     validateBeforeSave: true
// });

var studentModel = new Collection('student',studentSchema);

exports.abc = function () {
    var yes = studentModel.create({
        //name: "deep",
        age: 21,
        //dov: '1234',
        address: {
            abcd: 'yes',
            street: "12/9/2018",
        }
    });
    yes.save().then(function (params) {
        console.log(params);
    }).catch(function (err) {
        _.each(err, function (e) {
            logger.error(e.message);
        });
    });

    // var yes = studentModel.create({
    //     name: "deep",
    //     age: 21,
    //     abc: {
    //         you: "12/9/2018",
    //     }
    // });
    // yes.save().then(function (params) {
    //     console.log(params);      
    // }).catch(function (err) {
    //     console.error(err);
    // });
    // studentModel.find({}).then(function (items) {
    //     console.log(items);
    // });

    // studentModel.insertOne({
    //     name: "aaaaaaaa",
    //     age: 21,
    //     abc: {
    //         you: "12/9/2018",
    //     }
    // }).then(function (items) {
    //     console.log(items.ops);
    // });
};
