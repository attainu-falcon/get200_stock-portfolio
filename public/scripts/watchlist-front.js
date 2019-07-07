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
              content += '<td class="col-xs-2 text-primary">'+data.profile["price"]+'</td>';
              content += '<td class="col-xs-2">'+data.profile["range"]+'</td>';
            
              if(data.profile["changes"]<0){
                  content += '<td class="col-xs-2 font-weight-bold" style="color:red">'+data.profile["changes"]+'</td>';
                  content += '<td class="col-xs-2 font-weight-bold" style="color:red">'+data.profile["changesPercentage"]+'</td>';
              }
              else
              {
                 content += '<td class="col-xs-2 font-weight-bold" style="color:green">'+data.profile["changes"]+'</td>';
                content += '<td class="col-xs-2 font-weight-bold"  style="color:green">'+data.profile["changesPercentage"]+'</td>';
              }
              content += '<td class="col-xs-2">'+data.profile["exchange"]+'</td>';
              content += '<td class="col-xs-2" style="font-size:24px">'+'<button class="btn btn-dark" onclick="confirm('+"'Do you want to delete?'"+') && deleteFunction(event)">'
              +'<i class="fa fa-trash">'+'</i>'+'</button>'+'</td>';
  
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
    var symbol = $($(event.target).closest('tr')).children()[1].innerText;
    $.ajax({
       'url':'/watchlist/'+symbol,
      'type':'DELETE',
      'datatype':'JSON',
      success:function(result){
        $(event.target).closest('tr').remove();
      
      }
    })
  };

  function addFunction(event){
    console.log(event.target)
    var symbol=$('#symbol').val();
    var elements =$('table tbody tr td:nth-child(2)');
    for(i=0;i<elements.length;i++){
      if(elements[i].innerText==symbol){
        alert("Symbol already exists");
        return;
      }
    }
    $.ajax({
       'url':'/watchlist/',
      'type':'POST',
      'datatype':'JSON',
      'data':{'symbol':symbol},
      success:function(result){
        console.log("added symbol successfully");
      
      }
    })
  }
  
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