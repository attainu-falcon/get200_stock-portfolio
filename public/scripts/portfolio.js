/**
 * Code for portfolio page 
 * Coded By Suraj Kawale
 */

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
       // console.log(totalportfolio[i].portfolio_name);

        var portfolioName = '<div id="list-example" class="list-group bg-dark text-white">';
        portfolioName += '<a class="list-group-item list-group-item-action bg-dark text-white text-center" style="font-size:15px" href="#list-item-'+i+'">'+totalportfolio[i].portfolio_name+'</a></div>';

        
        
        portfoliotable += '<div class="card border-info rounded">'
        portfoliotable += '<table class="table table-hover table-dark" style="font-size:12px">';
        portfoliotable += '<thead class="bg-info text-white">';
        portfoliotable += '<tr>'
        portfoliotable +=  '<th colspan="4"><button class="btn btn-lg btn-dark" value="Add Stocks" data-toggle="modal" data-target="#addstocksbtn" name="addstocks" id="addstocksbtn'+i+'" onclick="addFunction(event)">Add Stocks</button></th>';
        portfoliotable +=  '<th colspan="6" id ="pname"><h3 class="bg-info text-white mx-auto" id="list-item-'+i+'">'+totalportfolio[i].portfolio_name+'</h3></th>';
        portfoliotable += '<th colspan ="1"><button class="btn btn-sm btn-danger" onclick="confirm('+"'Do you want to delete this portfolio?'"+') && deleteportfolio(event)" id="portfoliodelete'+i+'">Delete</button>';
        portfoliotable += '</tr>';
        portfoliotable += '<tr>';
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
        portfoliotable += '<th class="col-xs-2">Delete</th>';
        portfoliotable += '</thead>';
        portfoliotable += '<tbody>';
         
        for(var j=0;j<totalportfolio[i].companies.length;j++)
        {
              //console.log(totalportfolio[i].companies[j].symbol);
              //console.log(totalportfolio[i].companies[j].buy_price);
              var buyprice = totalportfolio[i].companies[j].buy_price;
              var quant = totalportfolio[i].companies[j].quantity;
              var inetworth =+ buyprice*quant;
              var currentprice = getprice(totalportfolio[i].companies[j].symbol);
             // console.log(currentprice);
              var fnetworth =+ (currentprice*quant).toFixed(5);
              var gl =+ (fnetworth - inetworth).toFixed(5);
              var glpercent =+ ((gl/inetworth)*100).toFixed(5) ;
            portfoliotable += '<tr>';
            portfoliotable +=  '<td class="col-xs-2 id="sym">'+totalportfolio[i].companies[j].symbol+'</td>';
            portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].name+'</td>';
            portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].buy_price+'</td>';
            portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].invest_date+'</td>';
            portfoliotable +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].quantity+'</td>';
            portfoliotable +=  '<td class="col-xs-2">'+inetworth+'</td>';
            portfoliotable +=  '<td class="col-xs-2 text-primary">'+currentprice+'</td>';
            portfoliotable +=  '<td class="col-xs-2">'+fnetworth+'</td>';
            if(gl<0){
              portfoliotable +=  '<td class="col-xs-2 text-danger font-weight-bold">'+gl+'</td>';
              portfoliotable +=  '<td class="col-xs-2 text-danger font-weight-bold">'+glpercent+'</td>';
              }
              else{ 
                portfoliotable +=  '<td class="col-xs-2 text-success font-weight-bold">'+gl+'</td>';
                portfoliotable +=  '<td class="col-xs-2 text-success font-weight-bold">'+glpercent+'</td>';
              }
            portfoliotable += '<td class="col-xs-2" style="font-size:24px">'+'<button class="btn btn-dark" onclick="confirm('+"'Do you want to delete?'"+') && deleteFunction(event)" id="buttondelete'+i+'_'+j+'">'+'<i class="fa fa-trash">'+'</i>'+'</button>'+'</td>'
            portfolioName += '<tr>';
            
        }
        portfoliotable += '</tbody></table></div></div>';
        $('#pgoals').append(portfolioName); 
          
      }
      $('#ptables').append(portfoliotable);
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
         'crossDomain':true,
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

function deleteFunction(event){
  console.log(event.target)
  var symbol = $($(event.target).closest('tr')).children()[0].innerText ;
  console.log("symbol is"+symbol);
  var portfolioname = $(event.target).closest('table').find('#pname h3').text();
  console.log("portfolio name is"+portfolioname);
  $.ajax({
     url:'/portfoliopage/'+portfolioname+'/'+symbol,
    type:'DELETE',
    datatype:'JSON',
    success:function(result){
      console.log('deleted');
     // location.reload();
     $(event.target).closest('tr').remove();
    }
  })
}

function addFunction(event){
  console.log(event.target)
  var portfolioname = $($(event.target).parent().siblings()[0]).children()[0].innerText;
  console.log(portfolioname);
  document.getElementById('fname').innerHTML=portfolioname;
  document.getElementById('portname').value = portfolioname;
  var url = "https://financialmodelingprep.com/api/v3/company/stock/list";

            $.getJSON(url, function(data){
              //console.log(data.symbolsList);
              var list = data.symbolsList;
                $.each(list, function (index, value) {
                    // APPEND OR INSERT DATA TO SELECT ELEMENT.
                    $('#symbol').append('<option value="' + value.symbol + '">' + value.symbol + '</option>');
                   
                });
            });
        

        // SHOW SELECTED VALUE.
         $('#symbol').change(function(){
            var sym =  document.getElementById("symbol").value;
            $.ajax({
              url:'https://financialmodelingprep.com/api/v3/company/profile/'+sym,
              type:'GET',
              datatype:'json',
              success:function(data){
                var comp=data.profile.companyName;
                document.getElementById("companyName").value = comp;
              }
            })

        });
}

function deleteportfolio(event){
  console.log(event.target);
  var pfname = $($(event.target).parent().siblings()[1]).children()[0].innerText;
  console.log("portfolio name is"+pfname);
  $.ajax({
    url:'/portfoliopage/'+pfname,
   type:'delete',
   datatype:'JSON',
   success:function(result){
     console.log('deleted');
     $(event.target).closest('table').remove();
    }
 })
}