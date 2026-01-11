<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');

require('connection.php');

if (isset($_GET['id'])) {
    $id = mysqli_real_escape_string($conn, $_GET['id']);
    // Gunakan tabel 'mahasiswa'
    $sql = "SELECT * FROM mahasiswa WHERE id='$id'";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        echo json_encode(["status" => "success", "data" => mysqli_fetch_assoc($result)]);
    } else {
        echo json_encode(["status" => "error", "message" => "ID tidak ditemukan"]);
    }
}
mysqli_close($conn);
?>