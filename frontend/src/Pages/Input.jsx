import React, { useState } from "react";

function Input() {
  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("npm", npm);
    formData.append("nama", nama);
    formData.append("kelas", kelas);

    const response = await fetch("http://localhost/pweb/backend/create.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    alert(result.message);

    setNpm("");
    setNama("");
    setKelas("");
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h2>Input Data Mahasiswa</h2>

      <form onSubmit={handleSubmit}>
        <label>NPM</label>
        <input
          value={npm}
          onChange={(e) => setNpm(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Nama</label>
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Kelas</label>
        <input
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default Input;
