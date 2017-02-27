<?php
    header("Access-Control-Allow-Origin: *");
    session_start();

    require 'DbConnection.php';

    $pdo = conectaPDO();

    $returnedInsert = createUser($_POST['firstname'], $_POST['secondname'], $_POST['email'], $_POST['password'], $pdo);

    if ($returnedInsert == "ok")
        echo json_encode(array ('status' => "created"));
    else
        echo json_encode(array ('status' => "error"));
?>