const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;