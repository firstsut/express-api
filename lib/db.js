const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
const RETRY_TIMEOUT = 10000;

module.exports = () =>{
    mongoose.Promise = global.Promise
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true  ,
      autoReconnect: true,
      //useMongoClient: true,
      keepAlive: true,
      keepAliveInitialDelay : 500,
      reconnectInterval: RETRY_TIMEOUT,
      reconnectTries: 30
    }
 let isConnectedBefore = false

  const connect = function () {
    return mongoose.connect('mongodb://'+config.get('MONGO_DB_URL'),options)
    .then(()=>{    
        isConnectedBefore = true;         
        winston.info('Connected to MongoDB...');
    });
  }

  connect();

  mongoose.connection.on('error', function () {   
        isConnectedBefore = false;
        winston.error('Could not connect to MongoDB...');
    })

    mongoose.connection.on('disconnected', function () {    
        isConnectedBefore = false;   
        winston.error('Lost MongoDB connection...');
        if (!isConnectedBefore) {
            setTimeout(() => connect(), RETRY_TIMEOUT)
        }
    })
    mongoose.connection.on('connected', function () {
        isConnectedBefore = true        
        winston.info('Connection established to MongoDB...');
    })

    mongoose.connection.on('reconnected', function () {
        winston.info('Reconnected to MongoDB...');   
    })
}


