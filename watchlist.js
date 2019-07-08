var express =require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/',function(req,res){
     if(req.session.login === true){
         res.sendfile('watchlist.html');
     }
     else{
         res.sendfile('public/signin.html');
     }
});

router.delete('/:symbol',function(req,res){
    var email = req.session.user;
    var symbol = req.params.symbol;
    console.log("delete route hit"+ symbol);
    // console.log(email);
    req.app.locals.db.collection('users').updateOne(
        {"email": email},
        { $pull: { 'watchlist': { 'symbol': symbol } } },
        function(err,result)
        {
            if(err) throw err;
           // console.log(result);
           res.json(result);
   
        }
      );
});

router.post('/',function(req,res){
    var email = req.session.user;
    var symbol = req.body.symbol;
    console.log("post route hit"+symbol);
    // console.log(email);
    req.app.locals.db.collection('users').updateOne(
        {"email":email},
        {$push : {'watchlist' : {'symbol':symbol}}},
        function(err,result)
            {
            if(err) throw err;
            res.redirect('/watchlist');
        }
        
    );
});


router.post('/logout',function(req,res){
    
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;