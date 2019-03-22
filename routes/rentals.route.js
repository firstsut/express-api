const express = require('express');
const route = express.Router();
const RentalService = require('../services/rental.service');
const CustomerService = require('../services/customer.service');
const MovieService = require('../services/movie.service');
const {objectIdIsValid} = require('../helper/check');
const {ErrorResponse} = require('../helper/response');


route.get('/',async (req,res)=>{
     const rentals = await RentalService.list();
     res.json(rentals);
});


route.get('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Rental ID inValid")});

        const rental = await RentalService.findById(id);
        return res.json(rental);
    }catch(err){
        next(err);       
    }
});


route.post('/',async (req,res,next)=>{
     try{

        const {error} = RentalService.validate(req.body);
        if(error) return res.status(400).json({error : ErrorResponse(error.details)});

        const customer = await CustomerService.findById(req.body.customerId);
        if(!customer) return res.status(400).json({error : ErrorResponse("Customer ID inValid")});

        const movie = await MovieService.findById(req.body.movieId);
        if(!movie) return res.status(400).json({error : ErrorResponse("Movie ID inValid")});

        const rental = await RentalService.save(req.body,customer,movie);                   
        return res.status(201).json(rental);

     }catch(err){  
        next(err);       
     }
});

route.put('/:id',async (req,res,next)=>{
    try{

        
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Rental ID inValid")});

        const {error} = RentalService.validate(req.body);
        if(error) return res.status(400).json({error : ErrorResponse(error.details)});

        const customer = await CustomerService.findById(req.body.customerId);
        if(!customer) return res.status(400).json({error : ErrorResponse("Customer ID inValid")});

        const movie = await MovieService.findById(req.body.movieId);
        if(!movie) return res.status(400).json({error : ErrorResponse("Movie ID inValid")});

        const rental = await RentalService.update(id,req.body,customer,movie);                   
        if(!rental) return res.status(404).json({error : ErrorResponse("Rental ID not found")})
        return res.json(rental);

     }catch(err){  
        next(err);         
     }
});

route.delete('/:id',async (req,res,next)=>{
    try{
        
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Rental ID inValid")});

        const rental = await RentalService.delete(id);
        if(!rental) return res.status(404).json({error : ErrorResponse("Rental ID not found")})

        return res.json(rental);

     }catch(err){
        next(err);
     }
});
module.exports = route;