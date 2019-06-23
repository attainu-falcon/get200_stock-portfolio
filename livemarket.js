var express =require('express');
var session = require('express-session');
var router = express.Router();

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/',function(req,res){
     if(req.app.locals.login == true){
         res.sendfile('livemarket.html');
     }
     else{
         res.sendfile('public/signin.html');
     }
});

router.post('/logout',function(req,res){
    req.app.locals.login = false;
    req.session = null;
    res.redirect('/');
});

module.exports = router;