'use strict';

let jade = require('connect-jade-html');

module.exports = function(app) {
  
  app.set('view engine', 'jade');
  
  var router = app.loopback.Router();
  
  router.get('/ping', function(req, res) {
    res.render('index');
  });
  
  app.use(router);
};