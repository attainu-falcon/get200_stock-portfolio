function symbolsearch(){
    $.ajax({
        url:'https://financialmodelingprep.com/api/v3/company/stock/list',
        type:'get',
        datatype:'json',
        crossDomain : true,
        success:function(data){
            var list = data.symbolsList;
            for(var i=0;i<200;i++){
                $('tbody').append('\
                                <tr class="text-center">\
                                <td>'+list[i].symbol+'</td>\
                                <td>'+list[i].name+'</td></tr>') 
            }
        }
    })
}

symbolsearch()