const routes = require('next-routes')();//Require statement here returns a function

// routes.add('..','..');
routes
  .add('/firs/getqr/:address','/firs/getqr')
  .add('/firs/new','/firs/new')
  .add('/firs/:address','/firs/show')
  .add('/firs/:address/update','/firs/update');

//Argument 1:If a user goes to a route of similar pattern
//Argument 2:Which js file should be rendered

module.exports = routes;
