const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
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
        }),
        required : true
    },
    movie : {
        type : new mongoose.Schema({
            title : {
                type :String,
                trim : true,
                minlength : 5,
                maxlength : 255
            },           
            dailyRentalRate : {
                type : Number,
                required : true,
                default : 0,
                min : 0,
                max:1000
            }
        }),
        required : true
    },
    dateOut : {
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturned : {
        type : Date               
    },
    rentalFee : {
        type : Number,
        min : 0,
        default : 0
    }
});

const Rental = mongoose.model('Rental',rentalSchema);
module.exports = Rental;