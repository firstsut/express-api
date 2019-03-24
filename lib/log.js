const path = require('path');
const config = require('config');
const winston = require('winston');
const fs = require('fs');
const morgan = require('morgan');

module.exports = (app)=>{

    const logDirectory = path.join(__dirname, '../logs');

    const files = new winston.transports.File({ filename: logDirectory+'/api_log.log' });
    const file_exceptions = new winston.transports.File({ filename: logDirectory+'/uncaughtException.log' });
    const console = new winston.transports.Console({
        colorize : true,
        prettyPrint : true,
        format: winston.format.simple()
    });
    const console_exceptions = new winston.transports.Console({
        colorize : true,
        prettyPrint : true,
        format: winston.format.simple()
    });
    
    winston.add(console,files);
    winston.exceptions.handle(console_exceptions,file_exceptions);

    winston.info(`Application Name : ${config.get('name')}`);    
    if(!config.get('JWT_SECRET_KEY')){
        winston.error('JWT_SECRET_KEY is not defined');  
        throw new Error("JWT_SECRET_KEY is not defined");        
    }    
    
    process.on("unhandledRejection",(ex)=>{      
        winston.error(`unhandledRejection : ${ex.message}`);
        throw ex;
    })

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