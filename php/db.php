<?php

try {
    $db = new PDO("mysql:host=mysql-eden-ellyas.alwaysdata.net;dbname=eden-ellyas_wcs;", "213843_wcs_profi", "@WCS1234");
} catch (PDOException $e) {
    echo $e->getMessage();
}