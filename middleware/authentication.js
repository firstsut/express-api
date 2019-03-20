function authentication(req,res,next){
    console.log('Authenticating custom middleware...');
    next();
}
module.exports = authentication;