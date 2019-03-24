const helmet = require('helmet');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const config = require('config');
const winston = require('winston');

module.exports = (app,express,log)=>{

    if(!config.get('JWT_SECRET_KEY')){
        console.error("FATAL ERROR: apiJwtSecretKey is not defined");
        process.exit(1);
    }

    log(`Application Name : ${config.get('name')}`);

    const logDirectory = path.join(__dirname, '../logs');
    winston.configure({transports: [new winston.transports.File({ filename: logDirectory+'/api_log.log' }) ]});
  
    process.on("uncaughtException",(ex)=>{
        winston.error(ex.message);
        log(`uncaughtException : ${ex.message}`,null,'error');;
    })
 
    
    app.use(helmet()); // middleware for helps you secure
    app.use(express.json()); // req.body 
    app.use(express.urlencoded({extended:true})); // form with input fields (key=value&key1=value1)
    app.use(express.static('public')); //static public path
    //app.use(Authenticate); //Custom middleware
    
    // log all requests to access.log,error.log
    app.use(morgan('dev'));
    app.use(morgan('combined', {
        skip: function (req, res) { return res.statusCode >= 400 },
        stream: fs.createWriteStream(logDirectory+'/access.log', { flags: 'a' })
    }));
    app.use(morgan('combined', {
        skip: function (req, res) { return res.statusCode < 400 },
        stream: fs.createWriteStream(logDirectory+'/error.log', { flags: 'a' })
    }));
}