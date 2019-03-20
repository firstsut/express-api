const Genre = require('../models/genre');
const Joi = require('joi');

async function list(){     
    return  Genre.find().sort('name'); 
}

async function save(inputs){ 
    const genre = new Genre({
        name : inputs.name
    });   
    return  genre.save();
}

async function update(id,inputs){
    return Genre.findByIdAndUpdate(id,{
        name : inputs.name
    },{new : true});
}

async function findById(id){
    return  Genre.findById(id); 
}

async function del(id){
    return  Genre.findByIdAndRemove(id); 
}

function validate(inputs){
    const schema = {
        name : Joi.string().min(3).max(50).required()        
    }
    return  Joi.validate(inputs,schema);
}

module.exports.list = list;
module.exports.save = save;
module.exports.findById = findById;
module.exports.update = update;
module.exports.validate = validate;
module.exports.del = del;