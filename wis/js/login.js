var addErrorMessage = true;

function redirect(){
    window.location.href = "index.html";
}

function login(){
    var data = $("form").serialize();
    var btnLogin = $("#btn-login");
    btnLogin.val("Validating...");
    jQuery.support.cors = true;
    $.ajax({
        type : 'POST',
        dataType: "json",
        url  : 'http://vitorgv.com.br/php/login.php',
        data : data,
        success :  function(response){
           var json = response;
           var senha = $("#password").val();
		       var email = $("#email").val();
           var firstname =  json.firstname;
           var secondname =  json.secondname;
           if (json.password && json.password == senha){
              var user = {email: email, password: senha, firstname :firstname, secondname: secondname}
			        window.localStorage.setItem("login", user);
              window.localStorage.setItem("email", user.email);
              window.localStorage.setItem("password", user.password);
              window.localStorage.setItem("firstname", user.firstname);
              window.localStorage.setItem("secondname", user.secondname);
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

function searchUser(){
    var user = window.localStorage.getItem("login");
    if (user){
        redirect();
    }
}