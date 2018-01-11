var mongoorm =  require('../mongoorm');
var db = mongoorm.db;

var fields = mongoorm.fields;
var Schema = mongoorm.Schema;
var Collection = mongoorm.Collection;

var studentSchema = new Schema({
    'name': fields.String(),
    'age': fields.Integer(),
    'abc': {
        'you': fields.Date(),
    }
}, { 
    strict: true,
    validateBeforeSave: true
});

var studentModel = new Collection('student',studentSchema);

exports.abc = function () {
    var yes = studentModel.create({
        name: "deep",
        age: 21,
        abc: {
            you: "12/9/2018",
        }
    });
    yes.save().then(function (params) {
        console.log(params);      
    }).catch(function (err) {
        console.error(err);
    });
    // studentModel.find({}).then(function (items) {
    //     console.log(items);
    // });
};
