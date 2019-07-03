var express =require('express');
var router = express.Router();

var path = require('path');

var ObjectId = require('mongodb').ObjectID;

router.use(express.static('public'));

router.get('/',function(req,res){
    if(req.session.login === true){
        res.sendfile('portfolio.html');
    }
    else{
        res.sendfile('public/signin.html');
    }
});

router.delete('/:porfolioname,:symbol',function(req,res){
    var email = req.app.locals.user;
    var porfolioname =req.params.porfolioname
    var symbol = req.params.symbol;
    console.log("delete route hit"+ symbol+porfolioname);
    console.log(email);
    req.app.locals.db.collection('users').updateOne(
        {
            "email":email,
            'portfolios.portfolio_name':porfolioname

        },
        {$pull:{'portfolios.$.companies':{symbol:symbol}}},
        
        function(err,result)
        {
            if(err) throw err;
           // console.log(result);
            res.json(result);   
        }
      );
})

router.get('/addportfolio',function(req,res){

    if(req.session.login == true){
      res.sendfile('portfolio.html');
    }
    else{
        res.sendfile('public/signin.html');
    }
});

router.post('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

