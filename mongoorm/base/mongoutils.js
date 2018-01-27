/*
 *   =====================================
 *       MongoORM Helper Functions
 *   =====================================
*/

module.export = {
    asyncError: (msg) => new Promise((resolve, reject)=> reject(msg))
}