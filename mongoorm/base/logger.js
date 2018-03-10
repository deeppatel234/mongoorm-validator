/*
 *   This is use for set default logger for MONGOORM.
 *   User can use any logging framework.
 *   Just assign error and info functions in MongoORM init
 */
this.logger = {
  error: () => {},
  info: () => {}
}

/*
 * Set Logger function
 * param{object}
 */
exports.setLogger = (obj) => { Object.assign(this.logger, obj) }

/*
 * use in mongoorm internal logging
 * get Logger functions
 * return {object}
 */
exports.getLogger = () => this.logger
