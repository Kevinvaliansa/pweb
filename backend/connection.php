<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "pweb";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi Gagal"]));
}
?>