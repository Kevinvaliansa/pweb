<?php

header('Content-Type: application/json'); // Mengatur header untuk mengindikasikan bahwa respon adalah JSON
header('Access-Control-Allow-Origin: http://localhost:5173');// Mengizinkan permintaan dari domain React yang berjalan di http://localhost:3000
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Mengizinkan metode HTTP yang diizinkan
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Mengizinkan header yang diizinkan

// Reject metode options bila terpilih
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Lanjutkan dengan pemrosesan permintaan
require('connection.php');

$response = array(); // Inisialisasi array respons

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM mhs_kevin";
    $result = mysqli_query($koneksi, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $item = array(
                'id' => $row['id'],
                'npm' => $row['npm'],
                'nama' => $row['nama'],
                'kelas' => $row['kelas']
            );
            $data[] = $item;
        }

        $response['status'] = 'success';
        $response['data'] = $data;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Tidak ada data dalam tabel mhs_madanil.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Metode HTTP tidak valid.';
}

mysqli_close($koneksi);

echo json_encode($response); // Mengirimkan respon dalam format JSON

?>