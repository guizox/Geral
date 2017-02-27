var addErrorMessage = true;

function createAccount(){
    var firstname = $("#firstName").val();
    var secondname = $("#secondName").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmpassword = $("#confirmpassword").val();

    if (firstname == ""){
        if (addErrorMessage){
            $("#mensagens").append("<span style='color: red' id='errorMessageText'> First Name must have a value </span>");
            addErrorMessage = false;
        } else {
            $("#errorMessageText").text("First Name must have a value");
        }
        return;
    }

    if (secondname == ""){
        if (addErrorMessage){
            $("#mensagens").append("<span style='color: red' id='errorMessageText'> Second Name must have a value </span>");
            addErrorMessage = false;
        } else {
            $("#errorMessageText").text("Second Name must have a value");
        }
        return;
    }

    if (email == ""){
        if (addErrorMessage){
            $("#mensagens").append("<span style='color: red' id='errorMessageText'> Email must have a value </span>");
            addErrorMessage = false;
        } else {
            $("#errorMessageText").text("Email must have a value");
        }
        return;
    }

    if (password == confirmpassword && password != ""){
        var data = $("form").serialize();
        $.ajax({
            type : 'POST',
            url  : 'http://vitorgv.com.br/php/createAccount.php',
            data : data,
            success :  function(data){
               var json = jQuery.parseJSON(data);
               if (json.status == "created"){
                  window.location.href = "index.html";
               }
            }, error: function (request, error) {
               console.log(arguments);
               alert(" Can't do because: " + error);
            }
        });
    } else {
        if (password == ""){
            if (addErrorMessage){
                $("#mensagens").append("<span style='color: red' id='errorMessageText'> Password must have a value </span>")
                addErrorMessage = false;
            } else {
                $("#errorMessageText").text("Password must have a value");
            }
        } else{
            if (addErrorMessage){
                $("#mensagens").append("<span style='color: red' id='errorMessageText'> Password must be equals </span>")
                addErrorMessage = false;
            } else {
                $("#errorMessageText").text("Password must be equals");
            }
        }
    }
}