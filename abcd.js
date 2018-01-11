var _ = require('lodash');

var fields = {
    name: {
        field: true,
        type: 'string',
        validate: function (value, key) {
            console.log('value', value, key);
        }
    },
    age: {
        field: true,
        type: 'integer',
        validate: function (value, key) {
            console.log('value', value, key);
        }
    },
    address: {
        street: {
            field: true,
            type: 'string',
            validate: function (value, key) {
                console.log('value', value, key);
            }
        },
    }
};

var data = {
    name: 'deep',
    age: 123,
    address: {
        street: '1234',
        pin: 97,
    }
};

function update(source, changes) {
    return Object.keys(source).reduce((res, k) => {
        if (!source[k]['field']) {
            res[k] = update(source[k], changes[k]);
        } else if (k in changes) {
            res[k] = changes[k];
        } else {
            res[k] = source[k];
        }
        return res;
    }, {});
}

var new_data = update(fields, data);

function traverse(ft, fields, data) {
    Object.keys(ft).map((k) => {
        if (typeof ft[k] !== 'object') {
            fields[k] && fields[k].validate(data[k],k);
        } else {
            traverse(ft[k], fields[k], data[k]);
        }
    });
}

traverse(data, fields, data);
