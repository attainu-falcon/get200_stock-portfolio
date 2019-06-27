var express =require('express');
var router = express.Router();

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/',function(req,res){

    if(req.session.login == true){

        res.sendfile('whystocks.html');
    }
    else{
        res.sendfile('public/signin.html');
    }
    
});
router.post('/logout',function(req,res){
    req.session.destroy();
    res.sendfile('public/signin.html');
});
module.exports = router;