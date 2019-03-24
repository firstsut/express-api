const path = require('path');
const config = require('config');
const winston = require('winston');
const fs = require('fs');
const morgan = require('morgan');

module.exports = (app,log)=>{
    log(`Application Name : ${config.get('name')}`);    
    if(!config.get('JWT_SECRET_KEY')){
        log('JWT_SECRET_KEY is not defined',null,'fatal');  
        throw new Error("JWT_SECRET_KEY is not defined");        
    }

    const logDirectory = path.join(__dirname, '../logs');
    winston.add(new winston.transports.File({ filename: logDirectory+'/api_log.log' }) );
  
    winston.exceptions.handle(new winston.transports.File({ filename: logDirectory+'/uncaughtException.log' }) );
    
    process.on("unhandledRejection",(ex)=>{      
        log(`unhandledRejection : ${ex.message}`,null,'error');
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