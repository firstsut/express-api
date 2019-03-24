const {ErrorResponse} = require('../helper/response');

module.exports = (req,res,next)=>{
    if(!req.user.isAdmin) return res.status(403).json({error : ErrorResponse("Access denied.")});
    next();
}