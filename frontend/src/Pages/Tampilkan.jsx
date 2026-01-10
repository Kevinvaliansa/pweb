import React, { useEffect, useState } from "react";

function Tampilkan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost/pweb/backend/read.php")
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "success") {
          setData(hasil.data);
        }
      });
  }, []);

  return (
    <div style={{ width: "600px", margin: "20px auto" }}>
      <h2>Data Mahasiswa</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fafafa",
        }}
      >
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th style={{ padding: "8px" }}>ID</th>
            <th style={{ padding: "8px" }}>NPM</th>
            <th style={{ padding: "8px" }}>Nama</th>
            <th style={{ padding: "8px" }}>Kelas</th>
          </tr>
        </thead>

        <tbody>
          {data.map((m) => (
            <tr key={m.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{m.id}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{m.npm}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{m.nama}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>{m.kelas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tampilkan;
