const User = require('../models/user');
const Joi = require('joi');
//const PasswordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');

const UserService = {
    list : async ()=>{
        return User.find().select('-password');
    },
    save : async (inputs)=>{
        const salt = await bcrypt.genSalt(10);
        const pass_hash = await bcrypt.hash(inputs.password,salt);
        const user = new User({
            name : inputs.name,
            email : inputs.email,
            password : pass_hash,
        });
        return user.save();
    },
    update : async (id,inputs)=>{

    },
    delete : async (id)=>{
        return User.findByIdAndRemove(id);
    },
    findById : async (id)=>{
        return User.findById(id).select('-password');
    },
    findByEmailEquals : async (email)=>{
        return User.findOne({email : email});
    },
    validate :  (inputs)=>{
        const complexityOptions = {
            min: 5,
            max: 1024,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
                   
          }        
        const schema  = {
            name : Joi.string().min(5).max(5).required(),
            email : Joi.string().email().min(5).max(255).required(),
            password : Joi.string().min(5).max(1025).required(),
        }  
       return  Joi.validate(inputs,schema);       
    },
    validateAuth :  (inputs)=>{     
        const schema  = {       
            email : Joi.string().email().min(5).max(255).required(),
            password : Joi.string().min(5).max(1025).required(),
        }  
       return  Joi.validate(inputs,schema);       
    },
}
module.exports = UserService;
