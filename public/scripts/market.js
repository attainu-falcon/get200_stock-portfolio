/***
 * livemarket detailed table of 200 companies
 * coded by suraj kawale
 */
function symbolist(){
  var list = [ 'SPY',
    'CMCSA',
    'KMI',
    'INTC',
    'MU',
    'GDX',
    'GE',
    'BAC',
    'EEM',
    'XLF',
    'AAPL',
    'MSFT',
    'SIRI',
    'HPQ',
    'CX',
    'EFA',
    'CZR',
    'QQQ',
    'F',
    'AMD',
    'SNAP',
    'FB',
    'WFC',
    'AIG',
    'T',
    'C',
    'VALE',
    'MS',
    'AKS',
    'JPM',
    'ORCL',
    'NKE',
    'VWO',
    'PG',
    'FXI',
    'IWM',
    'GSM',
    'HK',
    'BBD',
    'PFE',
    'JD',
    'NOK',
    'TWTR',
    'AMLP',
    'AVGO',
    'AMAT',
    'WFT',
    'UVXY',
    'DWDP',
    'VXX',
    'VEA',
    'ZNGA',
    'XOM',
    'QCOM',
    'TVIX',
    'VIPS',
    'GLD',
    'CSCO',
    'AXP',
    'BMY',
    'V',
    'USO',
    'GRPN',
    'WP',
    'OIH',
    'GERN',
    'KEY',
    'RF',
    'KR',
    'HAL',
    'BABA',
    'MRO',
    'CLNS',
    'GILD',
    'IEMG',
    'GM',
    'FCX',
    'CRM',
    'ATVI',
    'SQ',
    'P',
    'XLK',
    'TWX',
    'NUE',
    'XOP',
    'SWN',
    'LOW',
    'RAD',
    'VEON',
    'HYG',
    'APC',
    'JNK',
    'EWJ',
    'XLU',
    'ESV',
    'SLB',
    'FLEX',
    'FOXA',
    'ABBV',
    'GIS',
    'VZ',
    'XRX',
    'CVLT',
    'IEFA',
    'X',
    'MAT',
    'CTL',
    'MIK',
    'DVN',
    'BKLN',
    'IBN',
    'MPC',
    'EZU',
    'PM',
    'MSCI',
    'RDN',
    'KO',
    'AABA',
    'SRC',
    'NFX',
    'COP',
    'CHK',
    'DIS',
    'LEN',
    'CVX',
    'PYPL',
    'GDXJ',
    'CTRP',
    'AUY',
    'DBEF',
    'WMT',
    'CLF',
    'MRK',
    'MDLZ',
    'RSPP',
    'GG',
    'MGM',
    'GFI',
    'KGC',
    'SCHW',
    'NBR',
    'SRCI',
    'JAG',
    'NVDA',
    'JNJ',
    'WDC',
    'BSX',
    'STI',
    'ON',
    'ITUB',
    'BK',
    'HMY',
    'APA',
    'HOME',
    'NGD',
    'KOS',
    'DAL',
    'INFY',
    'CCL',
    'BHGE',
    'MFGP',
    'PBR',
    'DISCA',
    'LPI',
    'ABT',
    'FITB',
    'PTEN',
    'USB',
    'BA',
    'GGB',
    'JBLU',
    'QEP',
    'EBAY',
    'HBAN',
    'DB',
    'MRVL',
    'ABX',
    'WBA',
    'CDNA',
    'ETP',
    'RSX',
    'KNX',
    'KBH',
    'DISCK',
    'PGR',
    'XLE',
    'MO',
    'MDT',
    'RIG',
    'BCS',
    'CDEV',
    'DNR',
    'EOG',
    'XLP',
    'HPE',
    'TXN',
    'OAS',
    'OKE',
    'CVS',
    'SVXY', ]
  
        var content;
        function printtable(j){
          console.log(list[j]);
          if(j>200) return;
            $.ajax({
             url:'https://financialmodelingprep.com/api/v3/company/profile/'+list[j],
             type:'GET',
             crossDomain: 'true',
             success:function(data){
             console.log(data);
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
  
              $('tbody').append(content);
  
              
             },
             error: function(result) {
                    console.log('error');
              }
             
          });
          setTimeout(function(){
            printtable(j+1);
          },1000);
        
        }
        
  printtable(0);
  
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