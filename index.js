var express = require('express');
var app = express();
//var hbs = require('express-handlebars');
//var path = require('path');
var bodyParser = require('body-parser');
//var mongoClient = require('mongodb').MongoClient;
var homepage = require('./homepage');
var portfolio = require('./portfoliopage');
var livemarket = require('./livemarket');
var whystocks = require('./whystocks');

app.use(bodyParser.urlencoded({ extended: true }));

//mongoClient.connect('mongodb://localhost:27017/attainu',function(err , client){
//    
//    if(err) throw err;
//   
//    app.locals.db = client.db('attainu');
//
//});
app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendfile('public/home.html');
})

app.use('/homepage',homepage);
app.use('/portfoliopage',portfolio);
app.use('/livemarket',livemarket);
app.use('/whystocks',whystocks);

app.listen(3000);