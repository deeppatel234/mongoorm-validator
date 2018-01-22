this.logger = { error: () => {} , info: ()=> {}}

exports.setLogger = (obj) => { Object.assign(this.logger, obj)}
exports.getLogger = () => { return this.logger}