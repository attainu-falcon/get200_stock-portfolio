var express =require('express');
var router = express.Router();

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.get('/',function(req,res){
    if(req.session.login === true)
    res.sendfile('public/home.html');
    else {
        res.sendfile('public/signin.html');
    }
});



module.exports = router;