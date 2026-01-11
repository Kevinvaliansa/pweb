<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connection.php'; // Database: pweb

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') { exit; }

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $conn->query("SELECT * FROM mahasiswa WHERE id = $id"); // Tabel: mahasiswa
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        } else {
            $result = $conn->query("SELECT * FROM mahasiswa ORDER BY id ASC"); //
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $nama = $data->nama;
        $npm = $data->npm;
        $kelas = $data->kelas;

        if (isset($data->id) && $data->id != "") {
            $sql = "UPDATE mahasiswa SET nama='$nama', npm='$npm', kelas='$kelas' WHERE id=$data->id";
        } else {
            $sql = "INSERT INTO mahasiswa (nama, npm, kelas) VALUES ('$nama', '$npm', '$kelas')";
        }
        $conn->query($sql);
        echo json_encode(["status" => "success"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $conn->query("DELETE FROM mahasiswa WHERE id=$id");
        echo json_encode(["status" => "deleted"]);
        break;
}
$conn->close();
?>