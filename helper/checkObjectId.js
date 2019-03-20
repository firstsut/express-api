const mongoose = require('mongoose');

function isValid(id){
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports.isValid =  isValid;