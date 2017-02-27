<?php
    header("Access-Control-Allow-Origin: *");
    session_start();

    require 'DbConnection.php';
   // $_POST['email'];
    
    
    $user = getUserByEmail("vitorgvieira1@gmail.com", conectaPDO())
    
    if ($user->email != ""){
    	echo "ok"
    }

    if ($returnedPassword != "")
       echo json_encode(array ('user' => "ok", 'password' => $returnedPassword));
    else
       echo json_encode(array ('user' => "Not Found"));