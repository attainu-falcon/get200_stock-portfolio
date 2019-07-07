/***
 * livemarket detailed table of 100 companies
 * coded by suraj kawale
 */
function symbolist(){
    $.ajax({
      
      'url':'https://financialmodelingprep.com/api/v3/company/stock/list',
      'type':'GET',
      'crossDomain':true,
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
             'crossDomain':true,
             'datatype':'JSON',
             success:function(data){
             // console.log(data);
              content = '<tr>'
              content += '<td class="col-xs-8">'+data.profile["companyName"]+'</td>';
              content += '<td class="col-xs-2">'+data.symbol+'</td>';
              content += '<td class="col-xs-2">'+data.profile["industry"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["sector"]+'</td>';
              content += '<td class="col-xs-2 text-primary">'+data.profile["price"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["volAvg"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["mktCap"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["range"]+'</td>';
              if(data.profile["changes"]<0){
              content += '<td class="col-xs-2 text-danger">'+data.profile["changes"]+'</td>';
              content += '<td class="col-xs-2 text-danger">'+data.profile["changesPercentage"]+'</td>';
              }
              else{
                content += '<td class="col-xs-2 text-success">'+data.profile["changes"]+'</td>';
              content += '<td class="col-xs-2 text-success">'+data.profile["changesPercentage"]+'</td>';
              }
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