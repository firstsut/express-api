const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Movie = require('../models/movie');

const MovieService = {
    list : async ()=>{
        return Movie.find().populate('genre');
    },
    save : async (inputs,genre)=>{
        const movie = new Movie({
            genre : {
                _id : genre._id,
                name : genre.name
            },
            title : inputs.title,
            numberInStock : inputs.numberInStock,
            dailyRentalRate : inputs.dailyRentalRate,
        });
        return movie.save().then(t => t.populate('genre').execPopulate());
    },
    update : async (id,inputs,genre)=>{
        return Movie.findByIdAndUpdate(id,{
            $set : {
                genre : {
                    _id : genre._id,
                    name : genre.name
                },
                title : inputs.title,
                numberInStock : inputs.numberInStock,
                dailyRentalRate : inputs.dailyRentalRate,
            }
        },{new : true}).then(t => t.populate('genre').execPopulate());
    },
    delete : async (id)=>{
        return Movie.findByIdAndRemove(id);
    },
    findById : async (id) =>{
        return Movie.findById(id).populate('genre');
    },
    validate : (inputs)=>{
        const schema = {
            title : Joi.string().min(5).max(255).required(),
            genreId : Joi.objectId().required(),
            numberInStock : Joi.number().min(5).max(1000).required(),
            dailyRentalRate : Joi.number().min(5).max(10000).required(),
        }
        return Joi.validate(inputs,schema);
    }
}

module.exports = MovieService;