var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose'); 

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  });
  app.use(app.router);
});

routes = require('./routes/payment')(app);
routes = require('./routes/project')(app);

mongoose.connect('mongodb://localhost/commeetup', function(error, res) {
  if(error) {
    console.log('ERROR: connecting to StreetPay MongoDB Database. ' + error);
  } else {
    console.log('Connected to StreetPay MongoDB Database');
  }
});

server.listen(3002, function() {
  console.log("StreetPay node server running on http://localhost:3002");
});