const express = require('express');
const route = express.Router();
const GenreService = require('../services/genre.service');
const {objectIdIsValid} = require('../helper/check');
const ErrorResponse = require('../helper/response');

route.get('/',async (req,res)=>{
    const genres = await GenreService.list();  
    res.send(genres);
});

route.get('/:id',async (req,res)=>{ 
    const {id} = req.params;  
    if(!objectIdIsValid(id)){
        return res.status(400).json({
            error : ErrorResponse("Genre ID invalid")
        });
    }
    const genre = await GenreService.findById(id);  
    res.send(genre);
});

route.post('/',async (req,res)=>{
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
        return res.status(500).json({
            error : ErrorResponse(err)
        })    
    }
});

route.put('/:id',async (req,res)=>{
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
        return res.status(500).json({
            error : ErrorResponse(err)
        })    
    }
});

route.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    if(!objectIdIsValid(id)){
        return res.status(400).json({
            error :  ErrorResponse("Genre ID invalid")
        });
    }
    try{
        const genre = await GenreService.del(id);
        if(!genre){
            return res.status(404).json({
                error : ErrorResponse("Genre ID not found")
            });
        }
        return res.json(genre);
    }catch(err){
        return res.status(500).json({
            error : ErrorResponse(err)
        })   
    }
   
});

module.exports = route;