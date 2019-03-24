const express = require('express');
const app = express();
const winston = require('winston');

//auto load log,db,bootstrap,routes
require('./lib/log')(app);
require('./lib/db')();
require('./lib/boostrap')(app,express);
require('./lib/routes')(app);

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    winston.info(`Listening on port : ${PORT}...`);
});