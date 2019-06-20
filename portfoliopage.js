var express =require('express');
var router = express.Router();

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/',function(req,res){
       res.send('show portfolio');
});


router.get('/addportfolio',function(req,res){
    res.send('add portfolio');
});


module.exports = router;

