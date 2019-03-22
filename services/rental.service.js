const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Rental = require('../models/rental');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

const RentalService = {
    list : async ()=>{
        return Rental.find();
    },
    findById : async (id)=>{
        return Rental.findById(id);
    },
    save : async (inputs,customer,movie)=>{
        return new Promise((resolve,reject)=>{
            const rental = new Rental({
                customer : {
                    _id : customer._id,
                    name : customer.name,    
                    phone : customer.phone,
                },
                movie : {
                    _id : movie._id,
                    title : movie.title,
                    dailyRentalRate : movie.dailyRentalRate,
                },
                dateOut : inputs.dateOut,
                dateReturned : inputs.dateReturned || null,
                rentalFee : inputs.rentalFee || 0
            })
            var task = Fawn.Task();
          
            task
                .save('rentals',rental)
                .update('movies',{_id : movie._id},{
                    $inc : {
                        numberInStock : -1
                    }
                })                
                .run({useMongoose: true})  
                .then((results)=>{
          
                    const firstUpdateResult = results[0];
                    resolve(firstUpdateResult) 
                   
                }).catch(err=>{                                   
                    reject(err.message)
                })  
        })
         
        
    },
    update : async (id,inputs,customer,movie)=>{
        return new Promise((resolve,reject)=>{            
            var task = Fawn.Task();
            Rental.findById(id).then(rental=>{
                if(!rental){
                    resolve(null) ;
                }else{
                    rental.customer = {
                        _id : customer._id,
                        name : customer.name,    
                        phone : customer.phone,
                    }
                    rental.movie =  {
                        _id : movie._id,
                        title : movie.title,
                        dailyRentalRate : movie.dailyRentalRate,
                    }
                    rental.dateOut = inputs.dateOut;
                    rental.dateReturned = inputs.dateReturned || null;
                    rental.rentalFee = inputs.rentalFee || 0;

                    task
                    .update(rental,{
                        rental
                    })                                   
                    .run({useMongoose: true})  
                    .then((results)=>{
                        resolve(rental) ;                       
                    }).catch(err=>{                                   
                        reject(err.message)
                    }) 
                }
                
            })             
        })
    },
    delete : async (id)=>{
        return new Promise((resolve,reject)=>{            
            var task = Fawn.Task();
            Rental.findById(id).then(rental=>{
                if(!rental){
                    resolve(null) ;
                }else{                    
                    task
                    .remove(rental)
                    .update('movies',{_id : rental.movie._id},{
                        $inc : {
                            numberInStock : 1
                        }
                    })                                      
                    .run({useMongoose: true})  
                    .then((results)=>{
                        resolve(rental)  
                                         
                    }).catch(err=>{                                   
                        reject(err.message)
                    }) 
                }
                
            })             
        })       
    },
    validate : (inputs)=>{
        const schema = {
            customerId : Joi.objectId().required(),
            movieId : Joi.objectId().required(),
            dateOut : Joi.date().required(),
            dateReturned : Joi.date(),
            rentalFee : Joi.number()
        }
        return Joi.validate(inputs,schema);
    },
}

module.exports = RentalService;