const express = require('express');
const route = express.Router();
const CourseService = require('../services/course.service');
const ErrorResponse = require('../helper/response');
const {objectIdIsValid} = require('../helper/check');

route.get('/',async (req,res)=>{
    const courses = await CourseService.list();
    res.json(courses);
});

route.get('/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)){
            return res.status(400).json({error : ErrorResponse("Course ID invalid")})
        }
        const course = await CourseService.findById(id);
        return res.json(course);
    }catch(err){
        res.status(500).json({
            error : ErrorResponse(err)
        })
    }
});

route.post('/',async (req,res)=>{
    try{
        const {error} = CourseService.validate(req.body);
        if(error){
            return res.status(400).json({error : ErrorResponse(error.details)});
        }
        const course  = await CourseService.save(req.body);
        return res.status(201).json(course);
    }catch(err){
        return res.status(500).json({error : ErrorResponse(err)})
    }
});

route.put('/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)){
            return res.status(400).json({error : ErrorResponse("Course ID invalid")});
        }
        const {error} = CourseService.validate(req.body);
        if(error){
            return res.status(400).json({
                error : ErrorResponse(error.details)
            });      
        }  
        const course = await CourseService.update(id,req.body);
        if(!course){
            return res.status(404).json({error : ErrorResponse("Course ID not found")})
        }
        return res.json(course);
    }catch(err){
        res.status(500).json({error:ErrorResponse(err)});
    }
});

route.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        if(!objectIdIsValid(id)) return res.status(400).json({error : ErrorResponse("Course ID invalid")});
        const course = await CourseService.delete(id);
        if(!course) return res.status(404).json({error : ErrorResponse("Course ID not found")});
        return res.json(course);            
    }catch(err){
        return res.status(500).json({error : ErrorResponse(err)});
    }
});


module.exports = route;