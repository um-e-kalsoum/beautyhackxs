<?php
//test
//test2
//test4
try {
    $dbh = new PDO(
        "mysql:host=localhost;dbname=hackathon",
        "root",
        ""
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
} 