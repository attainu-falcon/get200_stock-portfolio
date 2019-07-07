
/***
 * code for preloader
 * coded by suraj kawale
 */


document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
       document.getElementById('contents').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
         document.getElementById('contents').style.visibility="visible";
      },1000);
  }
}




/***
 * Code for new carousel
 * coded by harika
 */

function newsmedia(){
  
    var content;
    $.ajax({
      'url':'https://newsapi.org/v2/top-headlines?country=IN&category=business&apiKey=fe831521f4ce42448f8b5b0e082028ec',
      'type':'GET',
      'datatype':'json',
      success:function(result){
        
          var news = result.articles;
         // console.log(news);
          console.log(news.length);
          for(var i=0;i<news.length;i++){
           if(i==0){
           content = '<div class="carousel-item active"><div class="media">';
           }
           else {content = '<div class="carousel-item"><div class="media">';}
           content += '<img src='+news[i].urlToImage+' class="mr-3" alt="..." height= 300px width=300px>';
           content += '<div class="media-body bg-dark text-white text-center" style="height:300px;width:400px"><h4 class="mt-1">'+news[i].title+'</h4>';
           content +=  '<p style="font-size:15px">'+news[i].description+'</p>';
           content += '<br><a class="btn btn-primary" href="'+news[i].url+'" role="button">Readmore</a>';
           content += '<br><blockquote class="blockquote mb-0"><footer class="blockquote-footer">Author:<cite title="Source Title">'+news[i].author+'</cite></footer></blockquote>';
           content += '</div></div></div>';
  
           $('.carousel-inner').append(content);
          }
           
        
      }
    });
  }
  
  newsmedia();

  /**
   * code for stock ticker
   * coded by harika
   */
  function symbolList(){
    $.ajax({
      
      'url':'https://financialmodelingprep.com/api/v3/company/stock/list',
      'type':'GET',
      'crossDomain':true,
      'datatype':'JSON',
      success:function(result){
        var list = result.symbolsList;
        var symbols = [];
        for(var i=0;i<list.length;i++){
            symbols.push(list[i].symbol);
        }
        var tickerdiv;
        var line;
        for(i=0;i<100;i++){
          $.ajax({
             'url':'https://financialmodelingprep.com/api/v3/company/profile/'+symbols[i],
             'type':'GET',
             'crossDomain': true,
             'datatype':'JSON',
             success:function(data){
              tickerdiv="";
              tickerdiv += '<div class="ticker-item">'+data.symbol+'</div>';
              tickerdiv += '<div class="ticker-item">'+data.profile["price"]+'</div>';
             
              if(data.profile["changes"]>0)
              {
   tickerdiv += '<div class="ticker-item" style="color:green">'+data.profile["changes"]+'</div>';
              }
              else
              {
                tickerdiv += '<div class="ticker-item" style="color:red">'+data.profile["changes"]+'</div>';
              }
              tickerdiv += '<div class="vl" style="height:30px; border-right:2px solid #3498db">';
              tickerdiv += '</div';
            
            $('.ticker-move').append(tickerdiv);
               $(tickerdiv).append(line);
              }
             });
      }
        }
       });
  }
  symbolList();
/**
 * code for watchlist cards
 * coded by harika thipparthi
 */
function getwatchlist(input) {
  $.ajax({
    url: '../userwatchlist',
    type: "GET",
    dataType: 'json',
    success: function (result) {
      var user = result;
      
      var symbols = [];
      for (var i = 0; i < user.length; i++) {
        symbols.push(user[i].symbol);
      }

      var contentdiv;
      for (i = 0; i < symbols.length; i++) {
        $.ajax({
          'url': 'https://financialmodelingprep.com/api/v3/company/profile/' + symbols[i],
          'type': 'GET',
          'crossDomain':true,
          'datatype': 'JSON',
          success: function (data) {
            console.log(data);
            contentdiv = "";
            contentdiv += '<div class="col-4 p-2 mt-auto mx-auto">';
            contentdiv += '<div class="card card-block text-center" style="min-width:300px;min-height:300px"><div class="card-header bg-dark text-white text-center">';
            contentdiv += '<h4 class="card-title" style="font-size:17px">'+data.profile["companyName"]+'</h4></div>';
            
            contentdiv += '<div class="card-body bg-info">';
            contentdiv += '<h6 class="card-subtitle mb-2 text-white">Symbol:</h6><p class="text-dark font-italic"><strong>'+data.symbol+'</strong></p>';
            contentdiv += '<h6 class="card-subtitle mb-2 text-white">Price:</h6><p class="text-dark font-italic"><strong>'+data.profile["price"]+'</strong></p>';
            if(data.profile["changes"]>0){
            contentdiv += '<h6 class="card-subtitle mb-2 text-white">Change(%Change):</h6><p class="card-subtitle mb-2 font-italic" style="color:green"><strong>'+data.profile["changes"]+data.profile["changesPercentage"]+'</strong></p></div>';
            }
            else{
              contentdiv += '<h6 class="card-subtitle mb-2 text-white">Change(%Change):</h6><p class="card-subtitle mb-2 font-italic" style="color:red"><strong>'+data.profile["changes"]+data.profile["changesPercentage"]+'</strong></p></div>';
              }
            contentdiv += '<div class="card-footer bg-dark">';
            contentdiv += '<h6 class="text-white">Sector Name:'+data.profile["sector"]+'</h6>';
            contentdiv +=  '</div></div></div>';
        $('.watchlistcards').append(contentdiv);
        

        
          }
          ,
          statusCode: {
            404: function () {
              alert("Page not found");
            }
          }
        });
  }
    }
  })
}

