import React, { useState } from "react";

const ReadByID = () => {
  const [searchId, setSearchId] = useState("");
  const [mhs, setMhs] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchId) return;
    try {
      const res = await fetch(`http://localhost/pweb/backend/read_by_id.php?id=${searchId}`);
      const result = await res.json();
      if (result.status === "success") {
        setMhs(result.data);
        setError("");
      } else {
        setMhs(null);
        setError(result.message);
      }
    } catch (err) { setError("Gagal terhubung ke server."); }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "20px" }}>Cari Mahasiswa Berdasarkan ID</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input 
          type="number" 
          placeholder="Masukkan ID..." 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none" }} 
        />
        <button 
          onClick={handleSearch} 
          style={{ padding: "0 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}
        >
          Cari
        </button>
      </div>

      {error && <p style={{ color: "#dc2626", background: "#fee2e2", padding: "12px", borderRadius: "12px", textAlign: "center" }}>{error}</p>}

      {mhs && (
        <div style={{ 
          background: "#f1f5f9", 
          padding: "24px", 
          borderRadius: "20px", 
          border: "1px solid #e2e8f0",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>Nama Mahasiswa</span>
            <p style={{ margin: "4px 0 0", fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>{mhs.nama}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>NPM</span>
              <p style={{ margin: "4px 0 0", fontSize: "16px", fontWeight: "600" }}>{mhs.npm}</p>
            </div>
            <div>
              <span style={{ color: "#64748b", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>Kelas</span>
              <p style={{ margin: "4px 0 0", fontSize: "16px", fontWeight: "600" }}>{mhs.kelas}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReadByID;