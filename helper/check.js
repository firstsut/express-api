const mongoose = require('mongoose');

function objectIdIsValid(id){
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports.objectIdIsValid =  objectIdIsValid;