getwatchlist();

  /**
   * Code for portfolio Card
   * coded by suraj kawale
   * 
   */

  function getstocksymbolofusers(){
    var stocklist=[];
    $.ajax({
      'url':'../userportfolio',
      'type':'get',
      'datatype':'json',
      success:function(data){
        var totalportfolio = data;
        for(var i=0;i<totalportfolio.length;i++){
         // console.log(totalportfolio[i].portfolio_name);
            var gainer = '';gainedValue = 0;var totalvalue = 0;
            var loser = ''; lostValue = Infinity;var totalnetworth =0;
            var portfoliocard = '<div class="col-4 p-2 mt-auto mx-auto">';
            portfoliocard += '<div class="card card-block text-center" style="min-width:300px;min-height:300px"><div class="card-header bg-dark text-white text-center">';
            portfoliocard += '<h3 class="card-title">'+totalportfolio[i].portfolio_name+'</h3></div>';
            for(var j=0;j<totalportfolio[i].companies.length;j++)
          {
               // console.log(totalportfolio[i].companies[j].symbol);
               // console.log(totalportfolio[i].companies[j].buy_price);
                var buyprice = totalportfolio[i].companies[j].buy_price;
                var quant = totalportfolio[i].companies[j].quantity;
                var inetworth =+ buyprice*quant;
                var currentprice = getprice(totalportfolio[i].companies[j].symbol);
               // console.log(currentprice);
                var fnetworth =+ (currentprice*quant).toFixed(5);
                var gl =+ (fnetworth - inetworth).toFixed(5);
                var glpercent =+ ((gl/inetworth)*100).toFixed(5);
                totalnetworth += fnetworth;
                totalvalue += gl; 
                if(gl>gainedValue){
                gainedValue=gl;
                gainer = totalportfolio[i].companies[j].name;
                }
                if(gl<lostValue){
                  lostValue = gl;
                  loser = totalportfolio[i].companies[j].name; 
                  }
  
                
                
              
          }
         // console.log(gainer);
         // console.log(loser);
          portfoliocard += '<div class="card-body bg-info">';
          portfoliocard += '<h6 class="card-subtitle mb-2 text-white">TOP GAINER:</h6><p class="text-dark font-italic"><strong>'+gainer+'</strong></p><br><br>';
          portfoliocard += '<h6 class="card-subtitle mb-2 text-white">TOP LOSER:</h6><p class="text-dark font-italic"><strong>'+loser+'</strong></p></div>';
          portfoliocard += '<div class="card-footer bg-dark">';
          portfoliocard += '<h6 class="text-white">Networth:'+totalnetworth+'$</h6>';
          portfoliocard += '<h6 class="text-white">Total Gain/Loss:'+totalvalue+'$</h6>';
          portfoliocard +=  '</div></div></div>';
          $('.portfoliocards').append(portfoliocard);
        }
       
      }
    });
    return stocklist;
  }
  
  
  getstocksymbolofusers();
  function getprice(symbol){
          var cprice;
         $.ajax({
           'url':'https://financialmodelingprep.com/api/v3/stock/real-time-price/'+symbol,
           'async': false,
           'corssDomain':true,
           'type':'get',
            'datatype':'json',
            success:function(data){
                 //console.log(data.profile.price);
                     cprice = data.price;
                    // console.log(cprice);
                     
            }
         });
      return cprice;   
  }