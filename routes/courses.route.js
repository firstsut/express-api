const express = require('express');
const route = express.Router();
const Joi = require('joi');


route.get('/',(req,res)=>{
    res.send('Course Api');
});

route.post('/',(req,res)=>{

});

route.put('/:id',(req,res)=>{

});

route.delete('/:id',(req,res)=>{

});


module.exports = route;