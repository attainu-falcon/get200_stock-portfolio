function getstocksymbolofusers(){
    var stocklist=[];
    $.ajax({
      'url':'../userportfolio',
      'type':'get',
      'datatype':'json',
      success:function(data){
        var totalportfolio = data;
        var portfoliotable = '<div data-spy="scroll" data-target="#list-example" data-offset="0" class="scrollspy-example ">';
        for(var i=0;i<totalportfolio.length;i++){
          console.log(totalportfolio[i].portfolio_name);
  
          var portfolioName = '<div id="list-example" class="list-group col-md-auto bg-dark text-white">';
          portfolioName += '<a class="list-group-item list-group-item-action bg-dark text-white text-center" style="font-size:25px" href="#list-item-'+i+'">'+totalportfolio[i].portfolio_name+'</a></div>';
  
          
          
  portfoliotable +=  '<h3 class="bg-info text-white text-center w-100 mx-auto" id="list-item-'+i+'">'+totalportfolio[i].portfolio_name+'</h3>';
          portfoliotable += '<table class="table table-hover table-dark" style="font-size:12px">';
          portfoliotable += '<thead class="bg-info text-white">';
          portfoliotable += '<tr>'
          portfoliotable += '<th class="col-xs-2">Symbol</th>';
          portfoliotable += '<th class="col-xs-2">Company Name</th>';
          portfoliotable += '<th class="col-xs-2">Buy Price</th>';
          portfoliotable += '<th class="col-xs-2">Invest Date</th>';
          portfoliotable += '<th class="col-xs-2">Quantity</th>';
          portfoliotable += '<th class="col-xs-2">Initial Networth</th>';
          portfoliotable += '<th class="col-xs-2">Current Price</th>';
          portfoliotable += '<th class="col-xs-2">Final Networth</th>';
          portfoliotable += '<th class="col-xs-2">Gain or Loss Value</th>';
          portfoliotable += '<th class="col-xs-2">Gain or Loss %</th>';
          portfoliotable += '</thead>';
          portfoliotable += '<tbody>';
           
          for(var j=0;j<totalportfolio[i].companies.length;j++)
          {
                console.log(totalportfolio[i].companies[j].symbol);
                console.log(totalportfolio[i].companies[j].buy_price);
                var buyprice = totalportfolio[i].companies[j].buy_price;
                var quant = totalportfolio[i].companies[j].quantity;
                var inetworth =+ buyprice*quant;
                var currentprice = getprice(totalportfolio[i].companies[j].symbol);
                console.log(currentprice);
                var fnetworth =+ (currentprice*quant).toFixed(5);
                var gl =+ (fnetworth - inetworth).toFixed(5);
                var glpercent =+ ((gl/inetworth)*100).toFixed(5) ;
              portfoliotable += '<tr>';
              portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].symbol+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].name+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].buy_price+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].invest_date+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].quantity+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+inetworth+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+currentprice+'</td>';
              portfoliotable +=  '<td class="col-xs-2">'+fnetworth+'</td>';
              if(gl<0){
              portfoliotable +=  '<td class="col-xs-2 text-danger font-weight-bold">'+gl+'</td>';
              portfoliotable +=  '<td class="col-xs-2 text-danger font-weight-bold">'+glpercent+'</td>';
              }
              else{ 
                portfoliotable +=  '<td class="col-xs-2 text-success font-weight-bold">'+gl+'</td>';
                portfoliotable +=  '<td class="col-xs-2 text-success font-weight-bold">'+glpercent+'</td>';
              }
              
              portfolioName += '<tr>';
              
          }
          portfoliotable += '</tbody></table></div>';
          $('.container').append(portfolioName); 
            
        }
        $('.container').append(portfoliotable);
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