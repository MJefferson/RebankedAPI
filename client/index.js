module.exports = function(){
  var fs = require('fs');
  var https = require('https');
  var express = require('express');
  var app = express();
  var jade = require('jade');
  var stylus = require('stylus');

  app.set('views', __dirname + '/landing_page');
  app.set('view engine', 'jade');
  
  console.log(__dirname);

  var options = {
    key  : fs.readFileSync(__dirname + '/server.key'),
    cert : fs.readFileSync(__dirname + '/server.crt')
  };
 

  // convert .styl requests to .css
  app.use(function(req, res, next){
    req.url = req.url.replace(/\.styl$/, '.css');
    next();
  });

  app.use( express.static(__dirname + '/landing_page') );

  app.use(stylus.middleware({
    src: __dirname + "/landing_page"
  }));

  app.get('/register', function (req, res) {
    // send email with activation link
    res.render('index');
  });

  app.get('/activate', function(req,res) {
    // expect user to have sent verification text back
    // update user model with activated flag
    // render set password view
  });


  app.get('/', function (req, res) {
    res.render('./index');
  });

  https.createServer(options, app).listen(3080, function () {
    console.log('Started!');
  });
}