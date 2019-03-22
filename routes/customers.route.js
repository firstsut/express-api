const express = require('express');
const route = express.Router();
const CustomerService = require('../services/customer.service');
const {ErrorResponse} = require('../helper/response');
const {objectIdIsValid} = require('../helper/check');

route.get('/',async (req,res)=>{
    const customers = await CustomerService.list();
    res.json(customers);
});

route.get('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)){
            return res.status(400).json({error : ErrorResponse("Customer ID invalid")})
        }
        const customer = await CustomerService.findById(id);
        return res.json(customer);
    }catch(err){
        next(err);       
    }
});

route.post('/',async (req,res,next)=>{
    try{
        const {error} = CustomerService.validate(req.body);
        if(error){
            return res.status(400).json({error : ErrorResponse(error.details)});
        }
        const customer  = await CustomerService.save(req.body);
        return res.status(201).json(customer);
    }catch(err){
        next(err);            
    }
});

route.put('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)){
            return res.status(400).json({error : ErrorResponse("Customer ID invalid")});
        }
        const {error} = CustomerService.validate(req.body);
        if(error){
            return res.status(400).json({
                error : ErrorResponse(error.details)
            });      
        }  
        const customer = await CustomerService.update(id,req.body);
        if(!customer){
            return res.status(404).json({error : ErrorResponse("Customer ID not found")})
        }
        return res.json(customer);
    }catch(err){
        next(err);           
    }
});

route.delete('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Customer ID invalid")});
        const customer = await CustomerService.delete(id);
        if(!customer) return res.status(404).json({error : ErrorResponse("Customer ID not found")});
        return res.json(customer);            
    }catch(err){
        next(err);       
    }
});


module.exports = route;