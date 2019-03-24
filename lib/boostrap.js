const helmet = require('helmet');

module.exports = (app,express)=>{

    app.use(helmet()); // middleware for helps you secure
    app.use(express.json()); // req.body 
    app.use(express.urlencoded({extended:true})); // form with input fields (key=value&key1=value1)
    app.use(express.static('public')); //static public path
        
}