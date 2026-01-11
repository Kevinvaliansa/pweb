import React, { useState } from "react";

const ReadByID = () => {
  const [searchId, setSearchId] = useState("");
  const [mhs, setMhs] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost/pweb/backend/api.php?id=${searchId}`);
      const result = await res.json();
      if (Array.isArray(result) && result.length > 0) {
        setMhs(result[0]);
        setError("");
      } else {
        setMhs(null);
        setError("Mahasiswa tidak ditemukan.");
      }
    } catch (err) { 
      setError("Gagal terhubung ke server."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-fade" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3 className="section-title">🔍 Pencarian Mahasiswa</h3>
      
      <div className="search-wrapper-modern">
        <input 
          type="number" 
          placeholder="Masukkan ID Mahasiswa..." 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          className="search-input-modern"
        />
        <button onClick={handleSearch} className="btn-search-modern">
          {loading ? "..." : <span>🔍 Cari</span>}
        </button>
      </div>

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {mhs && (
        <div className="home-card-container" style={{ marginTop: "20px" }}>
          <div className="bio-card-modern">
            <div className="bio-header-gradient">
              <div className="avatar-circle-white">
                {mhs.nama.substring(0, 2).toUpperCase()}
              </div>
              <div className="header-text">
                <h2>{mhs.nama}</h2>
                <span className="badge-active">Data Ditemukan</span>
              </div>
            </div>
            <div className="bio-body-content">
              <div className="info-grid-modern">
                <div className="info-item-card">
                  <label>NPM</label>
                  <p>{mhs.npm}</p>
                </div>
                <div className="info-item-card">
                  <label>Kelas</label>
                  <p>{mhs.kelas}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadByID;