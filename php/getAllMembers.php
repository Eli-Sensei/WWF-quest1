<?php
// require_once "./php/db.php";
require_once "./db.php";

// fetch all members
$sql = "SELECT * FROM tp_wcs";
$argonautes = $db->query($sql)->fetchAll(PDO::FETCH_ASSOC);

// var_dump($argonautes);

echo json_encode($argonautes);