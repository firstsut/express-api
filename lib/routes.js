const customers_route = require('../routes/customers.route');
const genres_route = require('../routes/genres.route');
const movies_route = require('../routes/movies.route');
const rentals_route = require('../routes/rentals.route');
const users_route = require('../routes/users.route');
const auth_route = require('../routes/auth.route');
const Authenticate = require('../middleware/authentication');
const Admin = require('../middleware/admin');
const Error = require('../middleware/error');

module.exports = (app)=>{
    app.get('/',(req,res)=>{    
        res.send('Express RESTful API...'); 
       });
   app.use('/api/customers',Authenticate,customers_route);
   app.use('/api/genres',Authenticate,genres_route);
   app.use('/api/movies',Authenticate,movies_route);
   app.use('/api/rentals',Authenticate,rentals_route);
   app.use('/api/users',Authenticate,users_route);
   app.use('/api/auth',auth_route);
   app.use(Error);
}