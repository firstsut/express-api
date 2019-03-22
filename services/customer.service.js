const Customer = require('../models/customer');
const Joi = require('joi');

const CustomerService = {
    list : async ()=>{
        return Customer.find().sort("name");
    },
    save : async (inputs)=>{
        const customer = new Customer({
            name : inputs.name,
            isGold : inputs.isGold || false,
            phone : inputs.phone,
        })
        return customer.save();
    },
    update : async (id,inputs)=>{        
        return Customer.findByIdAndUpdate(id,{
            $set: {
                name : inputs.name,
                isGold : inputs.isGold || false,
                phone : inputs.phone
            }           
        },{runValidators: true ,new :true});
    },
    findById : async (id)=>{
        return Customer.findById(id);
    },
    delete : async (id)=>{
        return  Customer.findByIdAndRemove(id); 
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

module.exports = CustomerService;