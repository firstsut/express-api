const log = require('./middleware/logger');
const helmet = require('helmet');
const config = require('config');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const Authenticate = require('./middleware/authentication');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const courses_route = require('./routes/courses.route');
const genres_route = require('./routes/genres.route');

const logDirectory = path.join(__dirname, 'logs');

log(`Application Name : ${config.get('name')}`);

app.use(helmet()); // middleware for helps you secure
app.use(express.json()); // req.body 
app.use(express.urlencoded({extended:true})); // form with input fields (key=value&key1=value1)
app.use(express.static('public')); //static public path
app.use(Authenticate); //Custom middleware

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
        useFindAndModify : false,
        useCreateIndex : true
    })
    .then(()=>{      
        log('Connected to MongoDB...');
    }).catch(err=>{
        log('Could not connect to MongoDB...',err);
    })

//use router
app.get('/',(req,res)=>{  res.send('Express RESTful API...'); });
app.use('/api/courses',courses_route);
app.use('/api/genres',genres_route);


//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    log(`Listening on port : ${PORT}...`);
});