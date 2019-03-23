const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 5,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,        
        minlength : 5,
        maxlength : 1024,    
    }
}) ;
userSchema.methods.generateAuthToken = (id)=>{ 
    const token = jwt.sign({_id : id},config.get('JWT_SECRET_KEY'));   
    return token;
}

const User = mongoose.model('User',userSchema)

module.exports = User;