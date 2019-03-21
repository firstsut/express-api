const Genre = require('../models/genre');
const Joi = require('joi');

const GenreService = {
    list : async ()=>{
        return  Genre.find().sort('name'); 
    },
    save : async (inputs)=>{
        const genre = new Genre({
            name : inputs.name
        });   
        return  genre.save();
    },
    update : async (id,inputs)=>{
        return Genre.findByIdAndUpdate(id,{
            $set :{name : inputs.name}
        },{runValidators: true,new : true});
    },
    delete : async (id)=>{
        return  Genre.findByIdAndRemove(id); 
    },
    findById : async (id)=>{
        return  Genre.findById(id); 
    },
    validate : (inputs)=>{
        const schema = {
            name : Joi.string().min(3).max(50).required()        
        }
        return  Joi.validate(inputs,schema);
    },
}
module.exports = GenreService;