var moment = require('moment');


exports.isValidDate = function (date) {
  return moment(date).isValid();  
};