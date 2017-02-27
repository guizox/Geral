<?php
    header("Access-Control-Allow-Origin: *");
    session_start();

    require 'DbConnection.php';

    $returnedPassword = getPassword($_POST['email'], conectaPDO());

    if ($returnedPassword != "")
       echo json_encode(array ('user' => "ok", 'password' => $returnedPassword));
    else
       echo json_encode(array ('user' => "Not Found"));
