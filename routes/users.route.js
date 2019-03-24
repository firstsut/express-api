const express = require('express');
const route = express.Router();
const {objectIdIsValid} = require('../helper/check');
const {ErrorResponse} = require('../helper/response');
const UserService = require('../services/user.service');
const _ = require('lodash');


route.get('/me',async (req,res)=>{   
    const user = await UserService.findById(req.user._id);
    res.json(user);
});

route.post('/',async (req,res,next)=>{
    try{
        const {error} = UserService.validate(req.body);
        if(error) return res.status(400).json({error : ErrorResponse(error.details)});

        let userAlready  = await UserService.findByEmailEquals(req.body.email);
        if(userAlready) return res.status(400).json({errpr : ErrorResponse("User already registered")});

        const user = await UserService.save(_.pick(req.body,['name','email','password']));        
        
        return res.header('x-auth-token',user.generateAuthToken(user)).status(201).json(_.pick(user,['_id','name','email']));
    }catch(err){
        next(err);
    }
});

module.exports = route;