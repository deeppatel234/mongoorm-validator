var logger = require('./logger');
var mongoorm = require('./mongoorm')
// MONGO ORM
var db = mongoorm.db;
var fields = mongoorm.Fields;
var Schema = mongoorm.Schema;
var Collection = mongoorm.Collection;

var dbConfig = {
    dburl: "mongodb://localhost:27017",
    dbname: "test"
}

mongoorm.setLogger({
    info: logger.info,
    error: logger.error
});

mongoorm.db.connect(dbConfig, function (err) {
    if (err) {
        console.error('Error in DB Connection : ', err);
    }

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

    var studentModel = new Collection('student', studentSchema);

    studentModel.find({}).then(function (r) {
        console.log(r);
    })
    var yes = studentModel.create({
        name: "deep",
        age: 21,
        //dov: '1234',
        // address: {
        //     abcd: 'yes',
        //     street: "12/9/2018",
        // }
    });
    yes.save().then(function (params) {
        console.log(params);
    }).catch(function (err) {
        console.log(err);
        
        // _.each(err, function (e) {
        //     logger.error(e.message);
        // });
    });

});
