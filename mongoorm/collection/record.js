class Record {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
        this.result = {};
    }

    getCollection() {
        return this.parent.getCollection();
    }

    save() {
        var self = this;
        var validData = this.parent.schema.validateData(self.data);
        if (validData.isValid) {
            return new Promise((resolve, reject) => {
                self.parent.getCollection().insert(validData.data, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        self.result = result;
                        resolve(result);
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {reject(validData.error);});
        }
    }
}

exports.Record = Record;