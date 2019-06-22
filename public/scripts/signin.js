$('#register').on('click',function(){
    $('.loginbox').css('display','none');
    $('.signupbox').css('display','block');
});
$('#sign,#signup').on('click',function(){
    $('.loginbox').css('display','block');
    $('.signupbox').css('display','none');
})
/*function validate(){
    var name="suraj@k202";
    var passid="qwerty202";
    var username = document.getElementById('email1').value;
    var password = document.getElementById('pass1').value;
    document.getElementById('errortag1').innerHTML="";
    document.getElementById('errortag2').innerHTML="";

    if(password.length<8){
        document.getElementById('errortag2').innerHTML="**Password cannot be less than 8 characters**";
        return false;
    }
   else if(username.length<5){ 
    document.getElementById('errortag1').innerHTML="**Username cannot be less than 5 characters**";
    return false;
  }
  else if(username.toLowerCase() != name.toLowerCase() || password != passid){
    document.getElementById('errortag2').innerHTML="**Invalid Username or Password**"
    return false;
  }
  else{
    return true;
 }
}
*/