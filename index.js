var express = require('express');
var session = require('express-session');
var app = express();
//var hbs = require('express-handlebars');
//var path = require('path');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var homepage = require('./homepage');
var portfolio = require('./portfoliopage');
var livemarket = require('./livemarket');
var whystocks = require('./whystocks');
var db;
var data;
mongoClient.connect('mongodb://localhost:27017/stockpileusers',function(err , client){    
    if(err) throw err;
   
    app.locals.db = client.db('stockpileusers');
    app.locals.db.collection('users').find({}).toArray(function(err ,result){
        if(err) {throw err;
        }
        data = result;
        console.log(data);
    });       

});

app.use(session({
    name:"cookie",
    secret:"get200project top secret!"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendfile('public/signin.html');
})

app.post('/auth',function(req,res){
    console.log(req.body);
      for(var i=0;i<data.length;i++){
          if(req.body.email === data[i].email && req.body.password === data[i].password){
              console.log(req.body);
              req.session.login = true;
              app.locals.user = data[i].email;
              app.locals.login = req.session.login;
             
          }
      }
          if(req.session.login == true){
              res.redirect('/homepage');
          }
          else{
              res.redirect('/');
          }
      
});

app.use('/homepage',homepage);
app.use('/portfoliopage',portfolio);
app.use('/livemarket',livemarket);
app.use('/whystocks',whystocks);


app.listen(3000);