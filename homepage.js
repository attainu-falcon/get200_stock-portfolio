var express =require('express');
var path = require('path');
var router = express.Router();

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/',function(req,res){
    if(req.session.login === true)
    res.sendfile('home.html');
    else {
        res.sendfile('public/signin.html');
    }
});
router.post('/logout',function(req,res){
   req.session.destroy();
    res.redirect('/');
});


module.exports = router;