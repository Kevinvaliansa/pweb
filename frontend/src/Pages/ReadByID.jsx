import React, { useState } from "react";

const ReadByID = () => {
  const [searchId, setSearchId] = useState("");
  const [mhs, setMhs] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchId) return;
    try {
      // Fetch data ke endpoint PHP berdasarkan ID
      const res = await fetch(`http://localhost/pweb/backend/read_by_id.php/${searchId}`);
      const result = await res.json();
      
      if (result.status === "success") {
        setMhs(result.data);
        setError("");
      } else {
        setMhs(null);
        setError(result.message);
      }
    } catch (err) {
      setError("Gagal terhubung ke server. Pastikan Apache di XAMPP aktif.");
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <h3 style={{ color: "#334155", marginBottom: "15px" }}>Cari Mahasiswa (Read By ID)</h3>
      
      {/* Input Group - Responsif: Berbaris di Desktop, Menumpuk di HP */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="number"
          placeholder="Masukkan ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ 
            flex: "1 1 200px", padding: "12px", borderRadius: "10px", 
            border: "1px solid #cbd5e1", fontSize: "16px" 
          }}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            flex: "1 1 100px", padding: "12px", background: "#2563eb", 
            color: "white", border: "none", borderRadius: "10px", 
            fontWeight: "bold", cursor: "pointer" 
          }}
        >
          Cari
        </button>
      </div>

      {error && (
        <p style={{ color: "#ef4444", background: "#fee2e2", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* Hasil Pencarian dalam bentuk Card */}
      {mhs && (
        <div style={{ 
          marginTop: "10px", padding: "15px", background: "#f8fafc", 
          borderRadius: "12px", border: "1px solid #e2e8f0" 
        }}>
          <div style={{ marginBottom: "10px" }}>
            <small style={{ color: "#64748b", fontWeight: "bold" }}>NAMA</small>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{mhs.nama}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <small style={{ color: "#64748b", fontWeight: "bold" }}>NPM</small>
              <p style={{ margin: 0 }}>{mhs.npm}</p>
            </div>
            <div>
              <small style={{ color: "#64748b", fontWeight: "bold" }}>KELAS</small>
              <p style={{ margin: 0 }}>{mhs.kelas}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadByID;