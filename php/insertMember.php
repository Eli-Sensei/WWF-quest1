<?php

// require_once "./php/db.php";
require_once "./db.php";

if (count($_POST) > 0 && isset($_POST["name"]) && !empty(trim($_POST["name"]))) {
    $name = htmlentities(trim($_POST["name"]));
    
    // insert into the bdd our new member
    $sql = "INSERT INTO tp_wcs (argo_name) VALUES (:argo_name)";
    $argonaute = $db->prepare($sql);
    $argonaute->bindParam(":argo_name", $name);
    $argonaute->execute();
    
    // delete post name
    unset($_POST["name"]);
}