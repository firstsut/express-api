const jwt = require('jsonwebtoken');
const config = require('config');
const {ErrorResponse} = require('../helper/response');

function authentication(req,res,next){
    console.log('Authenticating custom middleware...');
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({error : ErrorResponse("Access denied. No token provided")})
    
    try{
        const decode = jwt.verify(token,config.get('JWT_SECRET_KEY'));
        req.user = decode;
        next();
    }catch(err){
        return res.status(400).json({error : ErrorResponse("Invalid Token.")})
    }

}
module.exports = authentication;