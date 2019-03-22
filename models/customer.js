const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50,
        trim : true
    },
    isGold : {
        type : Boolean,
        default : false
    },
    phone : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50,
    }
});

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;