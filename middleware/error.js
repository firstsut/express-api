const {ErrorResponse} = require('../helper/response');
function error(err,req,res,next){    
     res.status(500).json({error : ErrorResponse(err)});   
}
module.exports = error;