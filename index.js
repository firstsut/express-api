const express = require('express');
const app = express();
const DB = require('./lib/db');
const Bootstrap = require('./lib/boostrap');
const Router = require('./routes/index');
const log = require('./middleware/logger');

//auto load
Bootstrap(app,express,log);

//Connect mongoDB
DB();
    
//load router
Router(app);


//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    log(`Listening on port : ${PORT}...`);
});