const log = require('./middleware/logger');
const helmet = require('helmet');
const config = require('config');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const Authenticate = require('./middleware/authentication');
const Error = require('./middleware/error');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customers_route = require('./routes/customers.route');
const genres_route = require('./routes/genres.route');
const movies_route = require('./routes/movies.route');
const rentals_route = require('./routes/rentals.route');
const users_route = require('./routes/users.route');
const auth_route = require('./routes/auth.route');

const logDirectory = path.join(__dirname, 'logs');

log(`Application Name : ${config.get('name')}`);

if(!config.get('JWT_SECRET_KEY')){
    console.error("FATAL ERROR: apiJwtSecretKey is not defined");
    process.exit(1);
}
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

//Connect mongoDB
mongoose.connect('mongodb://localhost:27017/api',
    { 
        useNewUrlParser: true,
        useCreateIndex: true     
        //useFindAndModify : false,
    })
    .then(()=>{      
        log('Connected to MongoDB...');
    }).catch(err=>{
        log('Could not connect to MongoDB...',err);
    })

//use router
app.get('/',(req,res)=>{  res.send('Express RESTful API...'); });
app.use('/api/customers',Authenticate,customers_route);
app.use('/api/genres',Authenticate,genres_route);
app.use('/api/movies',Authenticate,movies_route);
app.use('/api/rentals',Authenticate,rentals_route);
app.use('/api/users',Authenticate,users_route);
app.use('/api/auth',auth_route);
app.use(Error);


//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    log(`Listening on port : ${PORT}...`);
});