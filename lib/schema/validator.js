
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, useDefaults: true, removeAdditional: true, $data: true })
require('ajv-keywords')(ajv)
require('./Keywords')(ajv)

module.exports = ajv
