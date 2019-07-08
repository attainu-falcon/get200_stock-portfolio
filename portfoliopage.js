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

router.delete('/:porfolioname/:symbol',function(req,res){
    var email = req.session.user;
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
router.delete('/:pfname',function(req,res){
    console.log(req.params.pfname);
    var email = req.session.user;
    var porfolioname =req.params.pfname;
    console.log('this portfolio delete route hit'+porfolioname);
    req.app.locals.db.collection('users').updateOne(
        {"email":email},
        {$pull:{'portfolios':{'portfolio_name':req.params.pfname} } },
        function(err,result)
        {
            if(err) throw err;
           // console.log(result);
            res.json(result);   
        }
    );
})

router.post('/addstocks',function(req,res){
                console.log(req.body);
                var email = req.session.user;
                req.app.locals.db.collection('users').updateOne(
                    {
                        "email":email,
                        'portfolios.portfolio_name':req.body.pfname
            
                    },
                    {$push:{'portfolios.$.companies':{symbol:req.body.symbol,name:req.body.companyname,
                        buy_price:req.body.bprice,
                        quantity:req.body.quantity,
                       invest_date:req.body.investdate}}},
                    
                    function(err,result)
                    {
                        if(err) throw err;
                       // console.log(result);
                        res.redirect('/portfoliopage');   
                    }
                  );
                
});

router.post('/addgoal',function(req,res){
    var email = req.session.user;
    var goal = req.body.goal;
    console.log("post route hit"+goal);
    console.log(email);
    req.app.locals.db.collection('users').updateOne(
        {"email":email},
        {$push : {'portfolios' : {'portfolio_name':goal,
        "companies":[]
    }
        
        }},
        function(err,result)
            {
            if(err) throw err;
            res.redirect('/portfoliopage');
        }
        
    );
});

router.post('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

