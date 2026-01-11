<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require('connection.php'); // File ini sekarang menyediakan variabel $conn

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Pastikan nama tabel mhs_kevin sudah benar di database Anda
    $sql = "SELECT * FROM mhs_kevin";
    $result = mysqli_query($conn, $sql); // Gunakan $conn sesuai connection.php

    if ($result && mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        $response['status'] = 'success';
        $response['data'] = $data;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Data kosong di database.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

echo json_encode($response);
mysqli_close($conn);
?>