const express = require('express');
const app = express();
const log = require('./middleware/logger');

//auto load db,bootstrap,routes
require('./lib/db')();
require('./lib/boostrap')(app,express,log);
require('./lib/routes')(app);

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    log(`Listening on port : ${PORT}...`);
});