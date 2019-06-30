var express =require('express');
var router = express.Router();

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/',function(req,res){
     if(req.session.login === true){
         res.sendfile('watchlist.html');
     }
     else{
         res.sendfile('public/signin.html');
     }
});

router.delete('/',function(req,res){
    var email = req.app.locals.username;
    req.app.locals.db.collection('users').update(
        {"email": email},
        { $pull: { 'watchlist': { symbol: 'CZR' } } },
        function(err,result)
        {
            if(err) throw err;
            console.log(result);
            res.json(result);   
        }
      );
})

router.post('/logout',function(req,res){
    
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;