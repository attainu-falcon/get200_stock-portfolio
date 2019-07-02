/**
 * code to display user watchlist
 * coded by harika thipparthi
 */

function symbolList(){
    $.ajax({
      
      'url':'../userwatchlist',
      'type':'GET',
      'datatype':'JSON',
      success:function(result){
        var list = result;
        console.log(result);
        var symbols = [];
        for(var i=0;i<list.length;i++){
            symbols.push(list[i].symbol);
        }
        
        var content;
        for(i=0;i<list.length;i++){
          $.ajax({
             'url':'https://financialmodelingprep.com/api/v3/company/profile/'+symbols[i],
             'type':'GET',
             'crossDomain':true,
             'datatype':'JSON',
             success:function(data){
               console.log(data);
              content = '<tr>'
              content += '<td class="col-xs-4">'+data.profile["companyName"]+'</td>';
              content += '<td class="col-xs-2">'+data.symbol+'</td>';
              content += '<td class="col-xs-2">'+data.profile["price"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["range"]+'</td>';
            
              if(data.profile["changes"]<0){
                  content += '<td class="col-xs-2" style="color:red">'+data.profile["changes"]+'</td>';
              content += '<td class="col-xs-2" style="color:red">'+data.profile["changesPercentage"]+'</td>';
              }
              else
              {
                 content += '<td class="col-xs-2" style="color:green">'+data.profile["changes"]+'</td>';
                content += '<td class="col-xs-2"  style="color:green">'+data.profile["changesPercentage"]+'</td>';
              }
              content += '<td class="col-xs-2">'+data.profile["exchange"]+'</td>';
              content += '<td class="col-xs-2" style="font-size:24px">'+'<button class="btn btn-dark" onclick="deleteFunction(event)">'+'<i class="fa fa-trash">'+'</i>'+'</button>'+'</td>';
  
              content += '</tr>'
              $('tbody').append(content);
              }
             });
      }
        }
       });
  }
  symbolList();

  function deleteFunction(event){
    console.log(event.target)
    var symbol = $($(event.target).parentsUntil('tbody')[1]).children()[1].innerText ;
    $.ajax({
       'url':'/watchlist/'+symbol,
      'type':'DELETE',
      'datatype':'JSON',
      success:function(result){
        location.reload();
      }
    })
  }
  
  