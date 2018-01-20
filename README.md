# MongoORM
> MongoDB ORM Framework with Relational Database and Realtime Data Management 

##### **Create Connection**
***

```javascript
    var db = require('./mongoorm').db;
    var dbConfig = {
        dburl: "mongodb://localhost:27017",
        dbname: "test"
    }
    db.connect(dbConfig, function (err) {
        if (err) {
            console.error('Error in DB Connection : ', err);
        }
        app.listen(3000, function () {
            console.log("Server Started");
        });    
    });
```

##### **Create Schema**
***

```javascript

    // Import
    var mongoorm =  require('../mongoorm');
    var fields = mongoorm.Fields
    var Schema = mongoorm.Schema

    var studentSchema = new Schema({
        'name': fields.String(),
        'age': fields.Integer(),
        'birthdate': fields.Date(),
        'address': {
            'city': {
                'string': fields.String()
            }
        }
    }, { 
        strict: true, // Remove data tha not present in Schema
        validateBeforeSave: true // Validate Before Save
    });
```

##### Fields List
***
    * Fields.Array()
    * Fields.Boolean()
    * Fields.Date()
    * Fields.Float()
    * Fields.Integer()
    * Fields.Mixed()
    * Fields.ObjectId()
    * Fields.String()
    
    
##### **Create Collaction**
***

```javascript

    // Import
    var mongoorm =  require('../mongoorm');
    var Collection = mongoorm.Collection;

    var studentModel = new Collection('student',studentSchema);
```

**Perform Operations on Schema**
```javascript
    studentModel.find({}).then(callback);
```

##### **Create Record**
***

```javascript
    var studentRecord = studentModel.create({
        name: "deep",
        age: 21,
        birthdate: '01/09/1996'
        address: {
            city: 'Mehsana'
        }
    });
    
    studentRecord.save().then(callback).catch(callback);
```

 
