function getUserSettings(){
    var user = window.localStorage.getItem("login");
    jQuery.support.cors = true;
    $.ajax({
        type : 'POST',
        dataType: "json",
        url  : 'http://vitorgv.com.br/php/login.php',
        data : user.serialize(),
        success :  function(response){
           var json = response;
           var senha = $("#password").val();
           if (json.password && json.password == senha){
              var user = {email: email, password: senha}
              window.localStorage.setItem("login", user);
              searchUser();
           } else {
               if (addErrorMessage){
                   btnLogin.val("Login");
                   $("#errorMessage").append("<p style='color: red; font-size: 12px; id='errorMessageText' text-align: right; margin-right: 1%;'> Email or password not valid. </p>")
                   addErrorMessage = false;
               }
           }
        }, error: function (request, error) {
           console.log(arguments);
           alert(" Can't do because: " + error);
        }
    });
}

var goback = function(){
	window.location.href = 'index.html';
}

function onLoad(){
	$("#oldpassword").val(localStorage.getItem("password"));
	$("#email").val(localStorage.getItem("email"));
  $("#name").val(localStorage.getItem("firstname"));
  $("#secondName").val(localStorage.getItem("secondname"));
}

function atualizar(){
  var pass = $("#newpassword").val(); 
  var pass2 = $("#confirmpassword").val(); 
  if (pass !== "" && pass2 !== ""){
	    if (pass2 == pass){
      	$.ajax({
              type : 'GET',
              dataType: "json",
              url  : 'http://vitorgv.com.br/php/updateUser.php',
              data : $("#form").serialize(),
              success :  function(response){
      		        if (response.status == "updated") {
                      localStorage.setItem("password", pass);
                      localStorage.setItem("firstname", $("#name").val());
                      localStorage.setItem("secondname", $("#secondName").val());
      			          goback();
                  } else {
                     console.log("something wrong happened");
                  }
              }, error: function (request, error) {
                 console.log(arguments);
                 alert(" Can't do because: " + error);
              }
          });
      } else {
        $("#errorMessage").text("passwords and confirmpassword must have the same value to continue");
      }
  } else {
    $("#errorMessage").text("Password and confirm password must have value to continue");
  }
}