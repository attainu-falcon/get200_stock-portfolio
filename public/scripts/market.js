/**
 * losers and gainers
 * coded by lakshmikanth reddy
 */
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
        $('#loosers').append('\
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

/***
 * livemarket detailed table of 100 companies
 * coded by suraj kawale
 */
function symbolist(){
    $.ajax({
      
      'url':'https://financialmodelingprep.com/api/v3/company/stock/list',
      'type':'GET',
      'datatype':'JSON',
      success:function(result){
        var list = result.symbolsList;
        console.log(list);
        var symbols = [];
        for(var i=0;i<list.length;i++){
            symbols.push(list[i].symbol);
        }
        console.log(symbols)
        var content;
        for(i=0;i<30;i++){
          $.ajax({
             'url':'https://financialmodelingprep.com/api/v3/company/profile/'+symbols[i],
             'type':'GET',
             'datatype':'JSON',
             success:function(data){
             // console.log(data);
              content = '<tr>'
              content += '<td class="col-xs-8">'+data.profile["companyName"]+'</td>';
              content += '<td class="col-xs-2">'+data.symbol+'</td>';
              content += '<td class="col-xs-2">'+data.profile["industry"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["sector"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["price"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["volAvg"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["mktCap"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["range"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["changes"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["changesPercentage"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["exchange"]+'</td>';
              content += '</tr>'
  
              $('#livemarket').append(content);
  
         
             }
             
          });
        }
        }
        
        
      
    });
    
  }
  
  symbolist();