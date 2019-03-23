const express = require('express');
const route = express.Router();
const {ErrorResponse} = require('../helper/response');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

route.post('/',async (req,res,next)=>{
    try{
        const {error} = UserService.validateAuth(req.body);
        if(error) return res.status(400).json({error : ErrorResponse(error.details)});
        
        const user = await UserService.findByEmailEquals(req.body.email);
        if(!user) return res.status(400).json({error : ErrorResponse("Invalied email or password")});

        const validPass = await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(400).json({error : ErrorResponse("Invalied email or password")});
                
        return res.send(user.generateAuthToken(user._id));

    }catch(err){
        next(err);
    }
});

module.exports = route;