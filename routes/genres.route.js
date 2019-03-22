const express = require('express');
const route = express.Router();
const GenreService = require('../services/genre.service');
const {objectIdIsValid} = require('../helper/check');
const {ErrorResponse} = require('../helper/response');

route.get('/',async (req,res)=>{
    const genres = await GenreService.list();  
    res.json(genres);
});

route.get('/:id',async (req,res)=>{ 
    const {id} = req.params;  
    if(!objectIdIsValid(id)){
        return res.status(400).json({
            error : ErrorResponse("Genre ID invalid")
        });
    }
    const genre = await GenreService.findById(id);  
    res.json(genre);
});

route.post('/',async (req,res,next)=>{
    try{
        const {error} = GenreService.validate(req.body);
        if(error){
            return res.status(400).json({
                error : ErrorResponse(error.details)
            });      
        } 
        const genre = await GenreService.save(req.body);
        return res.status(201).json(genre);
    }catch(err){
        next(err);           
    }
});

route.put('/:id',async (req,res,next)=>{
    const {id} = req.params;
    if(!objectIdIsValid(id)){
        return res.status(400).json({
            error :  ErrorResponse("Genre ID invalid")
        });
    }
    try{
        const {error} = GenreService.validate(req.body);
        if(error){
            return res.status(400).json({
                error : ErrorResponse(error.details)
            });      
        } 
        const genre = await GenreService.update(id,req.body);
        if(!genre){
            return res.status(404).json({
                error : ErrorResponse("Genre ID not found")
            });
        }
        return res.json(genre);
    }catch(err){
        next(err);            
    }
});

route.delete('/:id',async (req,res,next)=>{
    const {id} = req.params;
    if(!objectIdIsValid(id)){
        return res.status(400).json({
            error :  ErrorResponse("Genre ID invalid")
        });
    }
    try{
        const genre = await GenreService.delete(id);
        if(!genre){
            return res.status(404).json({
                error : ErrorResponse("Genre ID not found")
            });
        }
        return res.json(genre);
    }catch(err){
        next(err);          
    }
   
});

module.exports = route;