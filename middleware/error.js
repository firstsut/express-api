const {ErrorResponse} = require('../helper/response');
const winston = require('winston');

function error(err,req,res,next){           
     const errors = {error : ErrorResponse(err)};
     winston.error(errors);
     res.status(500).json(errors);   
}
module.exports = error;