const Course = require('../models/course');
const Joi = require('joi');

const CourseService = {
    list : async ()=>{
        return Course.find().sort("name");
    },
    save : async (inputs)=>{
        const course = new Course({
            name : inputs.name,
            isGold : inputs.isGold || false,
            phone : inputs.phone,
        })
        return course.save();
    },
    update : async (id,inputs)=>{        
        return Course.findByIdAndUpdate(id,{
            $set: {
                name : inputs.name,
                isGold : inputs.isGold || false,
                phone : inputs.phone
            }           
        },{runValidators: true ,new :true});
    },
    findById : async (id)=>{
        return Course.findById(id);
    },
    delete : async (id)=>{
        return  Course.findByIdAndRemove(id); 
    },
    validate : (inputs) =>{
        const schema = {
            name : Joi.string().min(5).max(50).required(),
            phone : Joi.string().min(5).max(50).required(),
            isGold : Joi.boolean()
        }
        return Joi.validate(inputs,schema);
    }
}

module.exports = CourseService;