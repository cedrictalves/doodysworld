/*--------------------------------------
--  AJAX CHECK NICKNAME AND EMAIL     --
--------------------------------------*/
check = function(target){
	var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
    	data = this.responseText.split("|");
    	sub = document.getElementById("signIn");
    		switch (data[1]){
    			case "Valable" : 
    				sub.removeAttribute("disabled");
    				msg = '<div class="available">This ' + data[0] + ' is available. :)</div>';

    			break;
    			case "Pas valable" : 
    				sub.setAttribute("disabled", "");
    				msg = '<div class="notAvailable">This ' + data[0] + ' is not available. :(</div>';
    			break;
    			case "Vide" : 
    				sub.setAttribute("disabled", "");
    				msg = '<div class="notAvailable">This ' + data[0] + ' is empty. :(</div>';
    			break;
    				sub.setAttribute("disabled", "");
    			case "Mauvais format" : 
    				msg = '<div class="notAvailable">This is not an email. :(</div>';
    			break;
    			default : 
    				sub.setAttribute("disabled", "");
    				msg = '<div class="notAvailable">Server error.</div>';
    		}
    		document.getElementById(target + 'Validator').innerHTML = msg;
        }
    };

    request.open("GET", "/api/check/" + target + "/" + document.getElementById('signIn' + target).value);
    request.send();
}

/*--------------------------------------
--   CHECK PASSWORDS & ALLOW FORM     --
--------------------------------------*/
checkPass = function(){
  const sub = document.getElementById("signIn");
  var score = 0;


  if (document.getElementById("signInPassword").value === document.getElementById("signInPassword2").value && document.getElementById("signInPassword").value !== ""){
    sub.removeAttribute("disabled", "");
    document.getElementById("passwordVerif").innerHTML = '<div class="available">Passwords matching :)</div>';
  }

  else {
    sub.setAttribute("disabled", "");
    // if (document.getElementById("signInPassword").value  === "") score += 0;
    if (document.getElementById("signInPassword2").value === "") score += 1;
    if (document.getElementById("signInPassword2").value !== "") score += 2;
    if (document.getElementById("signInPassword").value  !== "") score += 3;
    switch (score){
      case 1 :
        document.getElementById("passwordVerif").innerHTML = '<div class="notAvailable">Password empty :(</div>';
        break;
      case 4 :
        return;
      default :
        document.getElementById("passwordVerif").innerHTML = '<div class="notAvailable">Passwords not matching :(</div>';
        break;
    }
  }



  // if (document.getElementById("signInPassword2").value === ""){
  //   // sub.setAttribute("disabled", "");
   
  //   // document.getElementById("passwordVerif").innerHTML = '<div class="notAvailable">Passwords are not matching :(</div>';
  // }
  // if (document.getElementById("signInPassword2").value !== ""){
  //   // sub.setAttribute("disabled", "");
  //   score = 2;
  //   // document.getElementById("passwordVerif").innerHTML = '<div class="notAvailable">Passwords are not matching :(</div>';
  // }
   
  // if (document.getElementById("signInPassword2").value === ""){
   
  // }
  // if (document.getElementById("signInPassword").value !== document.getElementById("signInPassword2").value){
  //   sub.setAttribute("disabled", "");
  //   document.getElementById("passwordVerif").innerHTML = '<div class="notAvailable">Passwords are not matching :(</div>';
  // }
  // // if password mathing
  // if (document.getElementById("signInPassword").value === document.getElementById("signInPassword2").value){
  //   document.getElementById("passwordVerif2").innerHTML = '<div class="available">Passwords matching :)</div>';
  // }

   
}

cleanMessage = function(){
    document.getElementById("passwordVerif").innerHTML = "";
}