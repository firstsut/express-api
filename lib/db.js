const mongoose = require('mongoose');
const config = require('config');
const log = require('../middleware/logger');
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
        log('Connected to MongoDB...');
    }).catch(err=>{
        isConnectedBefore = false;
        log('Could not connect to MongoDB...',err,'error');
    });
  }

  connect();

  mongoose.connection.on('error', function () {    
        log('Could not connect to MongoDB...',null,'error');
    })

    mongoose.connection.on('disconnected', function () {    
        isConnectedBefore = false;   
        log('Lost MongoDB connection...',null,'error');
        if (!isConnectedBefore) {
            setTimeout(() => connect(), RETRY_TIMEOUT)
        }
    })
    mongoose.connection.on('connected', function () {
        isConnectedBefore = true        
        log('Connection established to MongoDB...');
    })

    mongoose.connection.on('reconnected', function () {
        log('Reconnected to MongoDB...',null,"info");   
    })
}


