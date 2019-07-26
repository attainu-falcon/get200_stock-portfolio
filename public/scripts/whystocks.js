/**
 * market news code
 * coded by suraj kawale
 */


function majorindexes(){
    $.ajax({
      url:'https://financialmodelingprep.com/api/v3/majors-indexes',
      type:'GET',
      crossDomain:true,
      success:function(data){
        console.log(data.majorIndexesList);
        var indexesList = data.majorIndexesList;
        for(var i=0;i<data.majorIndexesList.length;i++){
          $('#list-item-a').append('<div class="col-4">\
          <div class="card" style="max-width: 20rem;">\
            <div class="card-header bg-dark text-white text-center">'+indexesList[i].ticker+'</div>\
             <div class="card-body text-white text-center bg-info">\
             <h5 class="card-title">Price : '+indexesList[i].price+'</h5>\
             <h5 class="card-title"> Changes :'+indexesList[i].changes+'</h5>\
             </div>\
              <div class="card-footer bg-dark text-white text-center">'+indexesList[i].indexName+'</div></div></div>')
        }
      }
    });
  
  }
  majorindexes();
  
  function majoractives(){
    $.ajax({
      url:'https://financialmodelingprep.com/api/v3/stock/actives',
      type:'GET',
      crossDomain:true,
      success:function(data){
        console.log(data.mostActiveStock);
        var active = data.mostActiveStock;
        for(var i=0;i<data.mostActiveStock.length;i++){
          $('#list-item-b').append('<div class="col-4">\
          <div class="card" style="max-width: 20rem;">\
            <div class="card-header bg-dark text-white text-center">'+active[i].ticker+'</div>\
             <div class="card-body text-white bg-info text-center">\
             <h5 class="card-title">Price : '+active[i].price+'</h5>\
             <h5 class="card-title"> Changes :'+active[i].changes+'</h5>\
             <h5 class="card-title"> Change %:'+active[i].changesPercentage+'</h5>\
             </div>\
              <div class="card-footer bg-dark text-white text-center">'+active[i].companyName+'</div></div></div>')
        }
      }
    });
  
  }
  majoractives();
  
  function gainerandlosers(){
    $.ajax({
      url: "https://financialmodelingprep.com/api/v3/stock/gainers",
      datatype: "json",
      success: function(data){
        
        for(var i=0; i<5; i++){
          $('#gainers').append('\
                          <tr>\
                            <td>' +data.mostGainerStock[i].ticker +'</td>\
                            <td>' +data.mostGainerStock[i].companyName +'</td>\
                            <td>' +data.mostGainerStock[i].price +'</td>\
                            <td>' +data.mostGainerStock[i].changes +'</td>\
                            <td>' +data.mostGainerStock[i].changesPercentage +'</td></tr>')
          console.log(data.mostGainerStock[i]);
          
        }
      }
    })
    $.ajax({
      url: "https://financialmodelingprep.com/api/v3/stock/losers",
      datatype: "json",
      success: function(data){
        
        for(var i=0; i<5; i++){
          $('#losers').append('\
                          <tr>\
                            <td>' +data.mostLoserStock[i].ticker +'</td>\
                            <td>' +data.mostLoserStock[i].companyName +'</td>\
                            <td>' +data.mostLoserStock[i].price +'</td>\
                            <td>' +data.mostLoserStock[i].changes +'</td>\
                            <td>' +data.mostLoserStock[i].changesPercentage +'</td></tr>')
          console.log(data.mostLoserStock[i]);
          
        }
      }
    })
  }
  
  gainerandlosers();
  
  function sectors(){
    $.ajax({
      url:'https://financialmodelingprep.com/api/v3/stock/sectors-performance',
      type:'GET',
      crossDomain:true,
      success:function(data){
        console.log(data.sectorPerformance);
        var List = data.sectorPerformance;
        for(var i=0;i<data.sectorPerformance.length;i++){
          $('#list-item-e').append('<div class="col-4"><div class="card">\
                       <div class="card-header bg-dark text-white text-center"><h3>'+List[i].name+'</h3></div>\
                        <div class="card-body bg-info text-white text-center"><h5 class="card-title"> Changes Percentage : '+List[i].change+'</h5></div></div></div>')
        }
      }
    });
  
  }
  sectors();
  
  function cyrptos(){
    $.ajax({
      url:'https://financialmodelingprep.com/api/v3/cryptocurrencies',
      type:'GET',
      crossDomain:true,
      success:function(data){
        console.log(data.cryptocurrenciesList);
        var cur = data.cryptocurrenciesList;
        for(var i=0;i<data.cryptocurrenciesList.length;i++){
          $('#list-item-f').append('<div class="col-4">\
          <div class="card border-success mb-3" style="max-width: 20rem;">\
            <div class="card-header bg-dark text-white text-center">'+cur[i].ticker+'</div>\
             <div class="card-body text-white bg-info text-center">\
             <h5 class="card-title">Price : '+cur[i].price+'</h5>\
             <h5 class="card-title"> Changes :'+cur[i].changes+'</h5>\
             <h5 class="card-title"> Market Cap :'+cur[i].marketCapitalization+' $</h5>\
             </div>\
              <div class="card-footer bg-dark text-white text-center">'+cur[i].name+'</div></div></div>')
        }
      }
    });
  
  }
  cyrptos();
  
  document.onreadystatechange = function(){
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