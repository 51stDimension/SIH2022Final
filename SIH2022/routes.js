const routes = require('next-routes')();//Require statement here returns a function

// routes.add('..','..');
routes
  .add('/firs/new','/firs/new')
  .add('/firs/:address','/firs/show');

//Argument 1:If a user goes to a route of similar pattern
//Argument 2:Which js file should be rendered

module.exports = routes;
