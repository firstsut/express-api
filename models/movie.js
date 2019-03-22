const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    genre : {
        type : genreSchema,
        required : true
    },
    title : {
        type :String,
        trim : true,
        minlength : 5,
        maxlength : 255
    },
    numberInStock : {
        type : Number,
        default : 0,
        required : true,
        min : 0,
        max: 1000
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        default : 0,
        min : 0,
        max:1000
    }
});

const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;