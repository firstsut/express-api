const express = require('express');
const route = express.Router();
const {objectIdIsValid} = require('../helper/check');
const {ErrorResponse} = require('../helper/response');
const MovieService = require('../services/movie.service');
const GenreService = require('../services/genre.service');

route.get('/',async (req,res)=>{
    const movies  = await MovieService.list();
    res.json(movies);
});


route.get('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Movie ID inValid")})
        const movie  =await MovieService.find(id);
        return res.json(movie);
    }catch(err){
        next(err);       
    }
    
});

route.post('/',async (req,res,next)=>{
    try{
        const {error} = MovieService.validate(req.body);
        if(error) return res.status(400).json({error : ErrorResponse(error.details)});

        const genre = await GenreService.findById(req.body.genreId);
        if(!genre) return res.status(400).json({errpr : ErrorResponse("Genre ID inValid")});

        const movie = await MovieService.save(req.body,genre);
        return res.status(201).json(movie);

    }catch(err){
        next(err);    
    }
});


route.put('/:id',async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Movie ID inVaid")});

        const {error} = MovieService.validate(req.body);
        if(error) return res.status(400).json({error : ErrorResponse(error.details)});
        
        const genre = await GenreService.findById(req.body.genreId);
        if(!genre) return res.status(400).json({errpr : ErrorResponse("Genre ID inValid")});
        
        const movie = await MovieService.update(id,req.body,genre);
        if(!movie) return res.status(404).json({error : ErrorResponse("Movie ID not found")})

        return res.json(movie);
        
    }catch(err){
        next(err);        
    }
});

route.delete("/:id",async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Movie ID inVaid")});
    
        const movie = await MovieService.delete(id);
        if(!movie) return res.status(404).json({error : ErrorResponse("Movie ID not found")})

        return res.json(movie);
        
    }catch(err){
        next(err);    
    }
});

module.exports  = route;